import { readAndSplitInputFile } from "../lib/file-io.ts";
import { solve } from "./lib.ts";

export const Solve = async () => {
  const lines = await readAndSplitInputFile(1);
  console.log(
    solve(
      lines.map((l) => parseInt(l)),
      2
    )
  );
};
