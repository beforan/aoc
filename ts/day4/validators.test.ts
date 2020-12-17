import { assert } from "https://deno.land/std@0.81.0/testing/asserts.ts";
import {
  isValidByr,
  isValidEcl,
  isValidHcl,
  isValidHgt,
  isValidPid,
} from "./validators.ts";

Deno.test("Valid byr", () => {
  assert(isValidByr("2002"));
});

Deno.test("Invalid byr", () => {
  assert(!isValidByr("2003"));
});

Deno.test("Invalid hgt - format", () => {
  assert(!isValidHgt("190"));
});

Deno.test("Invalid hgt - units", () => {
  assert(!isValidHgt("6ft"));
});

Deno.test("Valid hgt - centimetres", () => {
  assert(isValidHgt("190cm"));
});

Deno.test("Invalid hgt - centimetres", () => {
  assert(!isValidHgt("60cm"));
});

Deno.test("Valid hgt - inches", () => {
  assert(isValidHgt("60in"));
});

Deno.test("Invalid hgt - inches", () => {
  assert(!isValidHgt("190in"));
});

Deno.test("Invalid hcl", () => {
  assert(!isValidHcl("#123abz"));
  assert(!isValidHcl("123abc"));
});

Deno.test("Valid hcl", () => {
  assert(isValidHcl("#123abc"));
});

Deno.test("Invalid ecl", () => {
  assert(!isValidEcl("wat"));
});

Deno.test("Valid ecl", () => {
  assert(isValidEcl("brn"));
});

Deno.test("Valid pid", () => {
  assert(isValidPid("000000001"));
});

Deno.test("Invalid pid", () => {
  assert(!isValidPid("0123456789"));
});