import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --c-secondary: #599a4f;
    --c-secondary-light: #98db8e;
    --c-base-strong: var(--c-lightest);
    --c-base-weak: var(--c-light);
    --c-contrast-strong: var(--c-darkest);
    --c-contrast-weak: var(--c-dark);
    --c-faint-strong: var(--c-neutral);
  }
  
  h6 {
    font-variant: all-small-caps !important;
  }
`;
