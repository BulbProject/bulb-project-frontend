import { AxiosRequestConfig } from 'axios';

import { createRequestConfig } from 'shared/utils';
import { gitHubApiConfig } from 'shared/config';

const resourcesApiConfig = {
  ...gitHubApiConfig,
  path: 'resources',
};

export const getResourcesConfig = (lang: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: resourcesApiConfig.baseUrl,
    method: 'get',
    path: `${resourcesApiConfig.branch}/${resourcesApiConfig.path}%2F${lang}`,
  });
};

export const getResourceFileConfig = (fileName: string, lang: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: resourcesApiConfig.baseUrl,
    method: 'get',
    path: `${resourcesApiConfig.branch}/${resourcesApiConfig.path}%2F${lang}/${fileName}.md`,
  });
};
