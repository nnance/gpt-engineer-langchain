import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { createHumanInputTool } from "../tools/humanInput";

export const createChatExecutor = async (model: ChatOpenAI) => {
  const tools = [createHumanInputTool()];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-conversational-react-description",
    verbose: true,
  });

  return executor;
};
