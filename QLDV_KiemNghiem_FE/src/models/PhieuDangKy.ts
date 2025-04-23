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
  KetQuaTiengViet?: number;
  KetQuaTiengAnh?: number;
  NgayGiaoMau: string;
}
