import { useCallback, useEffect, useRef } from 'react';

export const useMedia = function (query: string): () => boolean {
  // eslint-disable-next-line immutable/no-let
  let { current: isMatching } = useRef<boolean>(false);

  const handleChange = useCallback((match: MediaQueryListEvent): void => {
    isMatching = match.matches;
  }, []);

  useEffect(() => {
    const match = window.matchMedia(query);

    handleChange((match as unknown) as MediaQueryListEvent);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (match.addEventListener) {
      match.addEventListener('change', handleChange);
    } else {
      match.addListener(handleChange);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (match.removeEventListener) {
        match.removeEventListener('change', handleChange);
      } else {
        match.removeListener(handleChange);
      }
    };
  }, []);

  return useCallback(() => isMatching, []);
};
