import { lazy } from 'react';

import { RouteProps } from 'react-router-dom';

const Main = lazy(() => import('./pages/main/Main.component'));
const CategoriesList = lazy(() => import('./pages/categories-list/CategoriesList.component'));
const CategoryPage = lazy(() => import('./pages/category/Category.component'));
const CalculationResult = lazy(() => import('./pages/calculation-result/CalculationResult.component'));
const InfoPage = lazy(() => import('./pages/info/Info.component'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFount.component'));

const routes: RouteProps[] = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/categories',
    component: CategoriesList,
  },
  {
    path: '/categories/:categoryId/:version',
    component: CategoryPage,
  },
  {
    path: '/categories/:categoryId/:version/calculation-result',
    component: CalculationResult,
  },
  {
    path: '/info/:infoFileName',
    component: InfoPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
].map((route) => ({ ...route, exact: true }));

export default routes;
