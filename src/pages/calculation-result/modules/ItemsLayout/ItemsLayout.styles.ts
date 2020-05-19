import styled, { css } from 'styled-components';

import { itemWidth, requestedNeedWidth } from '../../CalculationResult.module';
import StyledItems from '../Items/Items.styles';
import StyledItem from '../Item/Item.styles';
import StyledRequestedNeed from '../RequestedNeed/RequestedNeed.styles';
import StyledContainer from '../../../../shared/Container/Container.styles';

const { Items, AvailableVariants } = StyledItems;
const { Item, EfficiencyClassesList, Content: ItemContent } = StyledItem;
const { RequestedNeed } = StyledRequestedNeed;
const { Container } = StyledContainer;

const SingleLayout = styled.section`
  ${RequestedNeed},
  ${Item} {
    width: 100%;
  }

  ${RequestedNeed} {
    margin: -0.5px 0 -0.5px 0;
  }

  ${ItemContent} {
    padding: var(--i-regular) 0;
  }

  ${Container} {
    padding: 0;
    margin-top: calc(var(--i-large) * -1);
    margin-bottom: calc(var(--i-large) * -1);
  }
`;

const DoubleLayout = styled.section`
  ${RequestedNeed},
  ${Items} {
    width: 50%;
  }

  ${RequestedNeed} {
    min-width: ${requestedNeedWidth}px;

    ${EfficiencyClassesList} {
      margin: -0.5px 0 -0.5px var(--i-regular);
    }
  }

  ${Items} {
    min-width: ${itemWidth}px;
  }

  ${ItemContent} {
    padding: var(--i-regular);
  }

  ${Item} {
    width: 100%;
  }
`;

const TripleLayout = styled.section`
  ${RequestedNeed} {
    width: calc(5 / 13 * 100%);
    min-width: ${requestedNeedWidth}px;

    ${EfficiencyClassesList} {
      margin: -0.5px 0 -0.5px var(--i-regular);
    }

    ${Item} {
      width: 100%;
    }
  }

  ${ItemContent} {
    padding: var(--i-regular);
  }

  ${Items} {
    width: calc(8 / 13 * 100%);
    min-width: ${itemWidth * 2}px;

    overflow: hidden;

    ${Item} {
      width: 50%;
    }

    &:after {
      content: '';
    }

    @media screen and (min-width: 1218px) {
      &:after {
        content: unset;
      }
    }
  }
`;

const ManyLayout = styled.section<{ quantity: number; isLg: boolean }>(({ quantity, isLg }) => {
  const variantsQuantity = quantity - 1;

  return css`
    ${RequestedNeed} {
      width: ${requestedNeedWidth}px;

      ${EfficiencyClassesList} {
        margin: -0.5px 0 -0.5px var(--i-regular);
      }

      ${Item} {
        width: 100%;
      }
    }

    ${ItemContent} {
      padding: var(--i-regular);
    }

    ${Items} {
      width: ${itemWidth * variantsQuantity}px;

      ${Item} {
        width: ${itemWidth}px;
      }

      @media screen and (min-width: 1130px) {
        width: ${itemWidth * variantsQuantity}px;

        ${AvailableVariants} {
          overflow-x: auto;
        }
      }

      &:after {
        content: ${isLg ? `''` : 'unset'};
      }
    }
  `;
});

export default { SingleLayout, DoubleLayout, TripleLayout, ManyLayout };
