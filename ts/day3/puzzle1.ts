import { splitTextFileLines } from "../lib/file-io.ts";
import { wrapInteger } from "./lib.ts";

export const countTreesOnRoute = (rows: string[], dx: number, dy: number) => {
  const mapWidth = rows[0].length;
  const grid: { [key: number]: string[] } = {};

  let treeCount = 0;

  // start co-ords
  let x = 0;

  // keep going until we reach the bottom of the slope
  for (let y = dy; y < rows.length; y += dy) {
    x = wrapInteger(x + dx, mapWidth);
    console.log(x, y);

    // split the row into columns once and cache it
    if (!grid[y]) grid[y] = rows[y].split("");
    // hereafter use the cached row

    if (grid[y][x] === "#") treeCount++;
    console.log(grid[y][x]);
  }

  return treeCount;
};

const inputFile = "./day3/day3_input.txt";

export const Solve = async () => {
  const file = await Deno.readTextFile(inputFile);
  const lines = splitTextFileLines(file);
  console.log(countTreesOnRoute(lines, 3, 1));
};
