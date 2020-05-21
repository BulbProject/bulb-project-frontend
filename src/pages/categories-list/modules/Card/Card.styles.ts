import { Link as RouterLink } from 'react-router-dom';

import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

import ReloadIconEl from '../../../../assets/icons/reload.inline.svg';

const Link = styled(RouterLink)`
  &:after {
    display: none;
  }
`;

const CardTitle = styled(Text)`
  position: relative;

  //best way to do cut long strings
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  margin-bottom: var(--i-large);

  overflow: hidden;

  transition: var(--transition);

  font-weight: 400;
  line-height: 1.1;
`;

const CardContent = styled.div`
  position: relative;
`;

const CardDescription = styled.div`
  //best way to do cut long strings
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;

  transition: var(--transition);
`;

const BaseCard = styled(Flex)`
  height: 100%;
`;

const ContentCard = styled(BaseCard)<{ isDisabled?: boolean }>(
  ({ isDisabled }) => css`
    align-items: center;

    position: relative;

    padding: var(--i-regular) var(--i-large);

    opacity: 0.7;
    transition: opacity var(--transition);

    color: ${isDisabled ? 'var(--c-dark)' : 'var(--c-light)'};

    background-color: ${isDisabled ? 'var(--c-neutral)' : 'var(--c-darkest)'};

    ${isDisabled
      ? css`
          cursor: not-allowed;
          user-select: none;
        `
      : ''}

    ${Mixin.Screen.xs(css`
      opacity: ${isDisabled ? 1 : 0};

      ${CardDescription},
      ${CardTitle} {
        opacity: ${isDisabled ? 1 : 0};
      }

      &:hover {
        opacity: ${isDisabled ? 1 : 0.7};

        ${CardDescription},
        ${CardTitle} {
          opacity: 1;
        }
      }
    `)}
  `
);

const ReloadIcon = styled(ReloadIconEl)`
  width: 2rem;
  height: 2rem;

  display: inline-block;

  color: var(--c-primary);
  transition: var(--transition);

  &:hover {
    transform: rotate(90deg);
  }
`;

export default {
  Link,
  BaseCard,
  CardTitle,
  CardContent,
  CardDescription,
  ContentCard,
  ReloadIcon,
};
