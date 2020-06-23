import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const Economy = styled(Flex)<{ $backgroundColor: string }>(
  ({ $backgroundColor }) => css`
    align-items: center;

    padding: var(--i-medium);
    margin-top: var(--i-small);

    background-color: ${`var(--c-${$backgroundColor})`};
    color: var(--c-light);

    pointer-events: none;
    user-select: none;
  `
);

const EconomyContainer = styled.div`
  display: inline-flex;
  flex-direction: column;

  position: relative;

  z-index: 2;

  min-width: 40%;
  max-width: 195px;
`;

const EconomyMeasure = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  margin-left: var(--i-regular);

  width: 45%;
`;

const EconomyTimesMeasure = styled(Text)`
  ${Mixin.Font.h2()};

  line-height: 1;
`;

const EconomyNote = styled(Text)`
  width: 55%;

  line-height: 1.5;
`;

const EconomyUnit = styled(Text)`
  margin-top: -4px;
`;

const BoldText = styled(Text)`
  font-weight: 700;
`;

const Styled = {
  Economy,
  EconomyContainer,
  EconomyMeasure,
  EconomyTimesMeasure,
  EconomyNote,
  EconomyUnit,
  BoldText,
};

export default Styled;
