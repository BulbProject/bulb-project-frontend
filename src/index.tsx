import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import Layout from 'components/Layout';
import routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div />}>
            <Switch>
              {routes.map(route => (
                <Route {...route} key={route.path as string} />
              ))}
            </Switch>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
