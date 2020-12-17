import { newLineSplit } from "../lib/file-io.ts";

/**
 * For each distinct value in the group,
 * count the number of times it appears
 * @param group
 */
const getGroupValueCounts = (group: string[]) =>
  group.reduce((answers: { [key: string]: number }, member: string) => {
    const responses = member.split("");
    responses.forEach((r) => {
      answers[r] = (answers[r] ?? 0) + 1;
    });
    return answers;
  }, {});

/**
 * Parse a group with members separated by new lines
 * into an array of members instead
 */
const parseGroup = (group: string) => newLineSplit(group);

/**
 * Count the number of distinct values in the group
 * @param group
 */
export const sumGroupDistinctValues = (group: string) => {
  const counts = getGroupValueCounts(parseGroup(group));
  const values = Object.keys(counts);

  return values.length;
};

/**
 * Count the number of distinct values in the group
 * present in every member of the group
 * @param group
 */
export const sumGroupUbiquitousValues = (group: string) => {
  const members = parseGroup(group);
  const counts = getGroupValueCounts(members);
  const ubiquitousValues = Object.keys(counts).filter(
    (v) => counts[v] === members.length
  );
  return ubiquitousValues.length;
};
