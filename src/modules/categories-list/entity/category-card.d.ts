import { CategoryCardData } from './category-card-data';

export interface CategoryCard {
  id: string;
  version: string;
  categoryVersion?: CategoryCardData;
}
