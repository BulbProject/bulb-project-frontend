import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Classification as OCDSClassification } from 'ts4ocds';

import Styled from './Classification.styles';

export const Classification: React.FC<OCDSClassification & { className?: string }> = ({
  id,
  description,
  className = '',
}) => {
  return (
    <Flex className={className} isInline>
      <Styled.ClassificationId variant="small">{id}</Styled.ClassificationId>

      {description && (
        <Text variant="small" color="var(--c-dark)">
          {description}
        </Text>
      )}
    </Flex>
  );
};
