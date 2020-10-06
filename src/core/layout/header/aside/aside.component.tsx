import React, { FC, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import axios from 'axios';
import useAsync from 'honks/use-async';

import { useResourcesApi } from 'core/context/resources-api-provider';
import Styled from './aside.styles';

export const Aside: FC<{
  closeDrawer(): void;
}> = ({ closeDrawer }) => {
  const { getResourcesConfig } = useResourcesApi();

  const { onPending, onResolve, onReject, call: getResources } = useAsync<{ name: string }[]>(async () => {
    const { data } = await axios(getResourcesConfig());

    return data;
  });

  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    getResources();
  }, [i18n.language]);

  return (
    <>
      <Text variant="h3">{t('resources')}</Text>

      <Flex margin={{ top: 'large' }}>
        <Flex as="nav" direction="column" alignment={{ horizontal: 'start', vertical: 'start' }}>
          {onPending(() => {
            return (
              <Flex alignment={{ horizontal: 'center' }}>
                <Spinner appearance={{ size: 48 }} delay={300} />
              </Flex>
            );
          })}

          {onResolve((names) => {
            return names.map(({ name }) => {
              const resourceUrl = name.replace(/\.md/u, '');

              return (
                <Flex
                  key={name}
                  margin={{ bottom: 'large' }}
                  isInline
                  onClick={() => {
                    closeDrawer();
                  }}
                >
                  <Link to={`/info/${encodeURI(resourceUrl)}`}>{resourceUrl}</Link>
                </Flex>
              );
            });
          })}

          {onReject(() => {
            return (
              <Flex alignment={{ horizontal: 'center' }} direction="column">
                <Flex margin={{ bottom: 'large' }}>
                  <Text align="center" color="var(--c-negative)">
                    {t('something-went-wrong')}
                  </Text>
                </Flex>

                <Button onClick={getResources}>
                  <Styled.ReloadIcon />
                </Button>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};
