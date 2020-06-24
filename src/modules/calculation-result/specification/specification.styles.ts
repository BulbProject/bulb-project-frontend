import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

const Group = styled(Flex).attrs(() => ({
  direction: 'column',
  alignment: {
    horizontal: 'center',
  },
}))`
  &:not(:last-child) {
    margin-bottom: var(--i-large);
  }

  textarea {
    ${Mixin.Style.inputPadding()};
    ${Mixin.Font.bodySmall()};

    width: 100%;
    text-align: center;

    margin-bottom: var(--i-medium);

    cursor: pointer;

    background: var(--c-light);
    pointer-events: none;
  }
`;

const Styled = { Group };

export default Styled;
