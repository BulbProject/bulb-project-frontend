import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { Classification } from 'shared';

import { CategoryCardProps } from '../../Card.types';

import Styled from '../../Card.styles';

export const BaseCard = ({ title, description, classification, status }: CategoryCardProps) => {
  const isXs = useMediaQuery('screen and (min-width: 576px)');
  const isDisabled = status === 'pending';

  return (
    <Styled.Card direction="column" isDisabled={isDisabled}>
      <Styled.CardTitle variant="h5" isDisabled={isDisabled}>
        {title}
      </Styled.CardTitle>

      {isXs && (
        <Flex margin={{ bottom: 'regular' }}>
          <Text color={isDisabled ? 'var(--c-neutral)' : 'var(--c-dark)'} variant="small">
            {description}
          </Text>
        </Flex>
      )}

      <Classification {...classification} isDisabled={isDisabled} />
    </Styled.Card>
  );
};
