import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Container } from '../container';
import logo from '../../../assets/images/logo.svg';

import Styled from './error-page.styles';

export const ErrorPage: FC = () => {
  const { push } = useHistory();

  const { t } = useTranslation('common');

  return (
    <Container>
      <Styled.Content direction="column">
        <Flex alignment={{ horizontal: 'center' }}>
          <Styled.Logo src={logo} alt="Bulb Project Logo" />
        </Flex>

        <Flex alignment={{ horizontal: 'center', vertical: 'center' }}>
          <Text color="var(--c-dark)" align="center" variant="h1">
            {t('something-went-wrong')}
          </Text>
        </Flex>

        <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'space-around', vertical: 'center' }}>
          <Button appearance="text" onClick={window.location.reload}>
            {t('refresh')}
          </Button>

          <Button appearance="text" onClick={() => push('/')}>
            {t('to-main')}
          </Button>
        </Flex>
      </Styled.Content>
    </Container>
  );
};
