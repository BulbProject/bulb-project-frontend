import { Option } from 'ts4ocds/extensions/options';
import { Item } from 'ustudio-ui/components/Select/select.types';

import { sortByValue } from 'shared/utils';

export const mapOptionsToItems = (options: Option[]): Record<string, Item> => {
  return options.sort(sortByValue('id')).reduce(
    (map, option) =>
      Object.assign(map, {
        [option.value as string]: { value: option.value, label: option.title },
      }),
    {}
  );
};
