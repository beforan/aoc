import { assertEquals } from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { sumGroupDistinctValues, sumGroupUbiquitousValues } from "./lib.ts";

const testData = ["abc", "a\nb\nc", "ab\nac", "a\na\na\na", "b"];

Deno.test("sumGroupDistinctValues", () => {
  const expected = [3, 3, 3, 1, 1];

  testData.forEach((group, i) => {
    assertEquals(sumGroupDistinctValues(group), expected[i]);
  });
});

Deno.test("sumGroupUbiquitousValues", () => {
  const expected = [3, 0, 1, 1, 1];

  testData.forEach((group, i) => {
    assertEquals(sumGroupUbiquitousValues(group), expected[i]);
  });
});
