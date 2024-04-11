export type Advertisement = {
  id: number;
  platform: string;
  adName: string;
  createDate: Date;
  advertisementId: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type UpdateAdvertModel = {
  id: number;
  platform: string;
  adName: string;
  advertisementId: string;
  isActive: boolean;
  isDeleted: boolean;
};
