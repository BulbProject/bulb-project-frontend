import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';
import { Breakpoint } from 'ustudio-ui/theme/theme';

const Wrapper = styled(Flex)`
  margin: 0 auto;
`;

const Container = styled(Flex)`
  overflow-x: hidden;

  margin: var(--i-large);

  max-width: 320px;

  ${Object.keys(Mixin.Screen).reduce(
    // @ts-ignore
    (style, breakpoint) => {
      return css(
        ({ theme }) => css`
          ${style};

          @media screen and (min-width: ${theme.breakpoint?.[breakpoint as Breakpoint]}px) {
            max-width: var(${`--bp-${breakpoint}`});
          }
        `
      );
    },
    ``
  )}
`;

export default { Wrapper, Container };
