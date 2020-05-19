import styled, { css } from 'styled-components';
import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const Title = styled(Text)`
  text-transform: uppercase;
`;

const FilterButton = styled(Button)`
  svg {
    width: 0.7rem;

    margin-left: var(--i-medium);
    margin-top: 1px;
  }

  @media screen and (max-width: 832px) {
    visibility: hidden;
    pointer-events: none;
  }
`;

const RequestedNeed = styled(Flex)`
  ${Mixin.Screen.xs(css`
    min-width: 450px;
  `)};
`;

const DrawerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  top: 0.25rem;
  right: 0.25rem;

  z-index: 2;

  width: 3rem;
  height: 3rem;

  &:before,
  &:after {
    content: '';

    position: relative;

    width: 3rem;
    height: 1px;

    background-color: var(--c-darkest);

    transform-origin: center;
  }

  &:before {
    left: 50%;

    transform: translateX(-50%) rotate(-45deg);
  }

  &:after {
    right: 50%;

    transform: translateX(50%) rotate(45deg);
  }
`;

export default { Title, RequestedNeed, FilterButton, DrawerButton };
