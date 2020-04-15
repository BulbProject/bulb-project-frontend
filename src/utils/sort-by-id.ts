const sortById = <E extends { id: string }>({ id: firstId }: E, { id: secondId }: E): number => {
  return firstId.localeCompare(secondId);
};

export default sortById;
