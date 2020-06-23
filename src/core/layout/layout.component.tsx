import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet';

import { LayoutVariantProvider, LayoutVariant, Variant } from './layout-variant';

export const Layout: FC = ({ children }) => {
  const [variant, setVariant] = useState<Variant>('empty');

  return (
    <>
      <Helmet titleTemplate="Bulb Project | %s" defaultTitle="Bulb Project" />

      <LayoutVariant variant={variant}>
        <LayoutVariantProvider setLayoutVariant={setVariant}>{children}</LayoutVariantProvider>
      </LayoutVariant>
    </>
  );
};
