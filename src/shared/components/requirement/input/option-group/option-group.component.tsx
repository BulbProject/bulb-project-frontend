import React, { FC, useMemo } from 'react';
import { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { OptionGroup as OptionGroupType, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Select from 'ustudio-ui/components/Select/Select';

import { Field } from '../field';
import { mapOptionsToItems } from '../utils';

import Styled from './option-group.styles';

export const OptionGroup: FC<{
  optionGroup?: OptionGroupType;
  requirement: RequirementWithOptionDetails;
  isDisabled?: boolean;
  defaultValue?: string;
  isDefaultOpen?: boolean;
}> = ({ optionGroup, requirement, isDisabled, defaultValue, isDefaultOpen }) => {
  const optionsMap = useMemo(() => (optionGroup ? mapOptionsToItems(optionGroup.options) : {}), [optionGroup?.options]);

  const { t } = useTranslation('common');

  return (
    <Field requirement={requirement} isDisabled={isDisabled}>
      <Select
        placeholder={t('choose-option')}
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
