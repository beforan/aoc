const testList = [1721, 979, 366, 299, 675, 1456];

/**
 * Sums each pair in a list and returns the indices
 * of the first such pair that when summed give the target number
 * @param list A list of numbers to pair sum
 * @param target The target sum value
 */
const findFirstTargetSumIndices = (
  list: number[],
  target: number
): number[] => {
  for (let i = 0; i < list.length; i++) {
    // we have a minor efficiency here:
    // we only sum numbers below us, since the other pairs are already done.
    for (let j = i + 1; j < list.length; j++) {
      if (list[i] + list[j] === target) return [i, j];
    }
  }
  return [];
};

/**
 * find the paired entries in a list which sum to 2020
 * and return the product of them
 *
 * https://adventofcode.com/2020/day/1
 */
const puzzle1 = (list: number[]): number => {
  const [i1, i2] = findFirstTargetSumIndices(list, 2020);
  return list[i1] * list[i2];
};

export const Puzzle1_test = () => {
  console.log(puzzle1(testList));
};

export const Puzzle1 = async () => {
  const file = await Deno.readTextFile("./day1/puzzle1_input.txt");
  const lines = file.split("\n").map((l) => parseInt(l));
  console.log(puzzle1(lines));
};
