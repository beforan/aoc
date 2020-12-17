import {
  isPassportValid,
  parsePassport,
  parsePassportField,
  splitPassportFields,
  countValidPassports,
} from "./lib.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { doubleNewLineSplit } from "../lib/file-io.ts";

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

const loosePassport = {
  hcl: "#ae17e1",
  iyr: "2013",
  eyr: "2024",
  ecl: "brn",
  pid: "760753108",
  byr: "1931",
  hgt: "179cm",
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
  assert(isPassportValid(validPassport));
});

Deno.test("Invalid Passport", () => {
  assert(!isPassportValid(invalidPassport));
});

Deno.test("Loose Passport fails strict mode", () => {
  assert(!isPassportValid(loosePassport));
});

Deno.test("Loose Passport passes loose mode", () => {
  assert(isPassportValid(loosePassport, true));
});

Deno.test("Day 4 Puzzle 1", () => {
  const expected = 2;
  const actual = countValidPassports(testLines, true);

  assertEquals(actual, expected);
});

Deno.test("Day 4 Puzzle 2 Invalid", () => {
  const invalidPassports = [
    "eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926",
    "iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946",
    "hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277",
    "hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007",
  ];

  invalidPassports.forEach((p) => {
    assert(!isPassportValid(parsePassport(p), true, true));
  });
});

Deno.test("Day 4 Puzzle 2 Valid", () => {
  const validPassports = [
    "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f",
    "eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm",
    "hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022",
    "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719",
  ];

  validPassports.forEach((p) => {
    assert(isPassportValid(parsePassport(p), true, true));
  });
});
