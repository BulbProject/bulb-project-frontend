export const stringToKebabCase = (string: string) => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const kebabCaseToSentenceCase = (string: string) => {
  const lowerCase = string.split('-').reduce((_, word) => (_ ? `${_} ${word}` : word), '');

  return lowerCase[0].toUpperCase() + lowerCase.slice(1);
};
