export const wrapInteger = (input: number, limit: number, start = 0) =>
  start + ((input - start) % (limit - start));

export const countTreesOnRoute = (rows: string[], dx: number, dy: number) => {
  const mapWidth = rows[0].length;
  const grid: { [key: number]: string[] } = {};

  let treeCount = 0;

  // start co-ords
  let x = 0;

  // keep going until we reach the bottom of the slope
  for (let y = dy; y < rows.length; y += dy) {
    x = wrapInteger(x + dx, mapWidth);

    // split the row into columns once and cache it
    if (!grid[y]) grid[y] = rows[y].split("");
    // hereafter use the cached row

    if (grid[y][x] === "#") treeCount++;
  }

  return treeCount;
};
