import type { AxiosRequestConfig } from 'axios';

import type { Category, CategoryVersion, RequestedNeed, SelectedVariant } from 'shared/entity/data';
import { createRequestConfig } from 'shared/utils';

const apiConfig = {
  baseUrl: process.env.BACKEND_URL ?? '',
};

export const getCategoriesConfig = (): AxiosRequestConfig =>
  createRequestConfig({
    baseUrl: apiConfig.baseUrl,
    method: 'get',
    path: 'categories',
    query: {
      details: true,
    },
  });

export const getCategoryVersionConfig = (
  categoryId: Category['id'],
  version: CategoryVersion['version']
): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: apiConfig.baseUrl,
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
    baseUrl: apiConfig.baseUrl,
    method: 'post',
    path: 'do/calculation',
    params: [categoryId, version],
    body,
  });
};

export const postSpecificationConfig = ({
  categoryId,
  version,
  mode,
  body,
}: {
  categoryId: Category['id'];
  version: CategoryVersion['version'];
  mode: string;
  body: { selectedVariant: SelectedVariant };
}): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: apiConfig.baseUrl,
    method: 'post',
    path: `do/specification`,
    query: { egp: 'prozorro', mode },
    params: [categoryId, version],
    body,
    responseType: mode === 'json' ? mode : 'blob',
  });
};
