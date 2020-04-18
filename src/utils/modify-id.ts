export const modifyId = (id: string, position: number, modifyCallback: (id: number) => number): string => {
  const actualPosition = (position - 1) * 2;
  const modifiedId = modifyCallback(+id.slice(actualPosition, actualPosition + 2));

  return `${id.slice(0, actualPosition)}${modifiedId > 9 ? modifiedId : `0${modifiedId}`}${id.slice(
    actualPosition + 2
  )}`;
};
