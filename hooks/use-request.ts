import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const useRequest = <Response>(
  requestConfig: AxiosRequestConfig,
  dependencies: any[] = []
): {
  response: Response | null;
  isLoading: boolean;
  error: string | null;
} => {
  const [response, setResponse] = useState<Response | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dependencies.filter(Boolean).length) {
      (async () => {
        try {
          const { data } = await axios(requestConfig);

          setResponse(data);
        } catch (requestError) {
          setError(requestError.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [...dependencies]);

  return { response, isLoading, error };
};

export default useRequest;
