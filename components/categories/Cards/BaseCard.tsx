import React from 'react';
import Link from 'next/link';

import Styled from '../../../styles/categories';
import Classification from '../../../components/Classification';
import { CategoryCard } from './props';

const BaseCard = ({ id, version, title, description, classification }: CategoryCard) => {
  return (
    <Link key={`${id}-${version}`} href={`/categories/${id}/${version}`} passHref>
      <Styled.Link>
        <Styled.Card direction="column">
          <Styled.CardTitle variant="h5">{title}</Styled.CardTitle>

          <Styled.CardDescription variant="small">{description}</Styled.CardDescription>

          <Classification id={classification.id} description={classification.description} />
        </Styled.Card>
      </Styled.Link>
    </Link>
  );
};

export default BaseCard;
