// import { FormMau } from "./mau";

import { FormMau } from "./mau";
import { FormPhuLieuHoaChat } from "./PhuLieuHoaChat";

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
  maKh: string;
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
  Maus: FormMau[];
  PhieuDangKyPhuLieuHoaChats: FormPhuLieuHoaChat[];
}

export interface FormPhieuDangKy2 {
  maKh: string;
  manvNhanMau: string;
  nguoiNhanMau: string;
  donViGuiMau: string;
  nguoiGuiMau: string;
  soDienThoai: string;
  email: string;
  diaChiLienHe: string;
  hinhThucGuiMau: string;
  hinhThucTraKq: string;
  diaChiGiaoMau: string;
  trangThaiId: string;
  ketQuaTiengAnh: number;
  ngayGiaoMau: string;
  ngayThucHien: string;
  Maus: FormMau[];
  PhieuDangKyPhuLieuHoaChats: FormPhuLieuHoaChat[];
}

export interface PhieuDangKy {
  donViGuiMau: string;
  nguoiGuiMau: string;
  soDienThoai: string;
  email: string;
  diaChiLienHe: string;
  hinhThucGuiMau: string;
  hinhThucTraKQ: string;
  diaChiGiaoMau?: string;
  ketQuaTiengAnh?: number;
  ngayGiaoMau: string;
  maus: FormMau[];
  phieuDangKyPhuLieuHoaChats: FormPhuLieuHoaChat[];
}

export interface FormBoLocPhieuDangKyChoXetDuyet {
  NgayBatDau: string;
  NgayKetThuc: string;
}

export interface FormThemMauVaoDanhMuc {
  tenMau: string;
  maID: string;
}

export interface FormThemTieuChuanVaoDanhMuc {
  tenTieuChuan: string;
}

export interface FormBoLocQuanLyPhieuDKyDVHN {
  trangThai?: string;
  maKH?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
}

export interface ParamsPhieuDangKy {
  trangThaiID?: string;
  maKH?: string;
  timeFrom?: string;
  timeTo?: string;
}
