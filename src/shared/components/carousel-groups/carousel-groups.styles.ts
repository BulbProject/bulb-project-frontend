import styled, { css } from 'styled-components';

const SelectedGroupContainer = styled.div<{ hasSelectedGroup: boolean; $height: string }>(
  ({ hasSelectedGroup, $height }) => css`
    width: 100%;
    height: ${$height};

    margin-top: ${hasSelectedGroup ? 'var(--i-regular)' : 0};

    opacity: ${Number(!$height.includes('0'))};

    transition: var(--transition);

    overflow-y: ${$height === 'auto' ? 'visible' : 'hidden'};
  `
);

const Styled = { SelectedGroupContainer };

export default Styled;
