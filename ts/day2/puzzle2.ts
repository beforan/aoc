import { splitTextFileLines } from "../lib/file-io.ts";
import { countValidPasswords } from "./lib.ts";
import { PasswordPolicy } from "./types.ts";

const inputFile = "./day2/day2_input.txt";

export const Solve = async () => {
  const file = await Deno.readTextFile(inputFile);
  const lines = splitTextFileLines(file);
  console.log(countValidPasswords(lines, PasswordPolicy.TobogganRental));
};
