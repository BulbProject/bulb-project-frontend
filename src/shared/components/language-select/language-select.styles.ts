import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;

  width: 40px;
  height: 100%;
  margin-left: 5px;

  cursor: pointer;

  &:before,
  &:after {
    content: '';

    position: absolute;
    top: 65%;
    right: 0;

    display: block;
    width: 10px;
    height: 2px;

    background-color: black;
    transform-origin: left;
  }

  &:before {
    transform: rotate(-135deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const Select = styled.select`
  position: relative;
  width: 100%;
  text-transform: uppercase;

  cursor: pointer;
`;

const Styled = { SelectContainer, Select };

export default Styled;
