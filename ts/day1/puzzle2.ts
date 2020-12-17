import { readInputLines } from "../lib/file-io.ts";
import { solve } from "./lib.ts";

export const Solve = async () => {
  const lines = await readInputLines(1);
  console.log(
    solve(
      lines.map((l) => parseInt(l)),
      3
    )
  );
};
