import { readInputLines } from "../lib/file-io.ts";
import { tobogganSlopes } from "./constants.ts";
import { countTreesOnRoute } from "./lib.ts";

export const allSlopesTreeCountProduct = (lines: string[]) => {
  const counts = tobogganSlopes.map(([dx, dy]) =>
    countTreesOnRoute(lines, dx, dy)
  );
  return counts.reduce((agg, count) => agg * count);
};

export const Solve = async () => {
  const lines = await readInputLines(3);
  console.log(allSlopesTreeCountProduct(lines));
};
