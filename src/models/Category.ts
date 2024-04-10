export type Category = {
  id: number;
  categoryName: string;
  isActive: boolean;
  isDeleted: boolean;
};
export type SubCategory = {
  id: number;
  title: string;
  maxLetters: number;
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

export type NewSubCategoryModel = {
  title: string;
  maxLetters: number;
  categoryId: number;
  isActive: boolean;
  isDeleted: boolean;
};
export type Level = {
  id: number;
  isBonus: boolean;
  letters: string;
  additionalLetters: string;
  solvedWords: string;
  words: string;
  additionalWords: string;
  categoryId: number;
  isActive: boolean;
  isDeleted: boolean;
};
export type NewLevel = {
  isBonus: boolean;
  letters: string;
  additionalLetters: string;
  solvedWords: string;
  words: string;
  additionalWords: string;
  categoryId: number;
  isActive: boolean;
  isDeleted: boolean;
};
