import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';

import StyledCard from '../card/card.styles';

const Cell = styled.div<{ image?: string }>(({ image }) => {
  return css`
    scroll-snap-align: start;

    ${image
      ? css`
          background-image: url(${image});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          background-origin: content-box;
          object-fit: cover;
        `
      : ''};
  `;
});

const wideCardTitle = (): FlattenSimpleInterpolation => css`
  ${StyledCard.CardTitle} {
    ${Mixin.Font.h2()};

    font-weight: 400;
    line-height: 1.1;
  }
`;

const WideCell = styled(Cell)`
  grid-column: span 1;

  ${Mixin.Screen.xs(css`
    grid-column: span 2;

    ${StyledCard.CardContent} {
      width: 65%;
    }

    ${wideCardTitle()};
  `)}
`;

const BigCell = styled(Cell)`
  grid-column: span 1;
  grid-row: span 1;

  ${Mixin.Screen.xs(css`
    grid-column: span 2;
    grid-row: span 2;

    ${StyledCard.CardContent} {
      width: 65%;
    }

    ${wideCardTitle()};
  `)}
`;

const Styled = {
  WideCell,
  BigCell,
  Cell,
};

export default Styled;
