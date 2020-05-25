import type { AxiosRequestConfig } from 'axios';
import type { Category, CategoryVersion, RequestedNeed, SelectedVariant } from 'types/data';

const apiServiceBaseUrl = 'http://localhost:4242';

const createRequestConfig = ({
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
  body?: any;
  path: string;
  params?: string[];
  query?: Record<string, unknown>;
  responseType?: 'json' | 'blob';
}): AxiosRequestConfig => ({
  method,
  data: body,
  url: `${baseUrl}/${path}${params?.length ? `/${params.join('/')}` : ''}${
    query
      ? `?${Object.keys(query)
          .reduce((string, param) => `${string}${param}=${query[param]}&`, ``)
          .slice(0, -1)}`
      : ''
  }`,
  responseType,
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

export const postSpecification = ({
  categoryId,
  version,
  egp,
  mode,
  body,
}: {
  categoryId: Category['id'];
  version: CategoryVersion['version'];
  egp: string;
  mode: string;
  body: { selectedVariant: SelectedVariant };
}): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: apiServiceBaseUrl,
    method: 'post',
    path: `do/specification`,
    query: { egp, mode },
    params: [categoryId, version],
    body,
    responseType: mode === 'json' ? mode : 'blob',
  });
};

const githubApiServiceUrl = 'https://udoc.eprocurement.systems';
// @TODO need change branch to "master" for production
const githubBranch = 'develop';
const githubInfoPath = 'info';
// @TODO change when correct folder will have been added to the repo
const githubMainContentPath = 'main-content';

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

export const getMainContentFiles = () => {
  return createRequestConfig({
    baseUrl: githubApiServiceUrl,
    method: 'get',
    path: `entries/BulbProject/bulb-project-frontend/${githubBranch}/${githubMainContentPath}`,
  });
};

export const getMainContentFile = (fileName: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: githubApiServiceUrl,
    method: 'get',
    path: `entries/BulbProject/bulb-project-frontend/${githubBranch}/${githubMainContentPath}/${fileName}.md`,
  });
};
