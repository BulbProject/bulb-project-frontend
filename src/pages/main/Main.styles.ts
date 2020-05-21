import styled from 'styled-components';

import StyledFooter from 'components/Footer/Footer.styles';

const CategoryListWrapper = styled.div`
  ${StyledFooter.Footer} {
    background-color: var(--c-lightest);
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
