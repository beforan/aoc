export const XplatNewLine = /\r?\n/;

export const splitTextFileLines = (fileContent: string) =>
  fileContent.split(XplatNewLine);

export const readAndSplitInputFile = async (
  day: number,
  inputFilePath?: string
) => {
  const file = await Deno.readTextFile(
    inputFilePath ?? `./day${day}/day${day}_input.txt`
  );

  return splitTextFileLines(file);
};
