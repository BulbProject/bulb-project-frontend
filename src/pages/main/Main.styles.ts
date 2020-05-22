import styled, { css } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';
import Flex from 'ustudio-ui/components/Flex';

import StyledCategories from 'pages/categories-list/CategoriesList.styles';

const CategoryListWrapper = styled(Flex)`
  align-items: center;

  min-height: 100vh;

  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));
`;

const Main = styled.main`
  height: 100vh;

  scroll-snap-type: y mandatory;
  overflow-y: auto;

  ${StyledCategories.Grid} {
    ${Mixin.Screen.xs(css`
      grid-auto-rows: calc(100vh / 3);
    `)}
  }
`;

const ScrollIndicators = styled.div`
  position: fixed;
  right: var(--i-large);
  top: 0;
`;

const Indicator = styled.div(
  ({ isActive }: { isActive: boolean }) => css`
    width: 15px;
    height: 15px;

    margin: var(--i-medium);

    border-radius: 50%;

    background-color: ${isActive ? 'var(--c-primary)' : 'var(--c-light)'};
  `
);

const ScrollWrapper = styled.div`
  scroll-snap-align: start;
`;

export default { CategoryListWrapper, Main, ScrollWrapper, ScrollIndicators, Indicator };
