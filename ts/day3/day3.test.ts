import { assertEquals } from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { tobogganSlopes } from "./constants.ts";
import { wrapInteger, countTreesOnRoute } from "./lib.ts";
import { allSlopesTreeCountProduct } from "./puzzle2.ts";

const testMap = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

Deno.test("wrapInteger", () => {
  assertEquals(wrapInteger(123, 100), 23);
  assertEquals(wrapInteger(223, 100), 23);
  assertEquals(wrapInteger(11, 11), 0);
  assertEquals(wrapInteger(10, 11), 10);
});

const testCount = (dx: number, dy: number, expected: number) => {
  const actual = countTreesOnRoute(testMap, dx, dy);

  assertEquals(actual, expected);
  return actual;
};

Deno.test("Day 3 Puzzle 1", () => {
  testCount(3, 1, 7);
});

Deno.test("Day 3 Puzzle 2 - counts for all slopes", () => {
  const expectedCounts = [2, 7, 3, 4, 2];

  // test each count and store it
  const slopeCounts = tobogganSlopes.map(([dx, dy], i) =>
    testCount(dx, dy, expectedCounts[i])
  );
});

Deno.test("Day 3 Puzzle 2 - counts and multiplying", () => {
  const actual = allSlopesTreeCountProduct(testMap);
  const expected = 336;

  assertEquals(actual, expected);
});
