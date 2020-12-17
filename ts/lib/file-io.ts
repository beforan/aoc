export const XplatNewLine = /\r?\n/;
export const XplatDoubleNewLine = /\r?\n\r?\n/;

export const newLineSplit = (fileContent: string) =>
  fileContent.split(XplatNewLine);

export const doubleNewLineSplit = (input: string) =>
  input.split(XplatDoubleNewLine);

export const readInputFile = async (day: number, inputFilePath?: string) =>
  await Deno.readTextFile(inputFilePath ?? `./day${day}/day${day}_input.txt`);

/**
 * Get all lines from an input file
 * @param day
 * @param inputFilePath
 */
export const readInputLines = async (day: number, inputFilePath?: string) => {
  const file = await readInputFile(day, inputFilePath);

  return newLineSplit(file);
};

/**
 * Get an array of "groups" from an input file,
 * where each group is separated by two new lines
 * @param day
 * @param inputFilePath
 */
export const readInputGroups = async (day: number, inputFilePath?: string) => {
  const file = await readInputFile(day, inputFilePath);

  return doubleNewLineSplit(file);
};
