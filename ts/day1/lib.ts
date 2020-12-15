import { SumThing } from "../lib/list-summing.ts";

/**
 * find the entries in a list which sum to 2020
 * and return the product of them
 *
 * https://adventofcode.com/2020/day/1
 */
export const solve = (list: number[], n: number): number => {
  const indices = SumThing(list, n, 2020);
  return indices.reduce((product, i) => product * list[i], 1);
};
