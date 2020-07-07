import styled, { css } from 'styled-components';
import { Mixin } from 'ustudio-ui/theme';

const ValuesListTitle = css`
  color: var(--c-darkest);
`;

const ValuesListItem = css`
  &:before {
    background: var(--c-primary-light);
  }
`;

const MultiValuesListItem = css`
  padding-left: 1.5rem;

  ${Mixin.Font.bodySmall()};

  &:before {
    background: var(--c-primary-light);
  }

  &:after {
    content: '';

    position: absolute;
    top: 50%;
    left: var(--i-medium);

    transform: translateY(-50%);

    width: 0.3rem;
    height: 0.3rem;
    border-radius: 0.3rem;

    background-color: var(--c-secondary-light);
  }
`;

const Dropdown = ({ isOpen }: { isOpen: boolean }) => css`
  div {
    height: ${isOpen ? `200px` : 0};
  }
`;

const SelectedGroupContainer = styled.div<{ hasSelectedGroup: boolean; $height: string }>(
  ({ hasSelectedGroup, $height }) => css`
    width: 100%;
    height: ${$height};

    margin-top: ${hasSelectedGroup ? 'var(--i-regular)' : 0};

    transition: height var(--transition);

    overflow-y: ${$height === 'auto' ? 'visible' : 'hidden'};
  `
);

const Styled = {
  ValuesListTitle,
  ValuesListItem,
  MultiValuesListItem,
  Dropdown,
  SelectedGroupContainer,
};

export default Styled;
