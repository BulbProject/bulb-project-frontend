import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

const Content = styled.section`
  position: relative;

  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));
`;

const DocumentContainer = styled(Flex)`
  min-height: 100vh;

  justify-content: center;
  align-items: center;
`;

export default { Content, DocumentContainer };
