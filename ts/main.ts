/**
 * @module main
 * Dynamic launcher for Day and Puzzle combinations.
 *
 * - Expects to find `puzzle<n>.ts` modules in `day<n>/` folders.
 * - Expects a parameterless `Solve()` export to run to solve that puzzle.
 */

const [day, puzzle] = Deno.args;

try {
  (await import(`./day${day}/puzzle${puzzle}.ts`)).Solve();
} catch {
  console.error(
    `Couldn't find the combination of Day ${day} and Puzzle ${puzzle}.`
  );
}

export {};
