export type PasswordValidator = (
  password: string,
  char: string,
  charMin: number,
  charMax: number
) => boolean;

export enum PasswordPolicy {
  SledRental,
  TobogganRental,
}
