import React, { FC, createContext, useContext, useEffect } from 'react';
import { Variant } from './variant';

interface LayoutVariant {
  setLayoutVariant(variant: Variant): void;
}

const LayoutVariantContext = createContext<LayoutVariant | undefined>(undefined);

const LayoutVariantProvider: FC<LayoutVariant> = ({ children, setLayoutVariant }) => {
  return (
    <LayoutVariantContext.Provider
      value={{
        setLayoutVariant,
      }}
    >
      {children}
    </LayoutVariantContext.Provider>
  );
};

export const useLayoutVariant = (variant: Variant): void => {
  const context = useContext(LayoutVariantContext);

  if (context === undefined) {
    throw new ReferenceError('Use LayoutVariant inside its provider.');
  }

  useEffect(() => {
    context.setLayoutVariant(variant);
  }, []);
};

export default LayoutVariantProvider;
