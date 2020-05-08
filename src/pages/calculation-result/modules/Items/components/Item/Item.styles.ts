import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Image = styled.div<{ link?: string }>(
  ({ link }) => `
  width: 100%;
  height: 100%;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${link});
  object-fit: cover;
`
);

const Item = styled(Flex)`
  width: calc(100% / 3);

  border: 1px solid var(--c-light);

  &:not(:last-child) {
    margin-right: -1px;
  }
`;

const Content = styled(Flex)`
  padding: var(--i-regular);
`;

const ItemDescription = styled(Flex)`
  justify-content: center;

  padding-bottom: var(--i-regular);
  margin-bottom: var(--i-regular);

  border-bottom: 1px solid var(--c-light);
`;

const Classifications = styled(Flex)`
  padding-bottom: var(--i-regular);

  border-bottom: 1px solid var(--c-light);
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
