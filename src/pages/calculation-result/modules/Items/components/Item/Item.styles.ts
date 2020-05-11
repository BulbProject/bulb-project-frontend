import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Image = styled.div<{ link?: string }>(
  ({ link }) => `
  width: 100%;

  padding-top: 50%;
  padding-bottom: 50%;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${link});
  object-fit: cover;
`
);

const Item = styled(Flex)`
  flex: 1 / 4;
  min-width: calc((1 / 2.5) * 100%);

  border: 1px solid var(--c-light);

  &:not(:last-child) {
    margin-right: -1px;
  }
`;

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
  padding-bottom: var(--i-regular);
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
