import styled from 'styled-components';
import { Text } from 'ustudio-ui';

const circleDimension = 0.4;

const ClassificationId = styled(Text)`
  color: var(--c-secondary);

  white-space: nowrap;

  position: relative;

  margin-right: var(--i-regular);
  padding-right: var(--i-regular);

  &:after {
    content: '';

    width: ${circleDimension}rem;
    height: ${circleDimension}rem;

    position: absolute;
    right: -${circleDimension / 2}rem;
    top: ${circleDimension + 0.1}rem;

    transform: translateY(-50%);

    background-color: var(--c-secondary);
    border-radius: 50%;
  }
`;

export default { ClassificationId };
