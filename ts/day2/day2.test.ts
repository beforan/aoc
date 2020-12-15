import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { isValidPassword, parseRange, countValidPasswords } from "./lib.ts";

const testData = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

Deno.test("Valid Range Parses", () => {
  assertEquals(parseRange("1-3"), [1, 3]);
});

Deno.test("Invalid Range throws", () => {
  const inputs = ["1", "a-b", "1-3-4-5"];
  inputs.forEach((range) => assertThrows(() => parseRange(range), Error));
});

Deno.test("isValidPassword is true for valid", () => {
  assert(isValidPassword("abcde", "a", 1, 3));
});

Deno.test("isValidPassword is false for invalid", () => {
  assert(!isValidPassword("cdefg", "b", 1, 3));
});

Deno.test("Day 2 Puzzle 1", () => {
  assertEquals(countValidPasswords(testData), 2);
});
