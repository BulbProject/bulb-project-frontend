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
`;

const getItemWidth = ({ hasMany, isLg }: { hasMany: boolean; isLg: boolean }) => {
  if (!isLg) {
    return '100%';
  }

  if (hasMany && isLg) {
    return '450px';
  }

  return '100%';
};

const RequestedNeed = styled(Flex)<{ hasMany: boolean; isLg: boolean }>(
  ({ hasMany, isLg }) => css`
    width: ${getItemWidth({ hasMany, isLg })};

    min-width: ${hasMany ? 'calc(100% - 30px)' : '100%'};

    ${Mixin.Screen.xs(css`
      min-width: 450px;
    `)}
  `
);

export default { Title, RequestedNeed, FilterButton };
