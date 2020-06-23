import styled, { css } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';
import Text from 'ustudio-ui/components/Text';
import StyledLayout from './card-layout/card-layout.styles';

const CategoriesListContainer = styled.div`
  position: relative;

  width: 100%;
`;

const computeColumnTemplate = (columnCount: number) => `repeat(auto-fit, minmax(calc(100% / ${columnCount}), 1fr))`;

const Grid = styled.div(
  ({ elementAmount }: { elementAmount: number }) => css`
    display: grid;

    grid-template-columns: repeat(${elementAmount}, 100%);
    grid-auto-rows: 100vw;

    overflow-x: auto;
    scroll-snap-type: x mandatory;

    grid-auto-flow: column;

    ${Mixin.Screen.xs(css`
      grid-template-columns: ${computeColumnTemplate(2)};
      grid-auto-rows: minmax(calc((100vh - 64px - 112px) / 3), auto);

      grid-auto-flow: dense;

      overflow: hidden;
    `)}

    ${Mixin.Screen.lg(css`
      grid-template-columns: ${computeColumnTemplate(4)};
    `)}

  @media screen and (min-width: 1500px) {
      grid-template-columns: ${computeColumnTemplate(6)};
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
  color: var(--c-contrast-strong);
  font-weight: 400;
`;

const Styled = {
  CategoriesListContainer,
  Grid,
  CategoriesHeader,
  Title,
  BigCell: StyledLayout.BigCell,
};

export default Styled;
