import { createGlobalStyle } from 'styled-components';

export const DarkMode = createGlobalStyle`
  :root {
    --c-base-strong: var(--c-darkest);
    --c-base-weak: var(--c-dark);
    --c-contrast-strong: var(--c-lightest);
    --c-contrast-weak: var(--c-light);
    --c-faint-strong: var(--c-dark);
  }

  #fp-nav{
    a{
      &::after{
        content: unset;
      }
    }

    span{
      background-color: var(--c-secondary)!important;
    }
  }
`;
