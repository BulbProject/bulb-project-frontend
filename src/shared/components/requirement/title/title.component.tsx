import React, { FC } from 'react';
import { Unit } from 'ts4ocds';
import { OptionDetails } from 'ts4ocds/extensions/options';
import { DataType } from 'ts4ocds/extensions/requirements';

import { isBoolean } from '../utils';

import Styled from './title.styles';

const titleGenerator = (
  title: string,
  hasSingleOptionGroup?: boolean,
  optionDetails?: OptionDetails,
  unit?: Unit
): string => {
  const safeUnit = unit ? `, ${unit.name}` : '';

  if (
    optionDetails !== undefined &&
    hasSingleOptionGroup &&
    'optionGroups' in optionDetails &&
    optionDetails.optionGroups[0].description
  ) {
    return `${optionDetails.optionGroups[0].description}${safeUnit}`;
  }

  return `${title}${safeUnit}`;
};

export const Title: FC<{
  dataType?: DataType;
  isDisabled?: boolean;
  hasSingleOptionGroup?: boolean;
  optionDetails?: OptionDetails;
  unit?: Unit;
  title: string;
  color?: string;
}> = ({ dataType, isDisabled, hasSingleOptionGroup, optionDetails, unit, title, color = 'var(--c-darkest)' }) => {
  return (
    <Styled.Title variant="caption" isBoolean={isBoolean(dataType)} color={isDisabled ? 'var(--c-neutral)' : color}>
      {titleGenerator(title, hasSingleOptionGroup, optionDetails, unit)}
    </Styled.Title>
  );
};
