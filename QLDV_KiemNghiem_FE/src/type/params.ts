interface BaseParam {
  PageSize?: number;
  PageNumber?: number;
  GetAll?: boolean;
  search?: string;
  sort?: boolean;
}

export interface IParamDangKyMau extends BaseParam {
  MaLoaiMau?: string;
  trangThaiPhanCong?: string;
}
