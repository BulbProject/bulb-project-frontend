import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const Benefit = styled(Flex)<{ $backgroundColor: string }>(
  ({ $backgroundColor }) => css`
    flex-direction: column;

    padding: var(--i-medium);
    margin-top: var(--i-small);

    background-color: ${`var(--c-${$backgroundColor})`};
    color: var(--c-light);

    pointer-events: none;
    user-select: none;
  `
);

const BenefitsContainer = styled.div`
  display: inline-flex;
  flex-direction: column;

  position: relative;

  z-index: 2;

  min-width: 45%;
  max-width: 220px;
`;

const BenefitTitle = styled(Text)`
  line-height: 1.5;
  text-transform: uppercase;
`;

const BenefitNote = styled(Text)`
  ${Mixin.Font.bodySmall()};
  white-space: nowrap;
`;

const BenefitMeasure = styled(Flex)`
  align-items: flex-end;

  margin-left: var(--i-regular);

  line-height: 1;
  white-space: nowrap;
`;

const BenefitTimesMeasure = styled(Text)`
  ${Mixin.Font.h5()};
  font-weight: 700;

  line-height: 1;
`;

const BoldText = styled(Text)`
  font-weight: 700;
`;

const Styled = {
  Benefit,
  BenefitsContainer,
  BenefitMeasure,
  BenefitNote,
  BenefitTimesMeasure,
  BenefitTitle,
  BoldText,
};

export default Styled;
