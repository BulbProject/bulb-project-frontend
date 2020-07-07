import styled, { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';

const IconContainer = styled.figure`
  width: 5rem;
  height: 5rem;

  padding: var(--i-regular);

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid var(--c-neutral);
  border-radius: var(--border-radius);

  transition: var(--transition);
`;

const Icon = styled.img`
  width: auto;
  height: 100%;
`;

const Title = styled(Text)`
  margin-top: var(--i-regular);

  transition: color var(--transition);
`;

const Card = styled.button<{ isCardSelected: boolean }>(
  ({ isCardSelected }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
      ${IconContainer} {
        border-color: var(--c-primary);
      }
    }

    ${isCardSelected
      ? css`
          ${IconContainer} {
            background-color: var(--c-primary);
            border-color: var(--c-primary);
          }

          ${Title} {
            color: var(--c-primary);
          }
        `
      : ''}
  `
);

const Styled = { Card, IconContainer, Icon, Title };

export default Styled;
