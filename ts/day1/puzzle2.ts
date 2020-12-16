import { splitTextFileLines } from "../lib/file-io.ts";
import { solve } from "./lib.ts";

const inputFile = "./day1/day1_input.txt";

export const Solve = async () => {
  const file = await Deno.readTextFile(inputFile);
  const lines = splitTextFileLines(file).map((l) => parseInt(l));
  console.log(solve(lines, 3));
};
