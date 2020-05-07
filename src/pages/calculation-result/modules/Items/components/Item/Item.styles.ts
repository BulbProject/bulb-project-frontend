import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Image = styled.div(
  ({ link }: { link?: string }) => `
  width: 340px;
  height: 340px;

  background-size: 340px;
  background-image: url(${link});
  object-fit: cover;
`
);

const Item = styled(Flex)`
  width: 340px;

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

export default { Item, Image, Content, ItemDescription, Classifications };
