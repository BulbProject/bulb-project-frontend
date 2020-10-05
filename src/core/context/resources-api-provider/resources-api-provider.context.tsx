import React, { FC, createContext, useContext } from 'react';
import { AxiosRequestConfig } from 'axios';

import * as ResourcesApiConfig from './resources-api.config';

interface ResourcesApi {
  getResourcesConfig(lang: string): AxiosRequestConfig;
  getResourceFileConfig(fileName: string, lang: string): AxiosRequestConfig;
}

const ResourcesApiContext = createContext<ResourcesApi | undefined>(undefined);

const ResourcesApiProvider: FC = ({ children }) => {
  return <ResourcesApiContext.Provider value={ResourcesApiConfig}>{children}</ResourcesApiContext.Provider>;
};

export const useResourcesApi = (): ResourcesApi => {
  const context = useContext(ResourcesApiContext);

  if (context === undefined) {
    throw new ReferenceError('Use ResourcesApi inside its provider.');
  }

  return context;
};

export default ResourcesApiProvider;
