import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

import { itemWidth } from '../../CalculationResult.module';

const ImageContainer = styled(Flex)`
  position: relative;

  justify-content: space-between;
  flex-shrink: 0;

  width: 100%;

  padding: var(--i-regular) 0 var(--i-medium);

  object-fit: cover;
`;

const Image = styled.img`
  position: absolute;

  top: 0;
  left: 50%;

  transform: translateX(-50%);

  height: 100%;
  width: auto;
`;

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

const Item = styled(Flex)`
  position: relative;

  min-width: ${itemWidth}px;

  flex-shrink: 0;

  @media screen and (min-width: 798px) {
    ${ImageContainer} {
      height: 190px;
    }
  }

  &:not(:last-child) {
    border-right: 1px solid var(--c-light);
  }

  ${ImageContainer} {
    height: 240px;
  }
`;

const Content = styled(Flex)``;

const ItemDescription = styled(Flex)`
  flex-direction: column;
  align-items: center;

  margin-bottom: var(--i-regular);
`;

const Classifications = styled(Flex)`
  margin-bottom: var(--i-large);
`;

const AdditionalClassification = styled(Flex)`
  &:not(:last-child) {
    padding-bottom: var(--i-regular);
  }
`;

export default {
  Item,
  ImageContainer,
  Image,
  Content,
  ItemDescription,
  Classifications,
  AdditionalClassification,
  Economy,
  EconomyContainer,
  EconomyMeasure,
  EconomyTimesMeasure,
  EconomyNote,
  EconomyUnit,
  BoldText,
};
