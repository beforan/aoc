import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { SumThing, updateIndexValue } from "../lib/list-summing.ts";
import { solve } from "./lib.ts";

const testList = [1721, 979, 366, 299, 675, 1456];

Deno.test("Day 1 Puzzle 1", () => {
  const expected = 514579;
  const actual = solve(testList, 2);
  assertEquals(actual, expected);
});

Deno.test("Day 1 Puzzle 2", () => {
  const expected = 241861950;
  const actual = solve(testList, 3);
  assertEquals(actual, expected);
});

Deno.test("Recursively Updating Indices", () => {
  // This is a really bad test, but whatever. Speed.

  const indices = [1, 2, 3];
  const limit = 6;

  const expected = [
    [1, 2, 4],
    [1, 2, 5],
    [1, 2, 6],
    [1, 3, 4],
    [1, 3, 5],
    [1, 3, 6],
    [1, 4, 5],
    [1, 4, 6],
    [1, 5, 6],
    [2, 3, 4],
    [2, 3, 5],
    [2, 3, 6],
    [2, 4, 5],
    [2, 4, 6],
    [2, 5, 6],
    [3, 4, 5],
    [3, 4, 6],
    [3, 5, 6],
    [4, 5, 6],
  ];

  for (let i = 0; i <= expected.length; i++) {
    const f = () => updateIndexValue(indices.length - 1, indices, limit);

    if (i < expected.length) {
      // all the iterations we expect
      f();
      assertEquals(indices, expected[i]);
    } else {
      // out of iterations / hit the limit
      assertThrows(f, Error, "limit");
    }
  }
});

Deno.test("Find 2 numbers that sum to 2020", () => {
  const indices = SumThing(testList, 2, 2020);
  const actual = indices.map((i) => testList[i]);
  const expected = [1721, 299];
  assertEquals(actual, expected);
});

Deno.test("Find 3 numbers that sum to 2020", () => {
  const indices = SumThing(testList, 3, 2020);
  const actual = indices.map((i) => testList[i]);
  const expected = [979, 366, 675];
  assertEquals(actual, expected);
});
