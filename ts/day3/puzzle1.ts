import { readInputLines } from "../lib/file-io.ts";
import { countTreesOnRoute } from "./lib.ts";

export const Solve = async () => {
  const lines = await readInputLines(3);
  console.log(countTreesOnRoute(lines, 3, 1));
};
