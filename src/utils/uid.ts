export const uid = (): string =>
  Math.random()
    .toString()
    .slice(2);
