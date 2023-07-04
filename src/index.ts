import { OpenAI } from "langchain/llms/openai";
import { BufferMemory, ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const createLLM = (openAIApiKey: string) => {
  //Instantiate the OpenAI model
  //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
  return new OpenAI({
    temperature: 0.9,
    openAIApiKey,
  });
};

const createPrompt = () => {
  const template = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.
    Current conversation: {chat_history}
    Human: {input}
    AI:`;
  return PromptTemplate.fromTemplate(template);
};

const createBufferMemory = (memoryKey: string) => {
  return new BufferMemory({ memoryKey });
};

const createSummaryMemory = (openAIApiKey: string, memoryKey: string) => {
  return new ConversationSummaryMemory({
    memoryKey,
    llm: new OpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
      openAIApiKey,
    }),
  });
};

const createLLMChain = (openAIApiKey: string, longConversations: boolean) => {
  const llm = createLLM(openAIApiKey);
  const prompt = createPrompt();
  const memory = longConversations
    ? createSummaryMemory(openAIApiKey, "chat_history")
    : createBufferMemory("chat_history");

  return new LLMChain({ llm, prompt, memory });
};

const main = async () => {
  const chain = createLLMChain(process.env.OPENAI_API_KEY!, true);
  chain
    .call({ input: "what's your name?" })
    .then((resp) => console.log(resp.text));
};

// Entry point
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
