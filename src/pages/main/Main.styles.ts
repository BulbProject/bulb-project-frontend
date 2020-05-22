import styled, { css } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';

import StyledCategories from 'pages/categories-list/CategoriesList.styles';

const CategoryListWrapper = styled.div`
  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));
`;

const Main = styled.main`
  height: 100vh;

  scroll-snap-type: y mandatory;
  overflow-y: scroll;

  ${StyledCategories.Grid} {
    ${Mixin.Screen.xs(css`
      grid-auto-rows: calc(100vh / 3);
    `)}
  }
`;

const ScrollWrapper = styled.div`
  scroll-snap-align: start;
`;

export default { CategoryListWrapper, Main, ScrollWrapper };
