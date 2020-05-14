import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import { EfficiencyClass as EfficiencyClassType, efficiencyClasses, getEfficiencyColor } from './Item.module';

const Image = styled(Flex)<{ link?: string }>(
  ({ link }) => css`
    justify-content: space-between;
    flex-shrink: 0;

    width: 100%;

    padding: var(--i-regular) var(--i-medium) var(--i-medium);

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: content-box;
    background-image: url(${link});
    object-fit: cover;
  `
);

const EfficiencyClass = styled(Flex)<{ efficiencyClass: EfficiencyClassType; trianglePosition: 'left' | 'right' }>(
  ({ efficiencyClass, trianglePosition }) => {
    const classIndex = Object.keys(efficiencyClasses).indexOf(efficiencyClass);
    const isSeparate = trianglePosition === 'right';
    const labelHeight = isSeparate ? 36 : 24;

    return css`
      align-items: center;
  
      position: relative;
  
      width: ${isSeparate ? 40 : 40 + classIndex * 4}px;
      height: ${labelHeight}px;
      
      padding-${trianglePosition}: var(--i-medium);
  
      background: ${getEfficiencyColor(efficiencyClass)};
  
      color: var(--c-white);
  
      &:before {
        content: '';
  
        position: absolute;
  
        border: ${labelHeight / 2}px solid transparent;
        border-${trianglePosition}: ${labelHeight / 2}px solid ${
      isSeparate ? 'var(--c-darkest)' : getEfficiencyColor(efficiencyClass)
    };
  
        ${trianglePosition}: 100%;
      }
      
      ${
        isSeparate
          ? css`
              margin-top: ${classIndex * (labelHeight / 1.5) + classIndex / 2}px;
              background: var(--c-darkest);
            `
          : ``
      };
  `;
  }
);

const EfficiencyClassesList = styled.ul`
  display: flex;
  flex-direction: column;

  margin: -0.5px 0;

  li {
    margin: 0.5px 0;
  }
`;

const Economy = styled.div`
  display: inline-flex;
  flex-direction: column;

  padding: var(--i-medium);

  border: 2px solid var(--c-primary);
  border-radius: var(--i-small);
`;

const Item = styled(Flex)`
  position: relative;

  flex-shrink: 0;

  width: 100%;

  @media screen and (min-width: 798px) {
    width: 380px;

    ${Image} {
      height: 190px;
    }
  }

  &:not(:last-child) {
    margin-right: -1px;
  }

  ${Image} {
    height: 240px;
  }
`;

const Content = styled(Flex)`
  padding: var(--i-regular);
`;

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

const Link = styled.a`
  &:hover {
    &:after {
      display: none;
    }
  }
`;

export default {
  Item,
  Image,
  Content,
  ItemDescription,
  Classifications,
  AdditionalClassification,
  Link,
  EfficiencyClass,
  EfficiencyClassesList,
  Economy,
};
