import { lazy } from 'react';

import { RouteProps } from 'react-router-dom';

const Index = lazy(() => import('./pages/main/Main.component'));
const CategoryPage = lazy(() => import('./pages/category/Category.component'));
const InfoPage = lazy(() => import('./pages/info/Info.component'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFount.component'));

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
].map((route) => ({ ...route, exact: true }));

export default routes;
