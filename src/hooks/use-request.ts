import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

interface RequestError {
  message: string;
  statusCode: number;
}

export const useRequest = <D>(
  config: AxiosRequestConfig,
  options: {
    dependencies?: unknown[];
    isRequesting?: boolean;
    isDefaultLoading?: boolean;
  } = {}
): {
  isLoading: boolean;
  data: D | null;
  error: RequestError | null;
  triggerRequest(): void;
} => {
  const { dependencies = [], isRequesting = true, isDefaultLoading = true } = options;

  const [_, triggerRequest] = useState(false);

  const [isLoading, setLoading] = useState(isDefaultLoading);

  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<RequestError | null>(null);

  useEffect(() => {
    if (isRequesting) {
      (async () => {
        try {
          setLoading(true);
          setError(null);

          const { data: requestData } = await axios(config);

          setData(requestData);
        } catch ({ message, response }) {
          setError({ message, statusCode: response?.status });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [_, isRequesting, ...dependencies]);

  return { isLoading, data, error, triggerRequest: () => triggerRequest(!_) };
};
