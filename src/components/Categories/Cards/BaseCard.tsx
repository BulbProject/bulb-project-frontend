import React from 'react';

import Styled from '../../../styles/categories';
import Classification from '../../Classification';

import { CategoryCard } from './props';

const BaseCard = ({ id, version, title, description, classification }: CategoryCard) => {
  return (
    <Styled.Link key={`${id}-${version}`} to={`/categories/${id}/${version}`}>
      <Styled.Card direction="column">
        <Styled.CardTitle variant="h5">{title}</Styled.CardTitle>

        <Styled.CardDescription variant="small">{description}</Styled.CardDescription>

        <Classification id={classification.id} description={classification.description} />
      </Styled.Card>
    </Styled.Link>
  );
};

export default BaseCard;
