import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;

  width: 40px;
  height: 100%;
  margin-left: 10px;

  cursor: pointer;

  &:before,
  &:after {
    content: '';

    position: absolute;
    top: 65%;
    right: 0;

    display: block;
    width: 8px;
    height: 2px;

    background-color: var(--c-dark);
    transform-origin: left;
  }

  &:before {
    transform: rotate(-135deg);
  }

  &:after {
    transform: rotate(-45deg);
    right: 1px;
  }
`;

const Select = styled.select`
  position: relative;
  width: 100%;
  text-transform: uppercase;

  font-weight: 600;
  font-size: 14px;
  color: var(--c-dark);

  cursor: pointer;
`;

const Styled = { SelectContainer, Select };

export default Styled;
