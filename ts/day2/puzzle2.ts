import { readInputLines } from "../lib/file-io.ts";
import { countValidPasswords } from "./lib.ts";
import { PasswordPolicy } from "./types.ts";

export const Solve = async () => {
  const lines = await readInputLines(2);
  console.log(countValidPasswords(lines, PasswordPolicy.TobogganRental));
};
