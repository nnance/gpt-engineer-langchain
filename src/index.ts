import { ChatOpenAI } from "langchain/chat_models/openai";
import { createChatExecutor } from "./agents/clarify";

const createLLM = (openAIApiKey: string) => {
  //Instantiate the OpenAI model
  //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
  return new ChatOpenAI({
    temperature: 0.9,
    openAIApiKey,
  });
};

const main = async () => {
  const model = createLLM(process.env.OPENAI_API_KEY!);
  const agent = await createChatExecutor(model);
  agent
    .run(
      `Your a chat bot and you should try to find out the name of the human.\n` +
        `Once you know their name you should say "Hello <name>! How are you doing today?"`
    )
    .then((result) => {
      console.log(result);
    });
};

// Entry point
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
