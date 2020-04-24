import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Classification } from 'shared';

import { CategoryCardProps } from '../../Card.types';

import Styled from '../../Card.styles';

export const BaseCard = ({ id, version, title, description, classification }: CategoryCardProps) => {
  return (
    <Styled.Link key={`${id}-${version}`} to={`/categories/${id}/${version}`}>
      <Styled.Card direction="column">
        <Styled.CardTitle variant="h5">{title}</Styled.CardTitle>

        <Flex margin={{ bottom: 'regular' }}>
          <Text color="var(--c-dark)" variant="small">
            {description}
          </Text>
        </Flex>

        <Classification {...classification} />
      </Styled.Card>
    </Styled.Link>
  );
};
