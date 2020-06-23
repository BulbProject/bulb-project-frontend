import styled, { css } from 'styled-components';
import { Mixin } from 'ustudio-ui/theme';

import StyledContainer from 'shared/components/container/container.styles';

import layoutConfig from '../layout.config';

import StyledItems from '../items/items.styles';
import StyledItem from '../item/item.styles';
import StyledMetric from '../item/metrics/metrics.styles';
import StyledRequestedNeed from '../requested-need/requested-need.styles';
import StyledLampsFeature from '../category-feature/features/lamps-feature/lamps-feature.styles';

const { Items, AvailableVariants } = StyledItems;
const { Item, Content: ItemContent, Image: ItemImage } = StyledItem;
const { Highlight } = StyledMetric;
const { RequestedNeed } = StyledRequestedNeed;
const { Container } = StyledContainer;
const { EfficiencyClassesList } = StyledLampsFeature;

const { itemWidth, requestedNeedWidth } = layoutConfig;

const getVariantImageStyles = (minWidth = 1470) => css`
  ${ItemImage} {
    left: 66%;

    @media screen and (min-width: ${minWidth}px) {
      left: 50%;
    }
  }
`;

const SingleLayout = styled.section`
  ${RequestedNeed},
  ${Item} {
    width: 100%;

    ${Highlight} {
      width: calc(100% + 2rem);
    }
  }

  ${RequestedNeed} {
    margin: -0.5px 0 -0.5px 0;
  }

  ${ItemContent} {
    padding: var(--i-regular);

    ${Mixin.Screen.md(css`
      padding: var(--i-regular) 0;
    `)}
  }

  ${Container} {
    padding: 0;
  }
`;

const DoubleLayout = styled.section`
  display: flex;
  justify-content: center;

  ${RequestedNeed},
  ${Items} {
    width: 50%;
  }

  ${RequestedNeed} {
    min-width: ${requestedNeedWidth}px;

    ${EfficiencyClassesList} {
      margin: -0.5px 0;
    }
  }

  ${Items} {
    min-width: ${itemWidth}px;
    width: 50%;

    ${getVariantImageStyles()};
  }

  ${ItemContent} {
    padding: var(--i-regular);
  }

  ${Item} {
    width: 100%;
    min-width: ${requestedNeedWidth}px;
  }
`;

const TripleLayout = styled.section`
  display: flex;
  justify-content: center;

  ${RequestedNeed} {
    width: calc(5 / 13 * 100%);
    min-width: ${requestedNeedWidth}px;

    ${EfficiencyClassesList} {
      margin: -0.5px 0;
    }

    ${Item} {
      width: 100%;
    }
  }

  ${ItemContent} {
    padding: var(--i-regular);
  }

  ${Items} {
    ${AvailableVariants} {
      overflow-x: visible;
    }

    ${Item} {
      width: 50%;

      ${getVariantImageStyles(1980)};
    }

    &:after {
      content: '';
    }

    @media screen and (min-width: 800px) {
      width: calc(100% - 450px);

      ${AvailableVariants} {
        overflow-x: auto;
      }
    }

    @media screen and (min-width: 1140px) {
      width: calc(8 / 13 * 100%);
      min-width: ${itemWidth * 2}px;
    }
  }
`;

const ManyLayout = styled.section<{ quantity: number; isLg: boolean }>(({ quantity, isLg }) => {
  const variantsQuantity = quantity - 1;

  return css`
    display: flex;
    justify-content: center;

    ${RequestedNeed} {
      width: ${requestedNeedWidth}px;

      ${EfficiencyClassesList} {
        margin: -0.5px 0;
      }

      ${Item} {
        width: 100%;
      }
    }

    ${ItemContent} {
      padding: var(--i-regular);
    }

    ${Items} {
      ${Item} {
        width: ${100 / variantsQuantity}%;

        ${getVariantImageStyles(1980)};
      }

      &:after {
        content: ${isLg ? `''` : 'unset'};
      }

      @media screen and (min-width: 800px) {
        width: calc(100% - 450px);

        ${AvailableVariants} {
          overflow-x: auto;
        }
      }

      @media screen and (min-width: 1140px) {
        width: 100%;
      }
    }
  `;
});

const Styled = { SingleLayout, DoubleLayout, TripleLayout, ManyLayout };

export default Styled;
