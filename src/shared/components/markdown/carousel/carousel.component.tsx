import React, { FC, useState } from 'react';
import ChevronIcon from '../../../../assets/icons/chevron.inline.svg';

import Styled from './carousel.styles';

interface CarouselProps {
  images: string[];
}

const createItemId = (index: number): string => `item-${index}`;

const createItemAnchor = (index: number): string => `#${createItemId(index)}`;

export const Carousel: FC<CarouselProps> = ({ images }) => {
  const [activeAnchor, setActiveAnchor] = useState(0);

  return (
    <Styled.CarouselWrapper>
      <Styled.Carousel>
        <Styled.PreviousButton>
          <ChevronIcon />
        </Styled.PreviousButton>

        <Styled.List>
          {images.map((image, index) => {
            const prevIndex = index === 0 ? images.length - 1 : index - 1;
            const nextIndex = index + 1 < images.length ? index + 1 : 0;

            return (
              <Styled.Item key={image} id={createItemId(index)}>
                <Styled.PreviousAnchor to={createItemAnchor(prevIndex)} onClick={() => setActiveAnchor(prevIndex)} />

                <Styled.Image src={image} alt="2" />

                <Styled.NextAnchor to={createItemAnchor(nextIndex)} onClick={() => setActiveAnchor(nextIndex)} />
              </Styled.Item>
            );
          })}
        </Styled.List>

        <Styled.NextButton>
          <ChevronIcon />
        </Styled.NextButton>
      </Styled.Carousel>

      <Styled.NavigationList>
        {[...new Array(images.length).keys()].map((key) => {
          return (
            <li key={key}>
              <Styled.NavigationItem
                to={createItemAnchor(key)}
                data-active={key === activeAnchor}
                onClick={() => setActiveAnchor(key)}
              />
            </li>
          );
        })}
      </Styled.NavigationList>
    </Styled.CarouselWrapper>
  );
};
