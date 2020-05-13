import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';
import { RequestedNeed } from './modules/RequestedNeed';

const Wrapper = styled(Flex)`
  max-width: 100vw;

  padding: var(--i-large);
`;

const FilterButton = styled.button`
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

export default { Wrapper, FilterButton };
