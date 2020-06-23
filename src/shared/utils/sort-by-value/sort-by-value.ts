// eslint-disable-next-line @typescript-eslint/ban-types
export const sortByValue = <E extends object>(key: keyof E) => (firstObject: E, secondObject: E): number => {
  return (((firstObject?.[key] as unknown) as string) || '').localeCompare(
    ((secondObject?.[key] as unknown) as string) || ''
  );
};
