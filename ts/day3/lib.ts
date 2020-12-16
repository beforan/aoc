export const wrapInteger = (input: number, limit: number, start = 0) =>
  start + ((input - start) % (limit - start));