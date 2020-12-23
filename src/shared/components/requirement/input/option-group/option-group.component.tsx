import React, { FC, useEffect, useMemo } from 'react';
import { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';
import Select from 'ustudio-ui/components/Select/Select';

import type { OptionGroupType } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';

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
  const { dispatch } = useCalculation();

  const optionsMap = useMemo(() => (optionGroup ? mapOptionsToItems(optionGroup.options) : {}), [optionGroup?.options]);

  const { t } = useTranslation('form');

  useEffect(() => {
    const { options } = optionGroup ?? ({} as OptionGroupType);
    const option = options.find(({ value, relatedRequirementID }) => value === defaultValue && relatedRequirementID);

    if (option) {
      const criterionId = `${option.relatedRequirementID?.slice(0, 2)}00000000`;

      dispatch.addRelatedRequirementId({
        criterionId,
        relatedRequirementId: option.relatedRequirementID as string,
      });
    }
  }, [defaultValue]);

  return (
    <Field requirement={requirement} isDisabled={isDisabled}>
      <Select
        placeholder={t('choose-option')}
        autocomplete={Object.values(optionsMap).length >= 10}
        isDisabled={isDisabled}
        items={optionsMap}
        defaultValue={Object.values(optionsMap).length === 1 ? Object.values(optionsMap)[0].value : defaultValue}
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
