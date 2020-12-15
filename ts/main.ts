/** @module main Consider this a launcher for each completed day and puzzle */
import * as Day1 from "./day1/day1.ts";

// Add Days and Puzzles here
const actions: ActionLookup = {
  "1,1": Day1.Puzzle1,
};

type ActionLookup = {
  [key: string]: () => Promise<void>;
};

// Launcher Runtime Plumbing
const [day, puzzle] = Deno.args;
const key = `${day},${puzzle}`;

const notFound = () =>
  console.log(
    `Couldn't find the combination of Day ${day} and Puzzle ${puzzle}.`
  );

actions[key]?.() ?? notFound();
