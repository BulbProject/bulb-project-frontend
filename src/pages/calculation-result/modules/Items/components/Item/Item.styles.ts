import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Image = styled(Flex)<{ link?: string }>(
  ({ link }) => css`
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    width: 100%;

    padding: calc(var(--i-medium) + var(--i-regular)) var(--i-medium) var(--i-medium);

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: content-box;
    background-image: url(${link});
    object-fit: cover;
  `
);

const getEfficiencyColor = (efficiencyClass: string) => {
  switch (efficiencyClass) {
    case 'A++':
      return '#33a357';
    case 'A+':
      return '#33a357';
    case 'A':
      return '#33a357';
    case 'B':
      return '#79b752';
    case 'C':
      return '#c3d545';
    case 'D':
      return '#fff12c';
    case 'E':
      return '#edb731';
    case 'F':
      return '#d66f2c';
    case 'G':
      return '#cc232a';
    default:
      return 'var(--c-white)';
  }
};

const EfficiencyClass = styled(Flex)<{ efficiencyClass: string }>(
  ({ efficiencyClass }) => css`
    align-items: center;

    position: relative;

    width: 40px;
    height: 30px;

    background: ${getEfficiencyColor(efficiencyClass)};

    color: var(--c-white);

    &:before {
      content: '';

      position: absolute;

      border: 15px solid transparent;
      border-right: 15px solid ${getEfficiencyColor(efficiencyClass)};

      transform: translateX(-30px);
    }
  `
);

const Consumption = styled.div`
  display: inline-flex;
  flex-direction: column;

  padding: var(--i-medium);

  border: 2px solid var(--c-primary);
  border-radius: var(--i-small);
`;

const Item = styled(Flex)(({ isSearched }: { isSearched: boolean }) => {
  return css`
    position: relative;

    flex-shrink: 0;

    width: ${isSearched ? '100%' : '75%'};

    border: 1px solid var(--c-light);

    @media screen and (min-width: 798px) {
      width: 360px;

      ${isSearched
        ? css`
            &:after {
              content: '';

              position: absolute;
              top: 0;
              bottom: 0;
              right: -30px;

              width: 30px;

              background-image: linear-gradient(to right, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));

              pointer-events: none;
            }
          `
        : ``}

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
});

const Content = styled(Flex)`
  padding: var(--i-regular);
`;

const ItemDescription = styled(Flex)`
  flex-direction: column;
  align-items: center;

  padding-bottom: var(--i-regular);
  margin-bottom: var(--i-regular);

  border-bottom: 1px solid var(--c-light);
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
  Consumption,
};
