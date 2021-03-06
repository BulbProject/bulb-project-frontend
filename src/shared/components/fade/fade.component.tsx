import React, { FC, useEffect, useState } from 'react';

import useMount from 'honks/use-mount';

import Styled from './fade.styles';

export const Fade: FC<{ duration?: number }> = ({ children, duration = 300 }) => {
  const [contentIsShow, setContentShow] = useState(false);

  const hasMounted = useMount();

  useEffect(() => {
    setTimeout(() => {
      if (hasMounted()) {
        setContentShow(true);
      }
    }, duration / 2);
  }, []);

  return (
    <Styled.Fade contentIsShow={contentIsShow} duration={duration / 2}>
      {children}
    </Styled.Fade>
  );
};
