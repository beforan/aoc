import { validEyeColors } from "./constants.ts";

// Internal validators
export const isNDigits = (input: string, n: number) => {
  const pattern = new RegExp(`^\\d{${n}}$`);
  return !!input.match(pattern);
};

export const isInRange = (input: number, min: number, max: number) =>
  min <= input && input <= max;

export const isYearInRange = (input: string, min: number, max: number) =>
  isNDigits(input, 4) && isInRange(parseInt(input), min, max);

export const isHexColor = (input: string) => !!input.match(/^#[\dA-Fa-f]{6}$/);

// Internal format parsers (that validate the format on the way)

/**
 * If the input is in the form "<Value><Units>",
 * returns each component separately, else null;
 * @param input string in the form "<Value><Units>" e.g. "12cm"
 */
export const getUnitValueComponents = (input: string) =>
  input.match(/^(?<value>\d+)(?<units>\w+)$/)?.groups;

// Passport Field Validators

export const isValidByr = (byr: string) => isYearInRange(byr, 1920, 2002);

export const isValidIyr = (iyr: string) => isYearInRange(iyr, 2010, 2020);

export const isValidEyr = (eyr: string) => isYearInRange(eyr, 2020, 2030);

export const isValidHgt = (hgt: string) => {
  // get components of the expected format
  const { units, value } = getUnitValueComponents(hgt) ?? {};

  switch (units) {
    case "cm":
      return isInRange(parseInt(value), 150, 193);
    case "in":
      return isInRange(parseInt(value), 59, 76);
    default:
      // this handles incorrect units AND incorrect input format
      return false;
  }
};

export const isValidHcl = (hcl: string) => isHexColor(hcl);

export const isValidEcl = (ecl: string) => validEyeColors.includes(ecl);

export const isValidPid = (pid: string) => isNDigits(pid, 9);

/** hashmap to lookup validators by field key */
export const validatorLookup = {
  byr: isValidByr,
  iyr: isValidIyr,
  eyr: isValidEyr,
  hgt: isValidHgt,
  hcl: isValidHcl,
  ecl: isValidEcl,
  pid: isValidPid,
};
