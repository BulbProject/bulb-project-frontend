import { Item } from 'ustudio-ui/components/Select/select.types';

import { sortByValue } from 'shared/utils';
import { OptionType } from 'shared/entity/data';

export const mapOptionsToItems = (options: OptionType[]): Record<string, Item> => {
  return options.sort(sortByValue('id')).reduce(
    (map, option) =>
      Object.assign(map, {
        [option.value as string]: { value: option.value, label: option.title },
      }),
    {}
  );
};
