export type Params = { [key: string]: string };

export type ResErrorDataType = [
  boolean,
  {
    title: string;
    message: string;
    code: number;
  },
  string
];
