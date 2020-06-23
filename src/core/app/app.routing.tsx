import React, { lazy } from 'react';

import { RouteProps } from 'react-router-dom';

import Calculation from 'shared/context/calculation';
import CategoryProvider from 'core/context/category-provider';
// eslint-disable-next-line boundaries/no-private,boundaries/allowed-types
import { FullLayout } from '../layout/variants/full-layout';

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
    render: () => (
      <FullLayout>
        <CategoriesListPage />
      </FullLayout>
    ),
  },
  {
    path: '/categories/:categoryId/:version',
    render: () => (
      <CategoryProvider>
        <Calculation>
          <FullLayout>
            <CategoryPage />
          </FullLayout>
        </Calculation>
      </CategoryProvider>
    ),
  },
  {
    path: '/categories/:categoryId/:version/calculation-result',
    render: () => (
      <CategoryProvider>
        <Calculation>
          <FullLayout>
            <CalculationResult />
          </FullLayout>
        </Calculation>
      </CategoryProvider>
    ),
  },
  {
    path: '/info/:infoFileName',
    render: () => (
      <FullLayout>
        <ResourcePage />
      </FullLayout>
    ),
  },
  {
    path: '*',
    render: () => (
      <FullLayout>
        <NotFoundPage />
      </FullLayout>
    ),
  },
].map((route) => ({ ...route, exact: true }));
