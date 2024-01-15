import { ChatOpenAI } from "langchain/chat_models/openai";
import { runChatExecutor } from "./agents/clarify";
import * as dotenv from "dotenv";
dotenv.config();

const createLLM = (openAIApiKey: string) => {
  //Instantiate the OpenAI model
  //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
  return new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo-16k-0613",
    openAIApiKey,
  });
};

const input = `
Your a chat bot and you should ask the user their name.
Once you know their name you should confirm you have the correct name.
`;

const searchInput = `
Ask the user for the name of a famous person.
Use the users input to answer the following question:
Who is {name} boyfriend? What is his current age raised to the 0.23 power?`;

const main = async () => {
  const model = createLLM(process.env.OPENAI_API_KEY!);
  const result = await runChatExecutor(model, searchInput);
  console.log(result);
};

// Entry point
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
