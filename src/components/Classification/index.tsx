import React from 'react';
import { Classification as OCDSClassification } from 'ts4ocds';
import { Flex, Text } from 'ustudio-ui';

import Styled from './styles';

const Classification: React.FC<OCDSClassification & { className?: string }> = ({ id, description, className = '' }) => {
  return (
    <Flex className={className}>
      <Text variant="small">{id}</Text>

      {description && <Styled.Description variant="small">{description}</Styled.Description>}
    </Flex>
  );
};

export default Classification;
