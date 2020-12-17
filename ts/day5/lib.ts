import { BspDirection } from "./types.ts";

/**
 * Equally partitions the integer range 0 - `limit`
 * and returns the lower or upper partitioned range
 * @param limit inclusive upper bound of the range to partition
 * @param direction lower or upper partitioned range to return
 */
export const integerBsp = (limit: number, direction: BspDirection) => {
  const splitValue = Math.floor(limit / 2);
  return direction === BspDirection.Lower
    ? [0, splitValue]
    : [splitValue + 1, limit];
};

/**
 * Run integerBsp for a sequence of directions,
 * maintaining the result within the range
 * @param initialLimit
 * @param directions
 */
export const iterativeBsp = (
  initialLimit: number,
  directions: BspDirection[]
) =>
  directions.reduce(
    (state, dir) => {
      const [offset, limit] = integerBsp(state.limit - state.offset, dir);

      return {
        offset,
        limit,
        result: [state.result[0] + offset, state.result[0] + limit],
      };
    },
    { limit: initialLimit, offset: 0, result: [0, 0] }
  ).result;

export const parseSeatCodeSection = (
  code: string,
  lowerChar: string,
  upperChar: string
) =>
  iterativeBsp(
    Math.pow(2, code.length) - 1,
    code.split("").map((c) => {
      if (c === lowerChar[0]) return BspDirection.Lower;
      if (c === upperChar[0]) return BspDirection.Upper;
      throw new Error(`Invalid Seat Code Character: ${c}`);
    })
  );

export const parseBoardingPass = (pass: string) => {
  const validPattern = /^(?<rowCode>[FB]{7})(?<colCode>[LR]{3})$/;
  const { rowCode, colCode } = pass.match(validPattern)?.groups ?? {};

  if (!rowCode || !colCode) throw new Error(`Invalid Boarding Pass: ${pass}`);

  const row = parseSeatCodeSection(rowCode, "F", "B")[0];
  const col = parseSeatCodeSection(colCode, "L", "R")[0];

  return { row, col, seatId: row * 8 + col };
};
