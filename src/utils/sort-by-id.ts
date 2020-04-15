const sortById = <E extends { id: string | number }>({ id: firstId }: E, { id: secondId }: E): number => {
  return (firstId as string).localeCompare(secondId as string);
};

export default sortById;
