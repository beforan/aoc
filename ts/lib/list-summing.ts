/**
 * @private
 * Update the index value at index `i` of an array of indices
 * that count upwards through all combinations of indices
 * @param i the index we are updating the value at
 * @param indices The array of all index values
 * @param limit The highest valid index value
 */
export const updateIndexValue = (
  i: number,
  indices: number[],
  limit: number
) => {
  if (indices[i] === limit) {
    if (i === 0) throw new Error("All indices have hit their limits");
    // recursively work back so we know what our value needs to be
    updateIndexValue(i - 1, indices, limit - 1);
    indices[i] = indices[i - 1] + 1;
  } else {
    indices[i]++;
  }
};

/**
 * Find the Indices in an array where `n` values of the array
 * sum to make `target`.
 * 
 * Returns early at the first combination that makes the target.
 * @param data The input array
 * @param n The number of array items to sum
 * @param target The target sum value
 */
export const SumThing = (data: number[], n: number, target: number) => {
  if (n > data.length)
    throw new Error(`The input list contains fewer than n (${n}) values`);

  // initialise with sequential indices up to n-1
  const indexCounters = Array(n)
    .fill(0)
    .map((_, i) => i);

  const sumReducer = (agg: number, i: number) => agg + data[i];

  while (true) {
    //console.log(indexCounters);
    const sum = indexCounters.reduce(sumReducer, 0);
    //console.log(sum);
    if (sum == target) break;

    // ^ this version is naive; we can make some optimisations,
    // by checking the sum of fewer than `n` indices and skipping whole blocks
    // TODO: Optimise

    try {
      // update indices recursively backwards (i--)
      // (simulating counting in a baseN number
      // where N is data.length)
      updateIndexValue(n - 1, indexCounters, data.length - 1);
    } catch {
      // we expect `updateIndexValue` to throw when it hits the limit
      break;
    }
  }

  return indexCounters;
};
