import { doubleNewLineSplit, isPassportValid, parsePassport } from "./lib.ts";

export const validatePassports = (passports: string[], looseMode = false) =>
  passports.map((x) => isPassportValid(parsePassport(x), looseMode));

export const countValid = (validationResults: boolean[]) =>
  validationResults.filter((x) => !!x).length;

export const countValidPassports = (passports: string[], looseMode = false) =>
  countValid(validatePassports(passports, looseMode));

export const Solve = async () => {
  const file = await Deno.readTextFile("./day4/day4_input.txt");
  const passports = doubleNewLineSplit(file);
  console.log(countValidPassports(passports, true));
};
