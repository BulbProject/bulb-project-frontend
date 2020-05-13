export const containerCellProps = (size: number) => {
  return {
    offset: { before: (12 - size) / 2, after: (12 - size) / 2 },
    size,
  };
};
