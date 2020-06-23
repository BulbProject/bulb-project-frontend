import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

import layoutConfig from './layout.config';

const Wrapper = styled(Flex)`
  max-width: ${layoutConfig.maxWidth}px;

  min-height: calc(100vh - 291.77px);

  ${Mixin.Screen.xs(css`
    min-height: calc(100vh - 160px);
  `)};

  @media screen and (max-width: 1130px) {
    overflow-x: auto;
  }
`;

const MobileFilterButton = styled.button`
  position: fixed;
  bottom: var(--i-large);
  right: var(--i-large);

  z-index: var(--l-topmost);

  width: 4rem;
  height: 4rem;
  border-radius: 4rem;

  background-color: var(--c-primary-light);
  color: var(--c-lightest);

  transition: var(--transition);

  ${Mixin.Device.desktop(css`
    &:hover,
    &:focus {
      background-color: var(--c-primary);
    }
  `)}

  ${Mixin.Device.mobile(css`
    &:focus {
      background-color: var(--c-primary);
    }
  `)}

  svg {
    height: 1.5rem;
  }
`;

const Styled = { Wrapper, MobileFilterButton };

export default Styled;
