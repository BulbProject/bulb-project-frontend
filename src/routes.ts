import { lazy } from 'react';

import { RouteProps } from 'react-router-dom';

const Index = lazy(() => import('./pages'));
const CategoryPage = lazy(() => import('./pages/categories/category'));
const InfoPage = lazy(() => import('./pages/info/infoPage'));
const NotFoundPage = lazy(() => import('./pages/notFound'));

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
  {
    path: '*',
    component: NotFoundPage,
  },
].map(route => ({ ...route, exact: true }));

export default routes;
