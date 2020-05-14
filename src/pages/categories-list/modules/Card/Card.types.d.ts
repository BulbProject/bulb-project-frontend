import { Category, CategoryVersion } from 'types/data';

export type CategoryCardProps = Pick<Category, 'id' | 'title' | 'description' | 'classification' | 'status'> &
  Pick<CategoryVersion, 'version'>;
