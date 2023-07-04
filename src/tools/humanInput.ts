import { DynamicTool } from "langchain/tools";
import * as ReadLine from "readline/promises";

export const createHumanInputTool = () => {
  return new DynamicTool({
    name: "human_input",
    description: "use this tool when you want to get input from a human",
    func: async (prompt) => {
      const readline = ReadLine.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      return readline.question(`${prompt}\n`).then((result) => {
        readline.close();
        return result;
      });
    },
  });
};
