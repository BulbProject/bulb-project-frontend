import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Helmet titleTemplate="Bulb Project | %s" defaultTitle="Bulb Project" />

      {children}
    </>
  );
};
