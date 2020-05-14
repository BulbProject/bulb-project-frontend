import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';
import { Mixin } from 'ustudio-ui/theme';

const Wrapper = styled(Flex)`
  max-width: 100vw;
  height: 100%;

  margin: calc(var(--i-large) * -1) 0;
  padding: 0 var(--i-large) 0;
`;

const FilterButton = styled(Button)`
  svg {
    width: 0.7rem;

    margin-left: var(--i-medium);
    margin-top: 1px;
  }
`;

const RequestedNeed = styled(Flex)<{ hasMany: boolean }>(
  ({ hasMany }) => css`
    width: ${hasMany ? 380 : 640}px;
  `
);

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

export default { Wrapper, FilterButton, RequestedNeed, MobileFilterButton };
