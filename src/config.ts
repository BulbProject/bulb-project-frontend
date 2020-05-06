import { AxiosRequestConfig } from 'axios';
import { Category, CategoryVersion, RequestedNeed } from 'types/data';

const apiServiceProtocol = 'http';
const apiServiceHost = '185.25.116.133';
const apiServicePort = 8989;
const apiServiceBaseUrl = `${apiServiceProtocol}://${apiServiceHost}${apiServicePort ? `:${apiServicePort}` : ''}`;

const createRequestConfig = ({
  baseUrl,
  method,
  body,
  path,
  params = [],
}: {
  baseUrl: string;
  method: AxiosRequestConfig['method'];
  body?: any;
  path: string;
  params?: string[];
}): AxiosRequestConfig => ({
  method,
  data: body,
  url: `${baseUrl}/${path}${params?.length ? `/${params.join('/')}` : ''}`,
  responseType: 'json',
});

export const getCategoriesConfig = (): AxiosRequestConfig =>
  createRequestConfig({
    baseUrl: apiServiceBaseUrl,
    method: 'get',
    path: 'categories',
  });

export const getCategoryVersionConfig = (
  categoryId: Category['id'],
  version: CategoryVersion['version']
): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: apiServiceBaseUrl,
    method: 'get',
    path: 'categories',
    params: [categoryId, version],
  });
};

export const postCalculationConfig = (
  categoryId: Category['id'],
  version: CategoryVersion['version'],
  body: { requestedNeed: RequestedNeed }
): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: apiServiceBaseUrl,
    method: 'post',
    path: 'do/calculation',
    params: [categoryId, version],
    body,
  });
};

const githubApiServiceUrl = 'https://udoc.eprocurement.systems';
// @TODO need change branch to "master" for production
const githubBranch = 'develop';
const githubInfoPath = 'info';

export const getInfoFiles = () => {
  return createRequestConfig({
    baseUrl: githubApiServiceUrl,
    method: 'get',
    path: `entries/BulbProject/bulb-project-frontend/${githubBranch}/${githubInfoPath}`,
  });
};

export const getInfoFile = (fileName: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: githubApiServiceUrl,
    method: 'get',
    path: `entries/BulbProject/bulb-project-frontend/${githubBranch}/${githubInfoPath}/${fileName}.md`,
  });
};
