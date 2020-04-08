import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { createGlobalStyle } from 'styled-components';

import { ThemeProvider } from 'ustudio-ui/theme';

const GlobalStyles = createGlobalStyle`
  body {
    height: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: var(--c-lightest);
    color: var(--c-darkest);
  }
`;

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>The Bulb Project</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <meta name="apple-mobile-web-app-title" content="The Bulb Project" />
        <meta name="application-name" content="The Bulb Project" />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#ffffff" />

        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital@0;1&family=Source+Code+Pro&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};

export default CustomApp;
