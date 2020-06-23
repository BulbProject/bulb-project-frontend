import React, { lazy } from 'react';

import { RouteProps } from 'react-router-dom';

import Calculation from 'shared/context/calculation';
import CategoryProvider from 'core/context/category-provider';

const MainPage = lazy(async () => import('../../modules/main/main.component'));
const CategoriesListPage = lazy(async () => import('../../modules/categories-list/categories-list.component'));
const CategoryPage = lazy(async () => import('../../modules/category/category.component'));
const CalculationResult = lazy(async () => import('../../modules/calculation-result/calculation-result.component'));
const ResourcePage = lazy(async () => import('../../modules/resource/resource.component'));
const NotFoundPage = lazy(async () => import('../../modules/not-found/not-found.component'));

export const routes: RouteProps[] = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/categories',
    component: CategoriesListPage,
  },
  {
    path: '/categories/:categoryId/:version',
    render: () => (
      <CategoryProvider>
        <Calculation>
          <CategoryPage />
        </Calculation>
      </CategoryProvider>
    ),
  },
  {
    path: '/categories/:categoryId/:version/calculation-result',
    render: () => (
      <CategoryProvider>
        <Calculation>
          <CalculationResult />
        </Calculation>
      </CategoryProvider>
    ),
  },
  {
    path: '/info/:infoFileName',
    component: ResourcePage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
].map((route) => ({ ...route, exact: true }));
