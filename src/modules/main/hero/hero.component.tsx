import React, { FC } from 'react';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Translation } from 'react-i18next';

import BulbImage from '../../../assets/images/bulb.svg';
import ArrowIcon from '../../../assets/icons/arrow.inline.svg';

import Styled from './hero.styles';

export const Hero: FC = () => {
  return (
    <Styled.Hero direction="column" alignment={{ horizontal: 'center', vertical: 'space-around' }}>
      <Flex
        direction="column"
        alignment={{ horizontal: 'center' }}
        styled={{
          Flex: css`
            position: relative;
          `,
        }}
      >
        <Styled.HeroText variant="h1">Bulb Project</Styled.HeroText>

        <Styled.HeroCaption variant="h2">
          <Translation ns="main">{(t) => t('title')}</Translation>
        </Styled.HeroCaption>

        <Styled.HeroDescription>
          <Translation ns="main">{(t) => t('description')}</Translation>
        </Styled.HeroDescription>
      </Flex>

      <Flex direction="column" alignment={{ horizontal: 'center', vertical: 'center' }}>
        <Styled.Link to="/categories">
          <Styled.CallToAction>
            <Styled.ActionImage src={BulbImage} />
          </Styled.CallToAction>

          <Styled.ActionButton variant="h6">
            <Translation ns="main">{(t) => t('start')}</Translation>
          </Styled.ActionButton>
        </Styled.Link>
      </Flex>

      <Styled.Arrow alignment={{ horizontal: 'center', vertical: 'center' }}>
        <ArrowIcon />
      </Styled.Arrow>
    </Styled.Hero>
  );
};
