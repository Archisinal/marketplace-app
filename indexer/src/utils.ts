export const fromBytesToString = (bytes: number[]): string => {
  return Buffer.from(bytes).toString();
};
