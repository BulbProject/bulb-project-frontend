import { Category, CategoryVersion } from 'types/data';

export type CategoryCardProps = Pick<Category, 'id' | 'title' | 'description' | 'classification'> &
  Pick<CategoryVersion, 'version'>;
