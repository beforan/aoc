import {
  doubleNewLineSplit,
  isPassportValid,
  parsePassport,
  parsePassportField,
  splitPassportFields,
} from "./lib.ts";
import { assertEquals } from "https://deno.land/std@0.81.0/testing/asserts.ts";

const testFile = await Deno.readTextFile("./day4/day4_input_test.txt");

// These tests can't be run in parallel
// due to dependence on the one time initial parsing of the file
let testLines: string[];

const validPassportFields = [
  "ecl:gry",
  "pid:860033327",
  "eyr:2020",
  "hcl:#fffffd",
  "byr:1937",
  "iyr:2017",
  "cid:147",
  "hgt:183cm",
];

const validPassport = {
  ecl: "gry",
  pid: "860033327",
  eyr: "2020",
  hcl: "#fffffd",
  byr: "1937",
  iyr: "2017",
  cid: "147",
  hgt: "183cm",
};

const invalidPassport = {
  iyr: "2013",
  ecl: "amb",
  cid: "350",
  eyr: "2023",
  pid: "028048884",
  hcl: "#cfa07d",
  byr: "1929",
};

Deno.test("Split on double new lines - count", async () => {
  const expectedCount = 4;

  testLines = doubleNewLineSplit(testFile);
  const actual = testLines.length;

  assertEquals(actual, expectedCount);
});

Deno.test("Passport Field splitting", () => {
  const expected = validPassportFields;
  const actual = splitPassportFields(testLines[0]);

  assertEquals(actual, expected);
});

Deno.test("Parse Passport Field", () => {
  const expected = ["ecl", "gry"];
  const actual = parsePassportField(validPassportFields[0]);

  assertEquals(actual, expected);
});

Deno.test("Passport Parsing to object", () => {
  const expected = validPassport;
  const actual = parsePassport(testLines[0]);

  assertEquals(actual, expected);
});

Deno.test("Valid Passport", () => {
  assertEquals(isPassportValid(validPassport), true);
});

Deno.test("Invalid Passport", () => {
  assertEquals(isPassportValid(invalidPassport), false);
});
