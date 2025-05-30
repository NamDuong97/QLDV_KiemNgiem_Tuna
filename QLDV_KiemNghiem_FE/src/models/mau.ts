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

export interface phieuDangKyMauHinhAnhs {
  maId: string;
  maMau: string;
  ten: string;
  dinhDang: string;
  ghiChu: string;
  loaiAnh: string;
  trangThai: number;
  nguoiTao: string;
  nguoiSua: string;
  ngayTao: string;
  ngaySua: string;
}

export interface FormMau {
  TenMau: string;
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

export interface FormMau2 {
  maId: string;
  maDmMau: string;
  tenMau: string;
  maTieuChuan: string;
  maPhieuDangKy: string;
  manvThucHien: string;
  madv: string;
  soLo: string;
  donViSanXuat: string;
  ngaySanXuat: string;
  hanSuDung: string;
  donViTinh: string;
  soLuong: number;
  yeuCauKiemNghiem: string;
  tinhTrangMau: string;
  dieuKienBaoQuan: string;
  luuMau: boolean;
  xuatKetQua: boolean;
  trangThaiNhanMau: string;
  ghiChu: string;
  nguoiTao: string;
  nguoiSua: string;
  ngayTao: string;
  ngaySua: string;
  thoiGianTieuChuan: string;
  maPdkMau: string | null;
  loaiDv: string;
  Anh: Anh[];
}
