import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Classification as OCDSClassification } from 'ts4ocds/standard';

import Styled from './classification.styles';

export const Classification: React.FC<
  {
    className?: string;
    isDisabled?: boolean;
  } & OCDSClassification
> = ({ id, description, isDisabled, className = '' }) => {
  return (
    <Flex className={className} isInline>
      <Styled.ClassificationId variant="small" isDisabled={!!isDisabled}>
        {id}
      </Styled.ClassificationId>

      {description && (
        <Text variant="small" color={isDisabled ? 'var(--c-neutral)' : 'var(--c-dark)'}>
          {description}
        </Text>
      )}
    </Flex>
  );
};
