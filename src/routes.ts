import { RouteProps } from 'react-router-dom';

import Index from './pages';
import CategoryPage from './pages/categories/category';

const routes: RouteProps[] = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/categories/:categoryId/:version',
    component: CategoryPage,
  },
].map(route => ({ ...route, exact: true }));

export default routes;
