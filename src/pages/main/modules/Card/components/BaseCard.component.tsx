import React from 'react';

import { Classification } from 'shared';

import { CategoryCardProps } from '../Card.types';

import Styled from '../Card.styles';

const BaseCard = ({ id, version, title, description, classification }: CategoryCardProps) => {
  return (
    <Styled.Link key={`${id}-${version}`} to={`/categories/${id}/${version}`}>
      <Styled.Card direction="column">
        <Styled.CardTitle variant="h5">{title}</Styled.CardTitle>

        <Styled.CardDescription variant="small">{description}</Styled.CardDescription>

        <Classification {...classification} />
      </Styled.Card>
    </Styled.Link>
  );
};

export default BaseCard;
