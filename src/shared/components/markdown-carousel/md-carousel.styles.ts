import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow-x: hidden;
  display: flex;
`;

const List = styled.ul`
  position: absolute;
  display: flex;
  width: 100%;
`;

const Item = styled.li`
`;

const PreviousButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
`;

const NextButton = styled.button`
  height: 30px;
  width: 30px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const Image = styled.img`
  //width: 800px;
  //height: auto;
`;

const Styled = { Container, List, Item, PreviousButton, NextButton, Image };

export default Styled;
