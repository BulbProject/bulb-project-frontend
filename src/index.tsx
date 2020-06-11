import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { FadeIn, GlobalStyles } from 'components';
import './styles/fonts.css';

// Polyfills for old browsers
import 'core-js';

import routes from './routes';

const App: React.FC = () => {
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
      <BrowserRouter>
        <FadeIn>
          <Suspense fallback={<div />}>
            <Switch>
              {routes.map((route) => (
                <Route {...route} key={route.path as string} />
              ))}
            </Switch>
          </Suspense>
        </FadeIn>
      </BrowserRouter>

      <GlobalStyles />
    </ThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
