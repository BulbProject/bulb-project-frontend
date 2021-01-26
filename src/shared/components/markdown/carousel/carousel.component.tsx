import React, { FC } from 'react';
import ChevronIcon from '../../../../assets/icons/chevron.inline.svg';

import Styled from './carousel.styles';

interface CarouselProps {
  images: string[];
}

export const Carousel: FC<CarouselProps> = ({ images }) => {
  return (
    <Styled.Carousel>
      <Styled.PreviousButton>
        <ChevronIcon />
      </Styled.PreviousButton>

      <Styled.List>
        {images.map((image, index) => {
          return (
            <Styled.Item key={image} id={`item-${index}`}>
              <Styled.PreviousAnchor to={`#item-${index - 1 === -1 ? images.length - 1 : Math.max(index - 1, 0)}`} />

              <Styled.Image src={image} alt="2" />

              <Styled.NextAnchor to={`#item-${index + 1 <= images.length - 1 ? index + 1 : 0}`} />
            </Styled.Item>
          );
        })}
      </Styled.List>

      <Styled.NextButton>
        <ChevronIcon />
      </Styled.NextButton>
    </Styled.Carousel>
  );
};
