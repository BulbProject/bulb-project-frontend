import styled, { css } from 'styled-components';
import Text from 'ustudio-ui/components/Text';

const Title = styled(Text)<{ isBoolean: boolean }>(
  ({ isBoolean }) => css`
    ${isBoolean
      ? css`
          margin-bottom: 2px;
          margin-right: var(--i-regular);
        `
      : css`
          margin-bottom: var(--i-small);
        `};

    transition: color var(--transition);
  `
);

const Styled = { Title };

export default Styled;
