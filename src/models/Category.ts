export type Category = {
  id: number;
  categoryName: string;
  isActive: boolean;
  isDeleted: boolean;
};
export type SubCategory = {
  id: number;
  title: string;
  maxLetters: string;
  categoryId: number;
  isActive: boolean;
  isDeleted: boolean;
};
export type UpdateCategoryModel = {
  categoryId: number;
  categoryName: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type NewCategoryModel = {
  categoryName: string;
  isActive: boolean;
  isDeleted: boolean;
};
