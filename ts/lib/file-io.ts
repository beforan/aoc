export const splitTextFileLines = (fileContent: string) =>
  fileContent.split(/\r?\n/); // should be xplat

export const readAndSplitInputFile = async (
  day: number,
  inputFilePath?: string
) => {
  const file = await Deno.readTextFile(
    inputFilePath ?? `./day${day}/day${day}_input.txt`
  );

  return splitTextFileLines(file);
};
