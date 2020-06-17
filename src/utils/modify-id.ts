export const modifyId = (id: string, position: number, modifyCallback: (id: number) => number): string => {
  if (!new RegExp(`\\d{${id.length}}`).test(id)) {
    throw new TypeError('Id should include only numbers');
  }

  if (position < 0 || position > id.length / 2) {
    throw new RangeError('Position should be positive number no more than a half of id length');
  }

  const actualPosition = (position - 1) * 2;
  const modifiedId = Math.min(Math.abs(modifyCallback(+id.slice(actualPosition, actualPosition + 2))), 99);

  return `${id.slice(0, actualPosition)}${modifiedId > 9 ? modifiedId : `0${modifiedId}`}${id.slice(
    actualPosition + 2
  )}`;
};
