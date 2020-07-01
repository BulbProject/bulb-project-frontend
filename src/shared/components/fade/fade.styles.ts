import styled, { css } from 'styled-components';

const Fade = styled.div<{ contentIsShow: boolean; duration: number }>(
  ({ contentIsShow, duration }) => css`
    height: inherit;
    width: inherit;

    opacity: ${contentIsShow ? 1 : 0};

    transition: opacity ${duration * 0.001}s;
  `
);

const Styled = { Fade };

export default Styled;
