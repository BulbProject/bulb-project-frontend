import { lazy } from 'react';

import { RouteProps } from 'react-router-dom';

const Index = lazy(() => import('./pages'));
const CategoryPage = lazy(() => import('./pages/categories/category'));
const InfoPage = lazy(() => import('./pages/info/infoPage'));

const routes: RouteProps[] = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/categories/:categoryId/:version',
    component: CategoryPage,
  },
  {
    path: '/info/:infoFileName',
    component: InfoPage,
  },
].map(route => ({ ...route, exact: true }));

export default routes;
