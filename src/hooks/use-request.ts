import axios, { AxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface RequestError {
  message: string;
  statusCode: number;
}

const useRequest = <D>(
  config: AxiosRequestConfig,
  dependencies: unknown[] = []
): {
  isLoading: boolean;
  data: D | null;
  error: RequestError | null;
  triggerRequest?: Dispatch<SetStateAction<boolean>>;
} => {
  const [_, triggerRequest] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<RequestError | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data: requestData } = await axios(config);

        setData(requestData);
      } catch ({ message, response }) {
        setError({ message, statusCode: response?.status });
      } finally {
        setLoading(false);
      }
    })();
  }, [_, ...dependencies]);

  return { isLoading, data, error, triggerRequest: () => triggerRequest(!_) };
};

export default useRequest;
