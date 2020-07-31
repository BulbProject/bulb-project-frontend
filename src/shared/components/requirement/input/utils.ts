import type { OptionGroup, Option } from 'ts4ocds/extensions/options';
import { Item } from 'ustudio-ui/components/Select/select.types';

import { sortByValue } from 'shared/utils';

export const mapOptionsToItems = (
  { options, id}: OptionGroup,
  getValue?: ({ option, optionGroupId }: { option: Option; optionGroupId: string | number }) => string
): Record<string, Item> => {
  return options.sort(sortByValue('id')).reduce((map, option) => {
    const value = getValue ? getValue({ option, optionGroupId: id }) : option.value;

    return Object.assign(map, {
      [value]: { value, label: option.description },
    });
  }, {});
};
