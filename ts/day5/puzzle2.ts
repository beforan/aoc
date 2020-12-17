import { readInputLines } from "../lib/file-io.ts";
import { parseBoardingPass } from "./lib.ts";

export const Solve = async () => {
  const lines = await readInputLines(5);
  const seatIds = lines.map((pass) => parseBoardingPass(pass).seatId);
  const min = Math.min(...seatIds);

  const sortedIds = seatIds.sort((a, b) => a - b);

  // a regular for loop lets us early exit at the first mismatch
  for (let i = 0; i < sortedIds.length; i++) {
    const id = sortedIds[i];
    const expected = i + min;
    if (expected !== id) {
      console.log(`expected ${i + min}`, `found ${id}`);

      // sanity check by the puzzle's criteria
      const lower = sortedIds[i - 1];
      console.log("seat below: ", lower);
      console.log("seat above: ", id);
      if (lower === expected - 1 && id === expected + 1)
        console.log("missing seat: ", expected);
      return id;
    }
  }
};
