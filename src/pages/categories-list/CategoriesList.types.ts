import { Category, CategoryVersion } from '../../types/data';

export type CategoryCardData = Pick<Category, 'id' | 'title' | 'description'> &
  Pick<CategoryVersion, 'version'> & { image?: string; status: 'active' | 'pending' };

export interface CategoryCard {
  id: string;
  version: string;
  categoryVersion?: CategoryCardData;
  error?: string;
}
