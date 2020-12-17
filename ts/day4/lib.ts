import {
  looseModeOptionalPassportFields,
  requiredPassportFields,
} from "./constants.ts";
import { validatorLookup } from "./validators.ts";

export const splitPassportFields = (passport: string) =>
  passport.split(/(?:\r?\n)|\s/);

export const parsePassportField = (field: string) => field.split(":");

export const parsePassport = (passport: string) => {
  const fields = splitPassportFields(passport);

  return fields.reduce((result, field) => {
    const [key, value] = parsePassportField(field);
    return { ...result, [key]: value };
  }, {});
};

export const isPassportValid = (
  passport: { [key: string]: string },
  looseMode = false,
  validateContent = false
) => {
  for (const key of requiredPassportFields) {
    // if this field is ok in "loose mode", don't bother checking
    if (looseMode && looseModeOptionalPassportFields.includes(key)) continue;

    // we early exit if invalid

    // check required key is present
    if (!passport[key]) return false;

    // check required key is valid
    if (validateContent) {
      if (!validatorLookup[key](passport[key])) return false;
    }
  }
  return true;
};

export const validatePassports = (
  passports: string[],
  looseMode = false,
  validateContent = false
) =>
  passports.map((x) =>
    isPassportValid(parsePassport(x), looseMode, validateContent)
  );

export const countValid = (validationResults: boolean[]) =>
  validationResults.filter((x) => !!x).length;

export const countValidPassports = (
  passports: string[],
  looseMode = false,
  validateContent = false
) => countValid(validatePassports(passports, looseMode, validateContent));
