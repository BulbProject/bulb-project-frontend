import styled from 'styled-components';

import StyledFooter from 'components/Footer/Footer.styles';

const CategoryListWrapper = styled.div`
  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));

  ${StyledFooter.Footer} {
    background-color: var(--c-base-strong);
  }
`;

const Main = styled.main`
  height: 100vh;

  scroll-snap-type: y mandatory;
  overflow-y: scroll;
`;

const ScrollWrapper = styled.div`
  scroll-snap-align: start;
`;

export default { CategoryListWrapper, Main, ScrollWrapper };
