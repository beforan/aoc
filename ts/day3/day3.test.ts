import { assertEquals } from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { wrapInteger } from "./lib.ts";
import { countTreesOnRoute } from "./puzzle1.ts";

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

Deno.test("Day 3 Puzzle 1", () => {
  const actual = countTreesOnRoute(testMap, 3, 1);
  const expected = 7;

  assertEquals(actual, expected);
});
