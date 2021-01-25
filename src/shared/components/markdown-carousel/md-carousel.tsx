import React, { FC } from 'react';
import Carousel from 'react-multi-carousel';

const responsive = {
  mobile: {
    breakpoint: {
      max: 576,
      min: 320,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 576,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 1,
  },
};

interface CarouselProps {
  images: string[];
}

export const MdCarousel: FC<CarouselProps> = ({ images }) => {
  return (
    <Carousel responsive={responsive}>
      {images.map((image) => {
        return <img src={image} alt="1" key={image} />;
      })}
    </Carousel>
  );
};
