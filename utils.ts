export const kebabCaseToSentenceCase = (string: string) => {
  const loverCase = string.split('-').reduce((_, word) => (_ ? `${_} ${word}` : word), '');

  return loverCase[0].toUpperCase() + loverCase.slice(1);
};
