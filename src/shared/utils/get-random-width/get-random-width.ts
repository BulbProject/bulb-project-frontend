export const getRandomWidth = (min: number, max: number): string => {
  if (min === undefined && max === undefined) {
    throw new ReferenceError('Min and max should be positive numbers.');
  }

  if (min === undefined) {
    throw new ReferenceError('Min should be a positive number.');
  }

  if (max === undefined) {
    throw new ReferenceError('Max should be a positive number.');
  }

  if (min < 0) {
    throw new RangeError('Min should be a positive number.');
  }

  if (max < 0) {
    throw new RangeError('Max should be a positive number.');
  }

  if (min > max) {
    throw new RangeError('Min should be less than max.');
  }

  if (min === max) {
    throw new RangeError('Min should not be equal to max.');
  }

  return `${Math.floor(Math.random() * (max - min)) + min}%`;
};
