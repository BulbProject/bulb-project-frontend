import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

const MarginCompensation = styled.div`
  margin-top: -1.5rem;
`;

const Divider = styled.hr`
  height: 1px;

  margin: var(--i-regular) 0;

  background-color: var(--c-light);
`;

const CheckboxContainer = styled(Flex)`
  position: relative;
`;

const HiddenRequirement = styled.div`
  position: absolute;

  right: 0;
  top: -2px;

  width: 1rem;
  height: 1rem;
`;

export default { MarginCompensation, Divider, CheckboxContainer, HiddenRequirement };
