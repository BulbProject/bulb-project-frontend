import styled, { css } from 'styled-components';
import { Text } from 'ustudio-ui';

const RequirementGroup = styled.div`
  margin-top: var(--i-regular);
`;

const Title = styled(Text)<{ isActive: boolean }>(
  ({ isActive }) => css`
    color: ${isActive ? 'var(--c-primary)' : 'var(--c-darkest)'};
  `
);

export default { RequirementGroup, Title };
