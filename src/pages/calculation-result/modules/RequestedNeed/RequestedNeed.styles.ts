import styled, { css } from 'styled-components';
import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import { itemWidth } from '../../CalculationResult.module';

const FilterButton = styled(Button)`
  svg {
    width: 0.7rem;

    margin-left: var(--i-medium);
    margin-top: 1px;
  }
`;

const getItemWidth = ({ hasMany, isLg }: { hasMany: boolean; isLg: boolean }) => {
  if (!isLg) {
    return `${itemWidth}px`;
  }

  if (hasMany && isLg) {
    return '450px';
  }

  return '100%';
};

const RequestedNeed = styled(Flex)<{ hasMany: boolean; isLg: boolean }>(
  ({ hasMany, isLg }) => css`
    width: ${getItemWidth({ hasMany, isLg })};
  `
);

const CloseDrawer = styled.button`
  position: absolute;
  top: var(--i-regular);
  right: var(--i-regular);
  z-index: 1;

  width: 1rem;

  color: var(--c-negative);

  transition: color var(--transition);

  &:hover,
  &:focus {
    color: var(--c-negative-light);
  }
`;

export default { RequestedNeed, FilterButton, CloseDrawer };
