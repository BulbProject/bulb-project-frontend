import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import layoutConfig from '../layout.config';

const ImageContainer = styled(Flex)`
  position: relative;

  justify-content: space-between;
  flex-shrink: 0;

  width: 100%;

  padding: var(--i-regular) 0 var(--i-medium);

  object-fit: cover;
`;

const RecommendedVariant = styled.img`
  position: absolute;
  height: 60px;
  width: auto;
`;

const RecommendedVariantContainer = styled.a`
  display: flex;
  top: -5%;
  left: 77%;
  position: relative;
  display: inline-block;
  &::after {
    display: none;
  }
`;

const TooltipText = styled(Text)`
  visibility: hidden;
  width: auto;
  background-color: #ccc;
  color: black;
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  position: absolute;
  left: -65px;
  top: -35px;
  opacity: 0;
  transition: 1s;
  ${RecommendedVariantContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const Image = styled.img`
  position: absolute;

  top: 0;
  left: 50%;

  transform: translateX(-50%);

  height: 100%;
  width: auto;
`;

const Item = styled(Flex)`
  position: relative;

  min-width: ${layoutConfig.itemWidth}px;

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

const Styled = {
  Item,
  ImageContainer,
  RecommendedVariant,
  RecommendedVariantContainer,
  TooltipText,
  Image,
  Content,
  ItemDescription,
  Classifications,
  AdditionalClassification,
};

export default Styled;
