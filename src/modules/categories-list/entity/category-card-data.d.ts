import { Category, CategoryVersion } from 'shared/entity/data';

export type CategoryCardData = Pick<Category, 'id' | 'title' | 'description'> &
  Pick<CategoryVersion, 'version'> & { image?: string; status: 'active' | 'pending' };
