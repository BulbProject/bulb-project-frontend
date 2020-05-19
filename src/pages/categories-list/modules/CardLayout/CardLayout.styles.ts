import styled, { css } from 'styled-components';

const imageStyles = (image?: string) =>
  image
    ? css`
        background-image: url(${image});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
        object-fit: cover;
      `
    : '';

const Cell = styled.div(
  ({ image }: { image?: string }) => css`
    ${imageStyles(image)};
  `
);

const WideCell = styled(Cell)`
  grid-column: span 2;
`;

const BigCell = styled(Cell)`
  grid-column: span 2;
  grid-row: span 2;
`;

export default {
  WideCell,
  BigCell,
  Cell,
};
