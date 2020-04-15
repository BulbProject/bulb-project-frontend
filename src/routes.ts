import { RouteProps } from 'react-router-dom';

import Index from './pages';
import CategoryPage from './pages/categories/[categoryId]/[version]';
import NotFoundPage from './pages/notFound';

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
    path: '*',
    component: NotFoundPage,
  },
].map(route => ({ ...route, exact: true }));

export default routes;
