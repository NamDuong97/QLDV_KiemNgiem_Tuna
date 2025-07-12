export interface Anh {
  base64?: string;
  image?: File;
  ghiChu?: string;
}

export interface FormMau {
  tenMau: string;
  tenTieuChuan: string;
  tenLoaiDichVu: string;
  soLo: string;
  donViSanXuat: string;
  ngaySanXuat: string;
  hanSuDung: string;
  soLuong: number;
  donViTinh: string;
  yeuCauKiemNghiem: string;
  dieuKienBaoQuan: string;
  luuMau?: boolean;
  xuatKetQua?: boolean;
  tinhTrangMau: string;
  ghiChu?: string;
  phieuDangKyMauHinhAnhs: Anh[];
}

export interface FormMauEdit {
  tenMau: string;
  tenTieuChuan: string;
  tenLoaiDichVu: string;
  soLo: string;
  donViSanXuat: string;
  ngaySanXuat: string;
  hanSuDung: string;
  soLuong: string;
  donViTinh: string;
  yeuCauKiemNghiem: string;
  dieuKienBaoQuan: string;
  luuMau?: boolean;
  xuatKetQua?: boolean;
  tinhTrangMau: string;
  ghiChu?: string;
  phieuDangKyMauHinhAnhs: phieuDangKyMauHinhAnhs[];
}

export interface phieuDangKyMauHinhAnhs {
  maId: string;
  maMau: string;
  base64?: string;
  ten: string;
  dinhDang: string;
  ghiChu: string;
  loaiAnh: string;
  trangThai: string;
  nguoiTao: string;
  nguoiSua: string;
  ngayTao: string;
  ngaySua: string;
}

export interface phieuDangKyMauHinhAnhs2 {
  maId?: string;
  maMau?: string;
  ten?: string;
  dinhDang?: string;
  ghiChu?: string;
  loaiAnh?: string;
  trangThai?: boolean | string;
  nguoiTao?: string;
  nguoiSua?: string | null;
  image?: File;
}
export interface Maus {
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
  donViTinh?: string;
  soLuong: number;
  yeuCauKiemNghiem: string;
  tinhTrangMau: string;
  dieuKienBaoQuan: string;
  luuMau: boolean;
  xuatKetQua: boolean;
  trangThaiNhanMau: string;
  ghiChu: string;
  nguoiTao: string;
  nguoiSua: string | null;
  ngayTao: string | null;
  ngaySua: string | null;
  maPdkMau: string;
  loaiDv: string;
  maLoaiDV: string;
  phieuDangKyMauHinhAnhs: phieuDangKyMauHinhAnhs2[];
}

export interface MauPhanCong {
  maId: string;
  tenMau: string;
  tenTieuChuan: string;
  tenDichVu: string;
  soLo: string;
  donViSanXuat: string;
  ngaySanXuat: string;
  hanSuDung: string;
  soLuong: number;
  donViTinh: string;
  trangThaiPhanCong: string;
  maPhieuDangKy: string;
  maLoaiMau: string;
  thoiGianTieuChuan: number;
  tenKhoa: string;
  maKhoa: string;
}
