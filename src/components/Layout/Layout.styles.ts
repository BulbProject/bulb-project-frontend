import styled from 'styled-components';

const Layout = styled.div`
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex-grow: 1;

  margin-top: 64px;
`;

export default {
  Layout,
  Main,
};
