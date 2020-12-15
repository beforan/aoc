import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.81.0/testing/asserts.ts";
import {
  parseDelimitedDigits,
  countValidPasswords,
  SledRentalPasswordValidator,
  TobogganRentalPasswordValidator,
} from "./lib.ts";
import { PasswordPolicy } from "./types.ts";

const testData = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

Deno.test("Valid Range Parses", () => {
  assertEquals(parseDelimitedDigits("1-3"), [1, 3]);
});

Deno.test("Invalid Range throws", () => {
  const inputs = ["1", "a-b", "1-3-4-5"];
  inputs.forEach((range) =>
    assertThrows(() => parseDelimitedDigits(range), Error)
  );
});

Deno.test("SledRentalPassword is true for valid", () => {
  assert(SledRentalPasswordValidator("abcde", "a", 1, 3));
});

Deno.test("SledRentalPassword is false for invalid", () => {
  assert(!SledRentalPasswordValidator("cdefg", "b", 1, 3));
});

Deno.test("TobogganRentalPassword is true for valid", () => {
  assert(TobogganRentalPasswordValidator("abcde", "a", 1, 3));
});

Deno.test("TobogganRentalPassword is false for invalid", () => {
  assert(!TobogganRentalPasswordValidator("cdefg", "b", 1, 3));
});

Deno.test("Day 2 Puzzle 1", () => {
  assertEquals(countValidPasswords(testData, PasswordPolicy.SledRental), 2);
});

// Deno.test("Day 2 Puzzle 2", () => {
//   assertEquals(countValidPasswords(testData, PasswordPolicy.TobogganRental), 2);
// });
