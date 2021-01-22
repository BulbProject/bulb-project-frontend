import React, { FC } from 'react';
import Carousel from 'react-multi-carousel';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

interface CarouselProps {
  images: string[];
}

export const MdCarousel: FC<CarouselProps> = ({ images }) => {
  return (
    <Carousel responsive={responsive}>
      {images.map((image) => {
        return (
          <img src={image} alt="1" key={image} />
        )
      })}
    </Carousel>
  );
};
