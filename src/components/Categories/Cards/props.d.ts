import {Category} from "./category";
import {CategoryVersion} from "./category-version";

export type CategoryCard =
  Pick<Category, 'id' | 'title' | 'description' | 'classification'>
  & Pick<CategoryVersion, 'version'>
