export const splitTextFileLines = (fileContent: string) =>
    fileContent.split(/\r?\n/); // should be xplat