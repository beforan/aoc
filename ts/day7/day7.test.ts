import { parseBagRules } from "./lib.ts";

Deno.test("parsing", () => {
  parseBagRules("abc123,.");
});
