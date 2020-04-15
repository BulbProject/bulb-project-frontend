import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

interface RequestError {
  message: string;
  statusCode: number;
}

const useRequest = <D>(
  config: AxiosRequestConfig,
  dependencies: unknown[] = []
): { isLoading: boolean; data: D | null; error: RequestError | null } => {
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<RequestError | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data: requestData } = await axios(config);

        setData(requestData);
      } catch ({ message, response }) {
        setError({ message, statusCode: response?.status });
      } finally {
        setLoading(false);
      }
    })();
  }, [...dependencies]);

  return { isLoading, data, error };
};

export default useRequest;
