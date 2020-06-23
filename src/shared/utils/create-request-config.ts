import { AxiosRequestConfig } from 'axios';

export const createRequestConfig = <B = undefined>({
  baseUrl,
  method,
  body,
  path,
  params = [],
  query,
  responseType = 'json',
}: {
  baseUrl: string;
  method: AxiosRequestConfig['method'];
  body?: B;
  path: string;
  params?: string[];
  query?: Record<string, unknown>;
  responseType?: 'json' | 'blob';
}): AxiosRequestConfig => ({
  method,
  data: body,
  url: `${baseUrl}/${path}${params.length > 0 ? `/${params.join('/')}` : ''}${
    query
      ? `?${Object.keys(query)
          .reduce((string, param) => `${string}${param}=${query[param]}&`, ``)
          .slice(0, -1)}`
      : ''
  }`,
  responseType,
});
