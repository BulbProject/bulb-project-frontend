import axios, { AxiosRequestConfig } from 'axios';
import { CategoryVersion } from 'types/data';
import { getCategoryVersionConfig } from 'config';

import type { CategoryCard, CategoryCardData } from './CategoriesList.types';

export const requestData = async <Response>(
  requestConfig: AxiosRequestConfig
): Promise<{ data?: Response; error?: string }> => {
  try {
    const { data } = await axios(requestConfig);

    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

const transformCategoryData = (categoryVersion?: CategoryVersion): CategoryCardData | undefined => {
  if (!categoryVersion) return undefined;

  return {
    id: categoryVersion.category.id,
    title: categoryVersion.category.title,
    status: categoryVersion.status,
    description: categoryVersion.category.description,
    version: categoryVersion.version,
    image: categoryVersion.category.documents.find((doc) => !doc.relatedItem)?.url,
  };
};

export const getCategory = async (id: string, version: string): Promise<CategoryCard> => {
  const { data: categoryVersion, error } = await requestData<CategoryVersion>(getCategoryVersionConfig(id, version));

  return { id, version, categoryVersion: transformCategoryData(categoryVersion), error };
};

export const sortCategories = (categories: CategoryCard[]) => {
  const pendingCategories = categories.filter((category) => category.categoryVersion?.status === 'pending');
  const activeCategories = categories.filter((category) => category.categoryVersion?.status === 'active');
  const categoriesWithoutStatus = categories.filter((category) => !category?.categoryVersion?.status);

  return [...activeCategories, ...pendingCategories, ...categoriesWithoutStatus];
};
