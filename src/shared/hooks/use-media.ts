import { useCallback, useEffect, useState } from 'react';

export const useMedia = function (query: string): () => boolean {
  const [isMatching, setMatching] = useState(false);

  const handleChange = useCallback(<M extends MediaQueryListEvent | MediaQueryList>(match: M): void => {
    setMatching(match.matches);
  }, []);

  useEffect(() => {
    const match = window.matchMedia(query);

    handleChange(match);

    if (match.addEventListener !== undefined) {
      match.addEventListener('change', handleChange);
    } else {
      match.addListener(handleChange);
    }

    return () => {
      if (match.removeEventListener !== undefined) {
        match.removeEventListener('change', handleChange);
      } else {
        match.removeListener(handleChange);
      }
    };
  }, []);

  return useCallback(() => isMatching, [isMatching]);
};
