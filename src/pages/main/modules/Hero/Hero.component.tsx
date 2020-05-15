import React from 'react';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

import { FadeIn } from 'components/FadeIn';
import BulbImage from '../../../../assets/images/bulb.svg';

import Styled from './Hero.styles';

export const Hero = () => {
  return (
    <FadeIn>
      <Styled.Hero direction="column" alignment={{ horizontal: 'center', vertical: 'center' }}>
        <Flex
          direction="column"
          alignment={{ horizontal: 'center' }}
          styled={{
            Flex: css`
              position: relative;
              padding-bottom: 6rem;
            `,
          }}
        >
          <Styled.HeroText variant="h1">Bulb Project</Styled.HeroText>

          <Styled.HeroCaption variant="h2">Brings light to eProcurement</Styled.HeroCaption>

          <Styled.HeroDescription>
            Integrating Energy Efficiency Output Specifications and Dedicated Evaluation Methods into Electronic Public
            Procurement
          </Styled.HeroDescription>
        </Flex>

        <Styled.Link to="/categories">
          <Flex direction="column" alignment={{ horizontal: 'center' }}>
            <Styled.CallToAction>
              <Styled.ActionImage src={BulbImage} />
            </Styled.CallToAction>

            <Styled.ActionButton variant="h6">Почати розрахунок</Styled.ActionButton>
          </Flex>
        </Styled.Link>
      </Styled.Hero>
    </FadeIn>
  );
};
