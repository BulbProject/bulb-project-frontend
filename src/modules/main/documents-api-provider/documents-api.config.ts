import { AxiosRequestConfig } from 'axios';

import { gitHubApiConfig } from 'shared/config';
import { createRequestConfig } from 'shared/utils';

const documetsProviderConfig = {
  ...gitHubApiConfig,
  path: 'main-content',
};

export const getDocumentsConfig = (): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: documetsProviderConfig.baseUrl,
    method: 'get',
    path: `${documetsProviderConfig.branch}/${documetsProviderConfig.path}`,
  });
};

export const getDocumentConfig = (fileName: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: documetsProviderConfig.baseUrl,
    method: 'get',
    path: `${documetsProviderConfig.branch}/${documetsProviderConfig.path}/${fileName}.md`,
  });
};
