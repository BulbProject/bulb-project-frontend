import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { Classification } from 'shared';

import { CategoryCardProps } from '../../Card.types';

import Styled from '../../Card.styles';

export const BaseCard = ({
  id,
  version,
  title,
  description,
  classification,
  isDisabled,
}: CategoryCardProps & { isDisabled: boolean }) => {
  const isXs = useMediaQuery('screen and (min-width: 576px)');

  return (
    <Styled.Link key={`${id}-${version}`} to={`/categories/${id}/${version}`}>
      <Styled.Card direction="column">
        <Styled.CardTitle variant="h5">{title}</Styled.CardTitle>

        {isXs && (
          <Flex margin={{ bottom: 'regular' }}>
            <Text color="var(--c-dark)" variant="small">
              {description}
            </Text>
          </Flex>
        )}

        <Classification {...classification} />
      </Styled.Card>
    </Styled.Link>
  );
};
