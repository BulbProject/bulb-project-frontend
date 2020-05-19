import styled from 'styled-components';

import StyledLayout from './modules/CardLayout/CardLayout.styles';

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

const CategoriesHeader = styled.div`
  padding: var(--i-large);
  display: flex;
  align-items: center;
  height: 100%;
`;

export default {
  LoaderContainer,
  Grid,
  CategoriesHeader,
  BigCell: StyledLayout.BigCell,
};
