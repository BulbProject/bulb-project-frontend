import { css, FlattenSimpleInterpolation } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';

const ValuesListItem = css`
  ${Mixin.Font.bodySmall()};

  &:before {
    background: var(--c-primary-light);
  }
`;

const Dropdown = ({ isOpen, quantity }: { isOpen: boolean; quantity: number }): FlattenSimpleInterpolation =>
  css`
    &,
    div {
      height: ${isOpen ? `${quantity * 26 + 2}px` : '0'};
      max-height: ${26 * 5 + 2}px;
    }
  `;

const Styled = { ValuesListItem, Dropdown };

export default Styled;
