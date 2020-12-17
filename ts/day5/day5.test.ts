import { BspDirection } from "./types.ts";
import { assertEquals } from "https://deno.land/std@0.81.0/testing/asserts.ts";
import {
  integerBsp,
  iterativeBsp,
  parseBoardingPass,
  parseSeatCodeSection,
} from "./lib.ts";

Deno.test("Integer BSP", () => {
  const expected: { [key: number]: number[] } = {
    [BspDirection.Lower]: [0, 63],
    [BspDirection.Upper]: [64, 127],
  };

  Object.keys(expected).forEach((k) => {
    const direction = parseInt(k);
    assertEquals(integerBsp(127, direction), expected[direction]);
  });

  const expectedSingle = [0, 0];
  assertEquals(integerBsp(1, BspDirection.Lower), expectedSingle);
});

Deno.test("Iterative BSP", () => {
  /*
    Start by considering the whole range, rows 0 through 127.
    F means to take the lower half, keeping rows 0 through 63.
    B means to take the upper half, keeping rows 32 through 63.
    F means to take the lower half, keeping rows 32 through 47.
    B means to take the upper half, keeping rows 40 through 47.
    B keeps rows 44 through 47.
    F keeps rows 44 through 45.
    The final F keeps the lower of the two, row 44.
    */
  let expected = [44, 44];
  let actual = iterativeBsp(127, [
    BspDirection.Lower,
    BspDirection.Upper,
    BspDirection.Lower,
    BspDirection.Upper,
    BspDirection.Upper,
    BspDirection.Lower,
    BspDirection.Lower,
  ]);

  assertEquals(actual, expected);

  /*
    Start by considering the whole range, columns 0 through 7.
    R means to take the upper half, keeping columns 4 through 7.
    L means to take the lower half, keeping columns 4 through 5.
    The final R keeps the upper of the two, column 5.
   */
  expected = [5, 5];
  actual = iterativeBsp(7, [
    BspDirection.Upper,
    BspDirection.Lower,
    BspDirection.Upper,
  ]);

  assertEquals(actual, expected);
});

Deno.test("parseSeatCodeSection", () => {
  const data = [
    { row: "FBFBBFF", col: "RLR" },
    { row: "BFFFBBF", col: "RRR" },
    { row: "FFFBBBF", col: "RRR" },
    { row: "BBFFBBF", col: "RLL" },
  ];
  const expectedRows = [44, 70, 14, 102];
  const expectedCols = [5, 7, 7, 4];

  data.forEach(({ row, col }, i) => {
    assertEquals(
      parseSeatCodeSection(row, "F", "B"),
      Array(2).fill(expectedRows[i])
    );
    assertEquals(
      parseSeatCodeSection(col, "L", "R"),
      Array(2).fill(expectedCols[i])
    );
  });
});

Deno.test("parseBoardingPass", () => {
  const data = ["FBFBBFFRLR", "BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"];
  const expected = [
    { row: 44, col: 5, seatId: 357 },
    { row: 70, col: 7, seatId: 567 },
    { row: 14, col: 7, seatId: 119 },
    { row: 102, col: 4, seatId: 820 },
  ];

  data.forEach((pass, i) => assertEquals(parseBoardingPass(pass), expected[i]));
});
