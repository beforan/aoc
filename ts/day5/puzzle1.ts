import { readInputLines } from "../lib/file-io.ts";
import { parseBoardingPass } from "./lib.ts";

export const Solve = async () => {
  const lines = await readInputLines(5);
  const result = Math.max(
    ...lines.map((pass) => parseBoardingPass(pass).seatId)
  );
  console.log(result);
  return result;
};
