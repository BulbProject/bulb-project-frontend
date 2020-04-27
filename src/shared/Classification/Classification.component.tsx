import React from 'react';

import { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Classification as OCDSClassification } from 'ts4ocds';

export const Classification: React.FC<OCDSClassification & { className?: string }> = ({
  id,
  description,
  className = '',
}) => {
  return (
    <Flex className={className}>
      <Text
        variant="small"
        color="var(--c-secondary)"
        styled={{
          Text: css`
            white-space: nowrap;
          `,
        }}
      >
        {id}
      </Text>

      {description && (
        <Flex margin={{ left: 'regular' }}>
          <Text variant="small" color="var(--c-dark)">
            {description}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
