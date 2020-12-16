import { readAndSplitInputFile } from "../lib/file-io.ts";
import { countValidPasswords } from "./lib.ts";
import { PasswordPolicy } from "./types.ts";

export const Solve = async () => {
  const lines = await readAndSplitInputFile(2);
  console.log(countValidPasswords(lines, PasswordPolicy.SledRental));
};
