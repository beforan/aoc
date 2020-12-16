import { countValidPassports, doubleNewLineSplit } from "./lib.ts";

export const Solve = async () => {
  const file = await Deno.readTextFile("./day4/day4_input.txt");
  const passports = doubleNewLineSplit(file);
  console.log(countValidPassports(passports, true, true));
};
