import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Image = styled.div<{ link?: string }>(
  ({ link }) => css`
    width: 100%;
    height: 190px;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${link});
    object-fit: cover;
  `
);

const Item = styled(Flex)(({ isSearched }: { isSearched: boolean }) => {
  return css`
    position: relative;

    flex-shrink: 0;

    width: 380px;

    border: 1px solid var(--c-light);

    ${isSearched
      ? css`
          &:after {
            content: '';

            position: absolute;
            top: 0;
            bottom: 0;
            right: -30px;

            width: 30px;

            background-image: linear-gradient(to right, rgba(222, 222, 222, 0.7), transparent);

            pointer-events: none;
          }
        `
      : ''}

    &:not(:last-child) {
      margin-right: -1px;
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

export default { Item, Image, Content, ItemDescription, Classifications, AdditionalClassification, Link };
