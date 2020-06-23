import styled, { css } from 'styled-components';
import Button from 'ustudio-ui/components/Button';
import { Mixin } from 'ustudio-ui/theme';

const FormButton = styled(Button)<{ isActive: boolean }>(
  ({ isActive }) => css`
    width: 100%;

    transition: height var(--transition);

    ${isActive
      ? css`
          opacity: 1;
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `};

    ${Mixin.Screen.md(css`
      margin: var(--i-regular) var(--i-large);
    `)}
  `
);

const Styled = { FormButton };

export default Styled;
