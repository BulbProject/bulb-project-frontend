import { Category, CategoryVersion } from '../../types/data';

export type CategoryCardData = Pick<Category, 'id' | 'title' | 'description' | 'classification' | 'status'> &
  Pick<CategoryVersion, 'version'>;

export interface CategoryCard {
  id: string;
  version: string;
  categoryVersion?: CategoryCardData;
  error?: string;
}
