import { readInputGroups } from "../lib/file-io.ts";
import { countValidPassports } from "./lib.ts";

export const Solve = async () => {
  const passports = await readInputGroups(4);
  console.log(countValidPassports(passports, true, true));
};
