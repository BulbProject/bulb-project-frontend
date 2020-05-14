import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Classification as OCDSClassification } from 'ts4ocds';

import Styled from './Classification.styles';

export const Classification: React.FC<OCDSClassification & { className?: string; isDisabled?: boolean }> = ({
  id,
  description,
  isDisabled,
  className = '',
}) => {
  return (
    <Flex className={className}>
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
