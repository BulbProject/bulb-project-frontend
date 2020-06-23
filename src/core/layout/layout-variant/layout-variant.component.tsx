import React, { FC, ReactElement } from 'react';

import { FullLayout } from './full';
import type { Variant } from './variant';

export const LayoutVariant: FC<{
  variant: Variant;
}> = ({ children, variant }) => {
  switch (variant) {
    case 'full': {
      return <FullLayout>{children}</FullLayout>;
    }
    case 'empty':
    default: {
      return children as ReactElement;
    }
  }
};
