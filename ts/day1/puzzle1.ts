import { findFirstTargetSumIndices } from "../lib/list-summing.ts";

/**
 * find the paired entries in a list which sum to 2020
 * and return the product of them
 *
 * https://adventofcode.com/2020/day/1
 */
export const solve = (list: number[]): number => {
  const [i1, i2] = findFirstTargetSumIndices(list, 2020);
  return list[i1] * list[i2];
};

// Run the solutions with our input
const inputFile = "./day1/day1_input.txt";

export const Solve = async () => {
  const file = await Deno.readTextFile(inputFile);
  const lines = file.split("\n").map((l) => parseInt(l));
  console.log(solve(lines));
};
