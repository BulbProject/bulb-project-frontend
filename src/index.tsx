import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { Layout, FadeIn } from 'components';

import routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <FadeIn>
          <Layout>
            <Suspense fallback={<div />}>
              <Switch>
                <Redirect exact from="/categories" to="/" />
                {routes.map(route => (
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
