export interface FormPhuLieuHoaChat {
  TenDM_PLHC: string;
  TenPLHC: string;
  TenHienThi: string;
  SoLuong: number;
  DonViTinh: string;
  SoLo: string;
  TenNhaCungCap?: string | undefined;
  DieuKienBaoQuan: string;
  NongDo: string;
  DonViNongDo: string;
  NgayHetHan: string;
  GhiChu?: string | undefined;
}

export interface PhuLieuHoaChat {
  maId: string;
  maPhieuDangKy: string;
  maPlhc: string;
  tenPlhc: string;
  tenHienThi: string;
  soLuong: number;
  donViTinh: string;
  ghiChu: string;
  ngayHetHan: string;
  tenNhaCungCap: string;
  nongDo: string;
  donViNongDo: string;
  dieuKienBaoQuan: string;
  soLo: string;
  nguoiTao: string;
  nguoiSua: string;
  ngayTao: string | null;
  ngaySua: string | null;
}
