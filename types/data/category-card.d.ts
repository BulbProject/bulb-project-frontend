import {Category} from "./category";
import {CategoryVersion} from "./category-version";
import {RequestError} from "../request-error";

export type CategoryCardData =
  Pick<Category, 'id' | 'title' | 'description' | 'classification'>
  & Pick<CategoryVersion, 'version'>


export interface CategoryCard {
  id: string,
  version: string,
  data?: CategoryCardData,
  error?: RequestError
}
