import { Option } from 'ts4ocds/extensions/options';
import { Item } from 'ustudio-ui/components/Select/select.types';

import { sortByValue } from 'shared/utils';

export const mapOptionsToItems = (options: Option[]): Record<string, Item> => {
  return options.sort(sortByValue('id')).reduce(
    (map, option) => {
      const value = `${`${option.id}`.slice(0, -4)}${'0'.repeat(4)}_${option.value}`;

      return Object.assign(map, {
        [value]: { value, label: option.description },
      });
    },
    {},
  );
};
