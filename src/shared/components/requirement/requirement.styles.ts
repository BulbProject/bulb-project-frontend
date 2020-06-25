import styled from 'styled-components';
import Text from 'ustudio-ui/components/Text';

const Requirement = styled.label`
  position: relative;

  display: block;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: var(--i-regular);
  }
`;

const Error = styled(Text)`
  position: absolute;

  top: 100%;
  bottom: -1rem;
  left: 0;
`;

const Styled = { Requirement, Error };

export default Styled;
