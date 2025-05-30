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

export interface FormPhuLieuHoaChat2 {
  maPhieuDangKy: string;
  maPlhc: string;
  tenPlhc: string;
  tenHienThi: string;
  soLuong: number;
  donViTinh: string;
  ghiChu: string;
  ngayHetHan: string;
  tenNhaCungCap: string;
  soLo: string;
  nguoiTao: string;
  nguoiSua: string | null;
  ngayTao: string;
  ngaySua: string | null;
}
