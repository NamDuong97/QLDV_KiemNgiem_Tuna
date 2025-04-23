export interface Mau {
  MaID?: string;
  MaMau?: string;
  TenMau?: string;
  LoaiMau?: string;
  DuocDien?: string;
  TieuChuan?: string;
  SoLo?: string;
  DonViSanXuat?: string;
  NgaySanXuat?: string;
  Video?: string;
  HanSD?: string;
  KhoiLuong?: any;
  DonViTinh?: string;
  YeuCauKiemNghiem?: string;
  TinhTrangMau?: string;
  DieuKienBaoQuan?: string;
  LuuMau?: string;
  XuatKetQua?: string;
  TrangThaiNhanMau?: string;
  GhiChu?: string;
  NguoiTao?: string;
  NguoiSua?: string;
  NgayTao?: string;
  NgaySua?: string;
}

export interface Anh {
  image?: string;
  nameImage?: string;
}

export interface FormMau {
  TenMau: string;
  LoaiMau: string;
  DuocDien: string;
  SoLo: string;
  DonViSanXuat: string;
  NgaySanXuat: string;
  Anh: Anh[];
  HanSD: string;
  SoLuong: number;
  DonViTinh: string;
  YeuCauKiemNghiem: string;
  DieuKienBaoQuan: string;
  LuuMau?: number;
  XuatKetQua?: number;
  TinhTrangMau: string;
  GhiChu?: string;
}
