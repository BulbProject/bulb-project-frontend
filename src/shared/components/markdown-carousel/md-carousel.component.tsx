import React, { FC } from 'react';
import ChevronIcon from '../../../assets/icons/chevron.inline.svg';

import Styled from './md-carousel.styles';

interface CarouselProps {
  images: string[];
}

export const MdCarousel: FC<CarouselProps> = ({ images }) => {
  return (
    <Styled.Container>
      <Styled.PreviousButton>
        <ChevronIcon />
      </Styled.PreviousButton>

      <Styled.List>
        {images.map((image) => {
          return (
            <Styled.Item key={image}>
              <Styled.Image src={image} alt="2" />
            </Styled.Item>
          );
        })}
      </Styled.List>

      <Styled.NextButton>
        <ChevronIcon />
      </Styled.NextButton>
    </Styled.Container>
  );
};
