import React, { FC } from 'react';
import useMount from 'honks/use-mount';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

// Type declarations are missing for this package
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow';
import { useLayoutVariant } from 'core/layout';
import DocumentsApiProvider from './documents-api-provider';

import { Layout } from './layout';

const Main: FC = () => {
  const hasMounted = useMount();
  const isMd = useMediaQuery('screen and (min-width: 768px)');

  useLayoutVariant('empty');

  if (hasMounted()) {
    return (
      <DocumentsApiProvider>
        {isMd ? (
          <ReactFullpage
            licenseKey="Nu9TbnPK-hA3_269z-aVtu9yF4-g7gX7RCY"
            navigation
            scrollOverflow
            callbacks={['onLeave']}
            render={Layout}
          />
        ) : (
          <Layout />
        )}
      </DocumentsApiProvider>
    );
  }

  return null;
};

export default Main;
