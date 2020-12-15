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
  const inverseCharCount = password.replaceAll(char, "").length;
  const charCount = password.length - inverseCharCount;

  return charMin <= charCount && charCount <= charMax;
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
export const TobogganRentalPasswordValidator: PasswordValidator = (
  password,
  char,
  charMin,
  charMax
) => {
  const inverseCharCount = password.replaceAll(char, "").length;
  const charCount = password.length - inverseCharCount;

  return charMin <= charCount && charCount <= charMax;
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

  lines.reduce((validCount, line) => {
    const { numbers, char, password } = parsePasswordLine(line);
    const [a, b] = parseDelimitedDigits(numbers);

    return isValidPassword(password, char, a, b) ? ++validCount : validCount;
  }, 0);
};
