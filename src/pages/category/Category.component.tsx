import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Grid from 'ustudio-ui/components/Grid/Grid';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { getCategoryVersionConfig } from 'config';
import { useRequest } from 'honks';
import axios from 'axios';
import { CategoryVersion, Criterion } from 'types/data';
import { sortByValue } from 'utils';
import { Layout, FadeIn, ErrorBoundary, CategoryHeader } from 'components';
import { Container } from 'shared';
import { FormValidationContextProvider } from 'context/FormValidation';

import { Stepper } from './modules';
import { CategoryContextProvider } from './store';

import Styled from './Category.styles';

const CategoryPage: React.FC = () => {
  const { categoryId, version } = useParams();
  const { goBack } = useHistory();

  const { result, onSuccess, isSuccess, sendRequest, onPending, onFail } = useRequest<CategoryVersion>(async () => {
    const { data } = await axios(getCategoryVersionConfig(categoryId as string, version as string));

    return data;
  });

  useEffect(() => {
    (async () => sendRequest())();
  }, []);

  return (
    <Layout>
      {onSuccess(({ category: { title, description, classification, criteria } }) => {
        const sortedCriteria = criteria.sort(sortByValue('id'));

        return (
          <ErrorBoundary>
            <FadeIn>
              <CategoryHeader {...{ title, description, classification }} />
              <CategoryContextProvider
                category={{ id: categoryId as string, version: version as string }}
                criteria={sortedCriteria}
              >
                <FormValidationContextProvider>
                  <Stepper />
                </FormValidationContextProvider>
              </CategoryContextProvider>
            </FadeIn>
          </ErrorBoundary>
        );
      })}

      {onPending(() => {
        return (
          <FadeIn>
            <Styled.Wrapper>
              <Container>
                <Flex direction="column" alignment={{ horizontal: 'center' }}>
                  <Spinner appearance={{ size: 48 }} delay={300} />
                </Flex>
              </Container>
            </Styled.Wrapper>
          </FadeIn>
        );
      })}

      {onFail(() => {
        return (
          <FadeIn>
            <Styled.Wrapper>
              <Container>
                <Flex direction="column" alignment={{ horizontal: 'center' }}>
                  <Text>На жаль, ми не змогли завантажити цю категорію.</Text>
                  <Grid xs={{ gap: 32 }}>
                    <Cell>
                      <Flex alignment={{ horizontal: 'end' }}>
                        <Styled.RetryButton onClick={() => goBack()}>Назад</Styled.RetryButton>
                      </Flex>
                    </Cell>

                    <Cell>
                      <Flex alignment={{ horizontal: 'start' }}>
                        <Styled.RetryButton intent="positive" onClick={() => window.location.reload()}>
                          Оновити сторінку
                        </Styled.RetryButton>
                      </Flex>
                    </Cell>
                  </Grid>
                </Flex>
              </Container>
            </Styled.Wrapper>
          </FadeIn>
        );
      })}
    </Layout>
  );
};

export default CategoryPage;
