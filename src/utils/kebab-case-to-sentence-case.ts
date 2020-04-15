export const kebabCaseToSentenceCase = (string: string) => {
  const lowerCase = string.split('-').reduce((_, word) => (_ ? `${_} ${word}` : word), '');

  return lowerCase[0].toUpperCase() + lowerCase.slice(1);
};
