import { AxiosRequestConfig } from 'axios';
import React, { FC, createContext, useContext } from 'react';

import * as DocumentsApiConfig from './documents-api.config';

interface DocumentsApi {
  getDocumentsConfig(language: string): AxiosRequestConfig;
  getDocumentConfig(fileName: string, language: string): AxiosRequestConfig;
}

const DocumentsApiContext = createContext<DocumentsApi | undefined>(undefined);

const DocumentsApiProvider: FC = ({ children }) => {
  return <DocumentsApiContext.Provider value={DocumentsApiConfig}>{children}</DocumentsApiContext.Provider>;
};

export const useDocumentsApi = (): DocumentsApi => {
  const context = useContext(DocumentsApiContext);

  if (context === undefined) {
    throw new ReferenceError('Use DocumentsApi inside its provider.');
  }

  return context;
};

export default DocumentsApiProvider;
