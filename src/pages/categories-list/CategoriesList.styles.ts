import styled, { css } from 'styled-components';

const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(calc(100% / 6), 1fr));

  grid-auto-rows: calc((100vh - 64px - 118px - 36px - 36px) / 3);

  grid-auto-flow: dense;
`;

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

const CategoryHeader = styled.div`
  padding: var(--i-large);
  display: flex;
  align-items: center;
  height: 100%;
`;

export default {
  LoaderContainer,
  Grid,
  WideCell,
  BigCell,
  Cell,
  CategoryHeader,
};
