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
  overflow-y: auto;

  ${StyledCategories.Grid} {
    ${Mixin.Screen.xs(css`
      grid-auto-rows: calc(100vh / 3);
    `)}
  }
`;

const ScrollIndicators = styled.div`
  position: fixed;
  right: var(--i-medium);
  top: 50%;

  transform: translateY(-50%);
`;

const Indicator = styled.div(
  ({ isActive }: { isActive: boolean }) => css`
    width: 0.5rem;
    height: 0.5rem;

    margin: var(--i-medium);

    border-radius: 50%;

    border: 1px solid var(--c-dark);

    background-color: ${isActive ? 'var(--c-secondary)' : 'var(--c-light)'};
    transition: background-color var(--transition);
  `
);

export default { CategoryListWrapper, Main, ScrollIndicators, Indicator };
