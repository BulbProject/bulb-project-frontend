import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

import { efficiencyClasses, EfficiencyClass as EfficiencyClassType } from './entity';

const getEfficiencyColor = (efficiencyClass: EfficiencyClassType): string => {
  switch (efficiencyClass) {
    case 'A++':
      return '#33a357';
    case 'A+':
      return '#33a357';
    case 'A':
      return '#33a357';
    case 'B':
      return '#79b752';
    case 'C':
      return '#c3d545';
    case 'D':
      return '#fff12c';
    case 'E':
      return '#edb731';
    case 'F':
      return '#d66f2c';
    case 'G':
      return '#cc232a';
    default:
      return 'var(--c-white)';
  }
};

const EfficiencyClass = styled(Flex)<{ efficiencyClass: EfficiencyClassType; trianglePosition: 'left' | 'right' }>(
  ({ efficiencyClass, trianglePosition }) => {
    const classIndex = Object.keys(efficiencyClasses).indexOf(efficiencyClass);
    const isSeparate = trianglePosition === 'right';
    const labelHeight = isSeparate ? 36 : 24;

    return css`
      align-items: center;

      position: relative;
      
      z-index: 2;

      width: ${isSeparate ? 40 : 40 + classIndex * 4}px;
      height: ${labelHeight}px;

      padding-${trianglePosition}: var(--i-medium);

      background: ${getEfficiencyColor(efficiencyClass)};

      color: var(--c-white);

      pointer-events: none;
      user-select: none;

      &:before {
        content: '';

        position: absolute;

        border: ${labelHeight / 2}px solid transparent;
        border-${trianglePosition}: ${labelHeight / 2}px solid ${
      isSeparate ? 'var(--c-darkest)' : getEfficiencyColor(efficiencyClass)
    };

        ${trianglePosition}: 100%;
      }

      ${
        isSeparate
          ? css`
              margin-top: ${classIndex * (labelHeight / 1.5) + classIndex / 2 - 3}px;
              background: var(--c-darkest);
            `
          : ``
      };
  `;
  }
);

const EfficiencyClassesList = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    margin: 0.5px 0;
  }
`;

const Styled = { EfficiencyClass, EfficiencyClassesList };

export default Styled;
