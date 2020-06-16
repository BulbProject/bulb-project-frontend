import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { useRequest } from 'honks';
import axios from 'axios';

import { getInfoFiles } from 'config';

import { FadeIn } from '../FadeIn';
import Styled from './Aside.styles';

export const Aside = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { onPending, onSuccess, onFail, sendRequest } = useRequest<{ name: string }[]>(async () => {
    const { data } = await axios(getInfoFiles());

    return data;
  });

  useEffect(() => {
    (async () => sendRequest())();
  }, []);

  return (
    <>
      <Text variant="h3">Ресурси</Text>

      <Flex margin={{ top: 'large' }}>
        <Flex as="nav" direction="column" alignment={{ horizontal: 'start', vertical: 'start' }}>
          {onPending(() => {
            return (
              <Flex alignment={{ horizontal: 'center' }}>
                <FadeIn>
                  <Spinner appearance={{ size: 48 }} delay={300} />
                </FadeIn>
              </Flex>
            );
          })}

          {onSuccess((names) => {
            return names.map(({ name }) => {
              const infoPageUrl = name.replace(/\.md/, '');

              return (
                <Flex
                  key={name}
                  margin={{ bottom: 'large' }}
                  isInline
                  onClick={() => {
                    closeDrawer();
                  }}
                >
                  <Link to={`/info/${encodeURI(infoPageUrl)}`}>{infoPageUrl}</Link>
                </Flex>
              );
            });
          })}

          {onFail(() => {
            return (
              <FadeIn>
                <Flex alignment={{ horizontal: 'center' }} direction="column">
                  <Flex margin={{ bottom: 'large' }}>
                    <Text align="center" color="var(--c-negative)">
                      Упс, щось пішло не так :(
                    </Text>
                  </Flex>

                  <Button onClick={sendRequest}>
                    <Styled.ReloadIcon />
                  </Button>
                </Flex>
              </FadeIn>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};
