import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { Flex, Text } from 'ustudio-ui';

const AsideTitle = styled(Text)`
  margin-bottom: 2.5rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NavLink = styled(Link)`
  margin-bottom: var(--i-large);
`;

const ErrorContainer = styled(Flex)`
  text-align: center;
`;

const ErrorText = styled(Text)`
  margin-bottom: var(--i-large);
  text-align: center;
  color: var(--c-negative);
`;

const RefreshIcon = styled.img`
  width: var(--i-large);
  height: var(--i-large);
`;

export default { AsideTitle, Nav, NavLink, ErrorContainer, ErrorText, RefreshIcon };
