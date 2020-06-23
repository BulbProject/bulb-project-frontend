import React, { FC, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { Layout } from '../layout';

import ApiProvider from '../context/api-provider';
import ResourcesApiProvider from '../context/resources-api-provider';

import { GlobalStyles } from '../theme';

import { routes } from './app.routing';

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
    </ThemeProvider>
  );
};
