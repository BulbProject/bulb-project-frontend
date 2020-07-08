import { css } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';

const ValuesListItem = css`
  ${Mixin.Font.bodySmall()};

  &:before {
    background: var(--c-primary-light);
  }
`;

const Styled = { ValuesListItem };

export default Styled;
