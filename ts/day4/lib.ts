import {
  looseModeOptionalPassportFields,
  requiredPassportFields,
} from "./constants.ts";

export const XplatDoubleNewLine = /\r?\n\r?\n/;

export const doubleNewLineSplit = (input: string) =>
  input.split(XplatDoubleNewLine);

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
  looseMode = false
) => {
  for (let key of requiredPassportFields) {
    // if this field is ok in "loose mode", don't bother checking
    if (looseMode && looseModeOptionalPassportFields.includes(key)) continue;

    // early exit if invalid
    if (!passport[key]) return false;
  }
  return true;
};
