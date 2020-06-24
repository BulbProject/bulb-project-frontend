import { Category } from './category';

export interface CategoryVersion {
  version: string;
  date: string;
  status: 'active' | 'pending';
  category: Category;
}
