import { AxiosRequestConfig } from 'axios';
import { Category, CategoryVersion } from 'types/data';

const serviceProtocol = 'http';
const serviceIP = '185.25.116.133';
const servisePort = 8989;
const serviceAddress = `${serviceProtocol}://${serviceIP}:${servisePort}`;

const createRequestConfig = ({
  method,
  path,
  params = [],
}: {
  method: AxiosRequestConfig['method'];
  path: string;
  params?: string[];
}): AxiosRequestConfig => ({
  method,
  url: `${serviceAddress}/${path}/${params.join('/')}`,
  responseType: 'json',
});

export const getCategoryVersionConfig = (
  categoryId: Category['id'],
  version: CategoryVersion['version']
): AxiosRequestConfig => createRequestConfig({ method: 'get', path: 'categories', params: [categoryId, version] });
