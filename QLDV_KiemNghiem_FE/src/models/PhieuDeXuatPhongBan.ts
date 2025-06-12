export interface FormMauPhanCong {
  tenMau: string;
  ghiChu?: string;
}
export interface FormPhieuDeXuatPhongBan {
  tenKhachHang: string;
  khoaTiepNhan: string;
  manvDeXuat: string;
  manvTiepNhan: string;
  thoiGianGiaoMau: string;
  maus: FormMauPhanCong[];
}
