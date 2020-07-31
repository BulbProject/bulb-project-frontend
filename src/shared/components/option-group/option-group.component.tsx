import React, { FC, useMemo } from 'react';
import { css } from 'styled-components';
import Select from 'ustudio-ui/components/Select/Select';
import type { OptionGroup as OptionGroupType, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import { Field } from '../requirement/input/field';
import { mapOptionsToItems } from '../requirement/input/utils';

import Styled from './option-group.styles';

export const OptionGroup: FC<{
  optionGroup?: OptionGroupType;
  requirement: RequirementWithOptionDetails;
  isDisabled?: boolean;
  defaultValue?: string;
  isDefaultOpen?: boolean;
}> = ({ optionGroup, requirement, isDisabled, defaultValue, isDefaultOpen }) => {
  const optionsMap = useMemo(() => (optionGroup ? mapOptionsToItems(optionGroup) : {}), [
    optionGroup?.options,
  ]);

  return (
    <Field requirement={requirement} isDisabled={isDisabled}>
      <Select
        placeholder="Виберіть один із доступних варіантів"
        autocomplete={Object.values(optionsMap).length >= 10}
        isDisabled={isDisabled}
        items={optionsMap}
        defaultValue={defaultValue}
        isDefaultOpen={isDefaultOpen}
        styled={{
          ValuesListItem: Styled.ValuesListItem,
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          Dropdown: ({ isOpen }: { isOpen: boolean }) =>
            // eslint-disable-next-line new-cap
            Styled.Dropdown({ isOpen, quantity: Object.keys(optionsMap).length }),
          Overlay: isDefaultOpen
            ? css`
                display: none;
              `
            : css``,
        }}
      />
    </Field>
  );
};
