/**
 * Parse a range in the form "1-3" to its two numbers: [min, max]
 * @param range A string in the form "1-3"
 */
export const parseRange = (range: string) => {
  const result = range.split("-").map((x) => parseInt(x));
  if (result.length !== 2 || result.some(isNaN))
    throw Error(`Invalid Range input: ${range}`);
  return result;
};

export const parsePasswordLine = (line: string) => {
  const [range, char, password] = line.split(" ", 3);
  return {
    range,
    char: char[0],
    password,
  };
};

/**
 * @private
 * Check validity of a `password` using the following criteria:
 *
 * `char` must appear at least `charMin` times and no more than `charMax`.
 * @param password The password to validate
 * @param char The restricted character
 * @param charMin Minimum required number of `char`
 * @param charMax Maximum acceptable number of `char`
 */
export const isValidPassword = (
  password: string,
  char: string,
  charMin: number,
  charMax: number
) => {
  const inverseCharCount = password.replaceAll(char, "").length;
  const charCount = password.length - inverseCharCount;

  return charMin <= charCount && charCount <= charMax;
};

export const countValidPasswords = (lines: string[]) =>
  lines.reduce((validCount, line) => {
    const { range, char, password } = parsePasswordLine(line);
    const [min, max] = parseRange(range);
    return isValidPassword(password, char, min, max)
      ? ++validCount
      : validCount;
  }, 0);
