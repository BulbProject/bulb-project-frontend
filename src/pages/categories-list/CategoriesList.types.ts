import { Category, CategoryVersion } from '../../types/data';

export type CategoryCardData = Pick<Category, 'id' | 'title' | 'description' | 'status'> &
  Pick<CategoryVersion, 'version'> & { image: string };

export interface CategoryCard {
  id: string;
  version: string;
  categoryVersion?: CategoryCardData;
  error?: string;
}
