const modifyId = (id: string, position: number, modifyCallback: (id: number) => number): string => {
  const modifiedId = modifyCallback(+id.slice((position - 1) * 2, (position - 1) * 2 + 2));

  return `${modifiedId > 9 ? modifiedId : `0${modifiedId}`}${id.slice(2)}`;
};

export default modifyId;
