import { AxiosRequestConfig } from 'axios';

import { gitHubApiConfig } from 'shared/config';
import { createRequestConfig } from 'shared/utils';

const documetsProviderConfig = {
  ...gitHubApiConfig,
  path: 'main-content',
};

export const getDocumentsConfig = (language: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: documetsProviderConfig.baseUrl,
    method: 'get',
    path: `${documetsProviderConfig.branch}/${documetsProviderConfig.path}%2F${language}`,
  });
};

export const getDocumentConfig = (fileName: string, language: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: documetsProviderConfig.baseUrl,
    method: 'get',
    path: `${documetsProviderConfig.branch}/${documetsProviderConfig.path}%2F${language}/${fileName}.md`,
  });
};
