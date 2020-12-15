/**
 * Sums each pair in a list and returns the indices
 * of the first such pair that when summed give the target number
 * @param list A list of numbers to pair sum
 * @param target The target sum value
 */
export const findFirstTargetSumIndices = (
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
