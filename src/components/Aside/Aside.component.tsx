import React from 'react';

import { Link } from 'react-router-dom';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { useRequest } from 'hooks';

import { getInfoFiles } from 'config';

import { stringToKebabCase, kebabCaseToSentenceCase } from 'utils';

import { FadeIn } from '../FadeIn';
import Styled from './Aside.styles';

export const Aside = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { isLoading, data: filesList, error, triggerRequest } = useRequest<{ name: string }[]>(getInfoFiles());

  return (
    <>
      <Text variant="h3">Ресурси</Text>

      <Flex margin={{ top: 'large' }}>
        <Flex as="nav" direction="column" alignment={{ horizontal: 'start', vertical: 'start' }}>
          {isLoading && (
            <Flex alignment={{ horizontal: 'center' }}>
              <FadeIn>
                <Spinner appearance={{ size: 48 }} delay={300} />
              </FadeIn>
            </Flex>
          )}

          {!isLoading &&
            !error &&
            filesList?.map(({ name }) => {
              const infoPageUrl = stringToKebabCase(name.replace(/\.md/, ''));

              return (
                <Flex
                  key={name}
                  margin={{ bottom: 'large' }}
                  isInline
                  onClick={() => {
                    closeDrawer();
                  }}
                >
                  <Link to={`/info/${infoPageUrl}`}>{kebabCaseToSentenceCase(infoPageUrl)}</Link>
                </Flex>
              );
            })}

          {!isLoading && error && (
            <FadeIn>
              <Flex alignment={{ horizontal: 'center' }} direction="column">
                <Flex margin={{ bottom: 'large' }}>
                  <Text align="center" color="var(--c-negative)">
                    Упс, щось пішло не так :(
                  </Text>
                </Flex>

                <Button onClick={() => triggerRequest()}>
                  <Styled.ReloadIcon />
                </Button>
              </Flex>
            </FadeIn>
          )}
        </Flex>
      </Flex>
    </>
  );
};
