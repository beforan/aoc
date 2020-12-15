import { countValidPasswords } from "./lib.ts";

const inputFile = "./day2/day2_input.txt";

export const Solve = async () => {
  const file = await Deno.readTextFile(inputFile);
  const lines = file.split("\n");
  console.log(countValidPasswords(lines));
};
