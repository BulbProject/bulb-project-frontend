import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { Layout, FadeIn, GlobalStyles } from 'components';

import routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider
      override={{
        font: { body: 'Roboto' },
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
      <BrowserRouter>
        <FadeIn>
          <Layout>
            <Suspense fallback={<div />}>
              <Switch>
                <Redirect exact from="/categories" to="/" />
                {routes.map((route) => (
                  <Route {...route} key={route.path as string} />
                ))}
              </Switch>
            </Suspense>
          </Layout>
        </FadeIn>
      </BrowserRouter>

      <GlobalStyles />
    </ThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
