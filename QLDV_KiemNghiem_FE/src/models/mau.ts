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
  SoLuong?: any;
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
  TieuChuan: string;
  DichVu: string;
  ThoiGianTieuChuan?: string;
  NgayDuKienTraKetQua?: string;
  SoLo: string;
  DonViSanXuat: string;
  NgaySanXuat: string;
  HanSuDung: string;
  SoLuong: string;
  DonViTinh: string;
  YeuCauKiemNghiem: string;
  DieuKienBaoQuan: string;
  LuuMau?: number;
  XuatKetQua?: number;
  TinhTrangMau: string;
  GhiChu?: string;
  Anh: Anh[];
}
