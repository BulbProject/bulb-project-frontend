export interface CategoriesListItem {
  id: string;
  version: string;
  date: string;
  status: 'active' | 'pending';
  title: string;
  description: string;
  image?: string;
}
