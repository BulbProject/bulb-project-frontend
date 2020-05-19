import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Link as RouterLink } from 'react-router-dom';

import ReloadIconEl from '../../../../assets/icons/reload.inline.svg';

const Link = styled(RouterLink)`
  &:after {
    display: none;
  }
`;

const BaseCard = styled(Flex)`
  margin-bottom: var(--i-large);
  padding: var(--i-regular);
  border: 1px solid var(--c-light);
  border-radius: var(--border-radius);
  transition: var(--transition);
`;

const CardTitle = styled(Text)`
  position: relative;
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: var(--i-large);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardContent = styled.div`
  position: relative;
`;

const CardContentContainer = styled.div`
  opacity: 0;
  color: var(--c-light);
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--i-regular) var(--i-large);
  transition: opacity var(--transition);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--c-darkest);
    opacity: 0.7;
  }

  &:hover {
    opacity: 1;
  }
`;
const CardDescription = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Card = styled(BaseCard)<{ isDisabled: boolean }>(({ isDisabled }) =>
  isDisabled
    ? css`
        cursor: not-allowed;
        user-select: none;
      `
    : css`
        &:hover {
          border: 1px solid var(--c-primary);
          box-shadow: var(--s-primary);
        }

        &:focus {
          border: 1px solid var(--c-primary);
        }

        &:active {
          ${CardTitle} {
            color: var(--c-primary);
          }
        }
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
  Card,
  BaseCard,
  CardTitle,
  CardContent,
  CardDescription,
  ReloadIcon,
  CardContentContainer,
};
