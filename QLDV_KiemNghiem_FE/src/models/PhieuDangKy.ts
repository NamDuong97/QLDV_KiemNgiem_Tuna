// import { FormMau } from "./mau";

export interface PhieuDangKy {
  MaID?: string;
  MaKH?: string;
  ManvNhanMau?: string;
  NguoiNhanMau?: string;
  DonViGuiMau?: string;
  NguoiGuiMau?: string;
  SoDienThoai?: string;
  Email?: string;
  DiaChiLienHe?: string;
  HinhThucGuiMau?: string;
  HinhThucTraKQ?: string;
  DiaChiGiaoMau?: string;
  TrangThaiID?: string;
  KetQuaTiengViet?: boolean;
  KetQuaTiengAnh?: boolean;
  NgayGiaoMau?: string;
  NgayThucHien?: string;
  NguoiSua?: string;
  NgayTao?: string;
  NgaySua?: string;
}

export interface FormPhieuDangKy {
  DonViGuiMau: string;
  NguoiGuiMau: string;
  SoDienThoai: string;
  Email: string;
  DiaChiLienHe: string;
  HinhThucGuiMau: string;
  HinhThucTraKQ: string;
  DiaChiGiaoMau?: string;
  KetQuaTiengAnh?: number;
  NgayGiaoMau: string;
}

export interface FormBoLocPhieuDangKyChoXetDuyet {
  NgayBatDau: string;
  NgayKetThuc: string;
}

export interface FormBoLocQuanLyPhieuDKyDVHN {
  KetQua?: string;
  NgayBatDau?: string;
  NgayKetThuc?: string;
}
