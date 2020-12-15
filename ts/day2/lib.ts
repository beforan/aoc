import { PasswordPolicy, PasswordValidator } from "./types.ts";

/**
 * Parse a string in the form "1-3" to its two numbers: [a, b]
 * @param input A string in the form "1-3"
 */
export const parseDelimitedDigits = (input: string) => {
  const result = input.split("-").map((x) => parseInt(x));
  if (result.length !== 2 || result.some(isNaN))
    throw Error(`Invalid input: ${input}`);
  return result;
};

export const parsePasswordLine = (line: string) => {
  const [numbers, char, password] = line.split(" ", 3);
  return {
    numbers,
    char: char[0],
    password,
  };
};

export const getCharCount = (input: string, char: string) => {
  if (char.length != 1) throw new Error(`char must be only one char: ${char}`);

  const inverseCharCount = input.replaceAll(char, "").length;
  return input.length - inverseCharCount;
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
export const SledRentalPasswordValidator: PasswordValidator = (
  password,
  char,
  charMin,
  charMax
) => {
  const charCount = getCharCount(password, char);
  return charMin <= charCount && charCount <= charMax;
};

/**
 * @private
 * Check validity of a `password` using the following criteria:
 *
 * One of the specified positions must contain the validation character.
 * Other occurrences of the character don't matter.
 * @param password The password to validate
 * @param char The validation character
 * @param pos1 a 1-indexed character position to validate
 * @param pos2 a 1-indexed character position to validate
 */
export const TobogganRentalPasswordValidator: PasswordValidator = (
  password,
  char,
  pos1,
  pos2
) => {
  // pos is 1-indexed
  const char1 = password[pos1 - 1];
  const char2 = password[pos2 - 1];

  // coerce the boolean expressions to numbers so we can bitwise XOR them
  // and then coerce the result back to a boolean :\
  return !!(+(char1 === char) ^ +(char2 === char));
};

export const selectPasswordValidatorByPolicy = (policy: PasswordPolicy) => {
  switch (policy) {
    case PasswordPolicy.SledRental:
      return SledRentalPasswordValidator;
    case PasswordPolicy.TobogganRental:
      return TobogganRentalPasswordValidator;
    default:
      throw new Error("Unknown Password Policy");
  }
};

export const countValidPasswords = (
  lines: string[],
  policy: PasswordPolicy
) => {
  const isValidPassword = selectPasswordValidatorByPolicy(policy);

  return lines.reduce((validCount, line) => {
    const { numbers, char, password } = parsePasswordLine(line);
    const [a, b] = parseDelimitedDigits(numbers);

    return isValidPassword(password, char, a, b) ? ++validCount : validCount;
  }, 0);
};
