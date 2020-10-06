import { AxiosRequestConfig } from 'axios';

import { createRequestConfig } from 'shared/utils';
import { gitHubApiConfig } from 'shared/config';

const resourcesApiConfig = {
  ...gitHubApiConfig,
  path: 'resources',
};

export const getResourcesConfig = (language: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: resourcesApiConfig.baseUrl,
    method: 'get',
    path: `${resourcesApiConfig.branch}/${resourcesApiConfig.path}%2F${language}`,
  });
};

export const getResourceFileConfig = (fileName: string, language: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: resourcesApiConfig.baseUrl,
    method: 'get',
    path: `${resourcesApiConfig.branch}/${resourcesApiConfig.path}%2F${language}/${fileName}.md`,
  });
};
