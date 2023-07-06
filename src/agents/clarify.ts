import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { createHumanInputTool } from "../tools/humanInput";
import { PromptTemplate } from "langchain/prompts";

export const runChatExecutor = async (model: ChatOpenAI) => {
  const tools = [createHumanInputTool()];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-conversational-react-description",
    verbose: true,
  });

  const prompt = PromptTemplate.fromTemplate(
    `Your a chat bot and you should try to find out the name of the human.\n
      Once you know their name you must always confirm by asking them if you have the correct name.\n
      You can use the following tools: {tools}
      `
  );

  const input = await prompt.format({
    tools: tools.map((tool) => `${tool.name}: ${tool.description}`).join(", "),
  });

  return executor.run(input);
};
