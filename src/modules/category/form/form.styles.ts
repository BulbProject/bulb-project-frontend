import styled, { css } from 'styled-components';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Grid from 'ustudio-ui/components/Grid/Grid';
import { Mixin } from 'ustudio-ui/theme';

const Container = styled(Grid)`
  flex: 1;

  padding: 0 var(--i-large);

  ${Mixin.Screen.md(css`
    padding: 0;
  `)}
`;

const StepContainer = styled(Cell)`
  margin: var(--i-regular) 0;
  padding: var(--i-regular);

  border: 1px solid var(--c-light);
  border-radius: var(--border-radius);

  transition: var(--transition);
`;

const MobileButtonsContainer = styled(Grid)`
  grid-gap: 1rem;
`;

const Styled = { Container, StepContainer, MobileButtonsContainer };

export default Styled;
