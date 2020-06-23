import React, { FC } from 'react';
import { Unit } from 'ts4ocds';
import { OptionDetails } from 'ts4ocds/extensions/options';
import { DataType } from 'ts4ocds/extensions/requirements';

import { isBoolean } from '../utils';

import Styled from './title.styles';

const parseOptionGroupsDescription = ({
  optionDetails,
  unit,
}: {
  optionDetails: OptionDetails;
  unit?: Unit;
}): string | undefined => {
  if ('optionGroups' in optionDetails) {
    return `${optionDetails.optionGroups[0].description}${unit ? `, ${unit.name}` : ''}`;
  }
};

export const Title: FC<{
  dataType?: DataType;
  isDisabled?: boolean;
  hasSingleOptionGroup: boolean;
  optionDetails: OptionDetails;
  unit?: Unit;
  title?: string;
}> = ({ dataType, isDisabled, hasSingleOptionGroup, optionDetails, unit, title }) => {
  return (
    <Styled.Title
      variant="caption"
      isBoolean={isBoolean(dataType)}
      color={isDisabled ? 'var(--c-neutral)' : 'var(--c-darkest)'}
    >
      {hasSingleOptionGroup ? parseOptionGroupsDescription({ optionDetails, unit }) : title}
    </Styled.Title>
  );
};
