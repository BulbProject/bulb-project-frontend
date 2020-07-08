import React, { FC, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { ThemeProvider } from 'ustudio-ui/theme';

import { Fade } from 'shared/components/fade';

import { Layout } from '../layout';

import ApiProvider from '../context/api-provider';
import ResourcesApiProvider from '../context/resources-api-provider';

import { GlobalStyles } from '../theme';

import { routes } from './app.routing';

const Center = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 10000;

  width: 2px;
  height: 100vh;

  background-color: red;

  opacity: 0.1;

  transform: translateX(-50%);
`;

export const App: FC = () => {
  return (
    <ThemeProvider
      override={{
        font: { body: 'Roboto', article: 'Lora' },
        palette: {
          lightest: '#f5f5f5',
          light: '#eee',
          primary: '#23a6da',
          'primary-light': '#82C5E7',
          negative: '#f69378',
          'negative-light': '#fbab95',
        },
      }}
    >
      <Fade>
        {process.env.APP_ENV === 'DEV' && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: '50%',
              zIndex: 1000,
              transform: 'translateX(-50%)',
              fontSize: 20,
              color: 'red',
              userSelect: 'none',
              pointerEvents: 'none',
              opacity: '0.4',
            }}
          >
            Development build
          </div>
        )}

        <Center />

        <ApiProvider>
          <ResourcesApiProvider>
            <BrowserRouter>
              <Layout>
                <Suspense fallback={<div />}>
                  <Switch>
                    {routes.map((route) => (
                      <Route {...route} key={route.path as string} />
                    ))}
                  </Switch>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </ResourcesApiProvider>
        </ApiProvider>

        <GlobalStyles />
      </Fade>
    </ThemeProvider>
  );
};
