import styled, { css } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';
import Flex from 'ustudio-ui/components/Flex';

import StyledCategories from 'pages/categories-list/CategoriesList.styles';

const CategoryListWrapper = styled(Flex)`
  align-items: center;

  height: 100%;

  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));
`;

const Main = styled.main`
  ${StyledCategories.Grid} {
    ${Mixin.Screen.xs(css`
      grid-auto-rows: minmax(calc(100vh / 3), auto);
    `)}
  }
`;

export default { CategoryListWrapper, Main };
