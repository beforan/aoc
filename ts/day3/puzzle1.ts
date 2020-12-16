import { readAndSplitInputFile } from "../lib/file-io.ts";
import { countTreesOnRoute } from "./lib.ts";

export const Solve = async () => {
  const lines = await readAndSplitInputFile(3);
  console.log(countTreesOnRoute(lines, 3, 1));
};
