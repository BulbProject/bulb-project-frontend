import { AxiosRequestConfig } from 'axios';
import { Category, CategoryVersion } from 'types/data';

const apiServiceProtocol = 'http';
const apiServiceHost = '185.25.116.133';
const apiServicePort = 8989;
const apiServiceBaseUrl = `${apiServiceProtocol}://${apiServiceHost}${apiServicePort ? `:${apiServicePort}` : ''}`;

const createRequestConfig = ({
  baseUrl,
  method,
  path,
  params = [],
}: {
  baseUrl: string;
  method: AxiosRequestConfig['method'];
  path: string;
  params?: string[];
}): AxiosRequestConfig => ({
  method,
  url: `${baseUrl}/${path}${params?.length ? `/${params.join('/')}` : ''}`,
  responseType: 'json',
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

const githubBaseUrl = 'https://api.github.com/repos/BulbProject/bulb-project-frontend/contents';
const githubRawBaseUrl = 'https://raw.githubusercontent.com/BulbProject/bulb-project-frontend';
// @TODO need change branch to "master" for production
const githubBranch = 'info-pages';
const githubInfoPath = 'info';

export const getInfoFiles = () => {
  return createRequestConfig({
    baseUrl: githubBaseUrl,
    method: 'get',
    path: `${githubInfoPath}?ref=${githubBranch}`,
  });
};

export const getInfoFile = (fileName: string): AxiosRequestConfig => ({
  method: 'get',
  url: `${githubRawBaseUrl}/${githubBranch}/${githubInfoPath}/${fileName}.md`,
});
