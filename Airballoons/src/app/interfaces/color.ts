export interface IColor {
  code: string;
  name: string;
}

export class Color implements IColor {
  code: string;
  name: string;
  constructor(
    code?: string,
    name?: string
  ) {}
}
