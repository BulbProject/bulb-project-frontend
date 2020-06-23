import React, { FC, createContext, useContext } from 'react';

import { AxiosRequestConfig } from 'axios';

import { Category, CategoryVersion, RequestedNeed, SelectedVariant } from 'shared/entity/data';

import * as ApiConfig from './api.config';

interface Api {
  getCategoriesConfig(): AxiosRequestConfig;
  getCategoryVersionConfig(categoryId: Category['id'], version: CategoryVersion['version']): AxiosRequestConfig;
  postCalculationConfig(
    categoryId: Category['id'],
    version: CategoryVersion['version'],
    body: { requestedNeed: RequestedNeed }
  ): AxiosRequestConfig;
  postSpecificationConfig(params: {
    categoryId: Category['id'];
    version: CategoryVersion['version'];
    mode: string;
    body: { selectedVariant: SelectedVariant };
  }): AxiosRequestConfig;
}

const ApiProviderContext = createContext<Api | undefined>(undefined);

const ApiProvider: FC = ({ children }) => {
  return <ApiProviderContext.Provider value={ApiConfig}>{children}</ApiProviderContext.Provider>;
};

export const useApi = (): Api => {
  const context = useContext(ApiProviderContext);

  if (context === undefined) {
    throw new ReferenceError('Use Api inside its provider.');
  }

  return context;
};

export default ApiProvider;
