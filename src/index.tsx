import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { Layout, FadeIn } from 'components';

import routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider
      override={{
        font: { body: 'Roboto' },
        palette: {
          lightest: '#f5f5f5',
          light: '#eee',
          primary: '#599a4f',
          'primary-light': '#98db8e',
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
    </ThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
