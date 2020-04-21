import React from 'react';
import { Classification as OCDSClassification } from 'ts4ocds';
import { Flex } from 'ustudio-ui';

import Styled from './Classification.styles';

const Classification: React.FC<OCDSClassification & { className?: string }> = ({ id, description, className = '' }) => {
  return (
    <Flex className={className}>
      <Styled.Id variant="small">{id}</Styled.Id>

      {description && <Styled.Description variant="small">{description}</Styled.Description>}
    </Flex>
  );
};

export default Classification;
