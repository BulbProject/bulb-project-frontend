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
        <meta name="msapplication-TileColor" content="#fcfcfc" />
        <meta name="theme-color" content="#fcfcfc" />
        <meta name="description" content="Bulb project Front-End" />
        <meta name="keywords" content="Bulb" />

        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital@0;1&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="apple-touch-icon" href="/logo512.png" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};

export default CustomApp;
