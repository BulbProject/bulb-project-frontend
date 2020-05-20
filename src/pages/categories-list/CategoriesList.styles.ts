import styled, { css } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';
import Text from 'ustudio-ui/components/Text';
import StyledLayout from './modules/CardLayout/CardLayout.styles';

const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const Grid = styled.div(
  ({ elementAmount }: { elementAmount: number }) => css`
    display: grid;

    grid-template-columns: repeat(${elementAmount}, 100%);
    grid-auto-rows: 100vw;

    overflow: scroll;
    grid-auto-flow: column;

    ${Mixin.Screen.xs(css`
      grid-template-columns: repeat(auto-fit, minmax(calc(100% / 2), 1fr));
      grid-auto-rows: calc((100vh - 64px - 118px - var(--i-large) * 2) / 3);

      grid-auto-flow: dense;

      overflow: hidden;
    `)}

    ${Mixin.Screen.lg(css`
      grid-template-columns: repeat(auto-fit, minmax(calc(100% / 4), 1fr));
    `)}

  @media screen and (min-width: 1500px) {
      grid-template-columns: repeat(auto-fit, minmax(calc(100% / 6), 1fr));
    }
  `
);

const CategoriesHeader = styled.div`
  padding: var(--i-large);
  display: flex;
  align-items: center;
  height: 100%;
`;

const Title = styled(Text)`
  font-weight: 400;
`;

export default {
  LoaderContainer,
  Grid,
  CategoriesHeader,
  Title,
  BigCell: StyledLayout.BigCell,
};
