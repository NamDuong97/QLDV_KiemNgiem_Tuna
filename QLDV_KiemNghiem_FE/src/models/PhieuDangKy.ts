// import { FormMau } from "./mau";

import { Maus } from "./mau";
import { PhuLieuHoaChat } from "./PhuLieuHoaChat";
export interface FormPhieuDangKy {
  DonViGuiMau: string;
  NguoiGuiMau: string;
  SoDienThoai: string;
  Email: string;
  DiaChiLienHe: string;
  HinhThucGuiMau: string;
  HinhThucTraKQ: string;
  DiaChiGiaoMau?: string;
  KetQuaTiengAnh?: boolean;
  NgayGiaoMau: string;
}

export interface FormPhieuDangKyTemp {
  DonViGuiMau?: string;
  NguoiGuiMau?: string;
  SoDienThoai?: string;
  Email?: string;
  DiaChiLienHe?: string;
  HinhThucGuiMau?: string;
  HinhThucTraKQ?: string;
  DiaChiGiaoMau?: string;
  KetQuaTiengAnh?: boolean;
  NgayGiaoMau?: string;
  Maus?: Maus[];
  PLHC?: PhuLieuHoaChat[];
}

export interface PhieuDangKy {
  maId: string;
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
  diaChiGiaoMau?: string;
  trangThaiId: string;
  ketQuaTiengAnh: boolean;
  ngayGiaoMau: string;
  ngayThucHien: string | null;
  Maus: Maus[];
  PhieuDangKyPhuLieuHoaChats: PhuLieuHoaChat[];
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

export interface ParamsPhieuDangKyByTrangThai {
  maTrangThaiPhieuDangKy?: string;
  maKH?: string;
}

export interface ThoiGianTieuChuanParams {
  maDmMau?: string;
  maTieuChuan?: string;
}

export interface FormThemDanhMucPLHC {
  maDmPlhc: string;
  tenDmPlhc: string;
  tenHienThi: string
  nongDo: string;
  donViNongDo: string;
  dieuKienBaoQuan: string;
}
