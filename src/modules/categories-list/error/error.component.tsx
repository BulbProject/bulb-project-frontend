import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import Styled from './error.styles';

export const Error: FC<{
  reloadCategories(): void;
}> = ({ reloadCategories }) => {
  const { t } = useTranslation('calculation');

  return (
    <Styled.ErrorContainer>
      <Flex direction="column" alignment={{ horizontal: 'center' }}>
        <Text color="var(--c-contrast-strong)">{t('error')}</Text>

        <Flex alignment={{ horizontal: 'center' }} margin={{ top: 'large' }}>
          <Button intent="positive" onClick={reloadCategories}>
            {t('try-again')}
          </Button>
        </Flex>
      </Flex>
    </Styled.ErrorContainer>
  );
};
