import React, { FC } from 'react';

// Type declarations are missing for this package
// @ts-ignore
import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow';
import { useMedia } from 'shared/hooks';
import { Fade } from 'shared/components/fade';

import DocumentsApiProvider from './documents-api-provider';

import { Layout } from './layout';

const Main: FC = () => {
  const isMd = useMedia('screen and (min-width: 768px)');

  return (
    <Fade>
      <DocumentsApiProvider>
        {isMd() ? (
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
    </Fade>
  );
};

export default Main;
