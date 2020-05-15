import styled, { css } from 'styled-components';
import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';

const FilterButton = styled(Button)`
  svg {
    width: 0.7rem;

    margin-left: var(--i-medium);
    margin-top: 1px;
  }
`;

const RequestedNeed = styled(Flex)<{ hasMany: boolean }>(
  ({ hasMany }) => css`
    width: ${hasMany ? `${450}px` : '100%'};
  `
);

export default { RequestedNeed, FilterButton };
