export const API = {
  ADMIN: {
    DANG_NHAP: "/api/nhanvien/loginNhanVien",
    NHAN_VIEN: {
      GET_INFOR_NHAN_VIEN: "/api/nhanvien/getNhanVienByID",
      GET_NHAN_VIEN_ALL: "/api/nhanvien/getNhanVienByID",
    },
    PHIEU_DKY_DVKM: {
      QUAN_LY_PHIEU_DKY_DVKM: "/api/phieudangky/getPhieuDangKyAll",
      XEM_CHI_TIET: "/api/phieudangky/findPhieuDangKy?maPhieuDangKy=",
      DANH_GIA_NHANVIEN: "/api/PhieuDangKy/reviewPhieuDangKyByKHDT",
      DANH_GIA_BLD: "/api/PhieuDangKy/reviewPhieuDangKyByBLD",
    },
    KHOA: {
      GET_KHOA_ALL: "/api/Khoa/getKhoaAll",
      GET_KHOA_BY_ID: "/api/Khoa/getKhoaByID?maKhoa=",
    },
    PHIEU_PHIEU_DE_XUAT_PHONG_BAN: {
      CREATE_PHIEU_PHIEU_DE_XUAT_PHONG_BAN:
        "/api/PhieuPhieuDeXuatPhongBan/createPhieuPhieuDeXuatPhongBan",
      GET_PHAN_CONG_KHOA_CHUYEN_MON_ALL:
        "/api/PhieuPhieuDeXuatPhongBan/getPhieuPhieuDeXuatPhongBanAll",
      GET_PHAN_CONG_KHOA_CHUYEN_MON_BY_ID:
        "/api/PhieuPhieuDeXuatPhongBan/getPhieuPhieuDeXuatPhongBanByID?maPhieuPhieuDeXuatPhongBan=",
      GET_DANH_SACH_MAU_All: "/api/PhieuDangKyMau/getPhieuDangKyMauAll",
    },
  },
  CUSTOMER: {
    PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM: {
      CREATE_PHIEU_DANG_KY: "/api/phieudangky/createPhieuDangKy",
      CREATE_DANH_MUC_MAU: "/api/dmmau/createDmMau",
      CREATE_TRANG_THAI: "/api/tieuchuan/createTieuChuan",
      CREATE_DANH_MUC_PLHC: "/api/dmphulieuhoachat/createDmPhuLieuHoaChat",
      GET_ALL_PHIEU_DANG_KY_BY_TRANG_THAI:
        "/api/phieudangky/getPhieuDangKiesOfCustomer",
      GET_DANH_MUC_MAU_ALL: "/api/dmmau/getDmMauAll",
      GET_LOAI_DICH_VU_ALL: "/api/loaidichvu/getLoaiDichVuAll",
      GET_TRANG_THAI_DKY_ALL: "/api/trangthaiphieudk/getTrangThaiPhieuDkAll",
      GET_TIEU_CHUAN_ALL: "/api/tieuchuan/getTieuChuanAll",
      GET_LOAI_MAU_ALL: "/api/loaimau/getLoaiMauAll",
      GET_DANH_MUC_PLHC: "/api/dmphulieuhoachat/getDmPhuLieuHoaChatAll",
      GET_THOI_GIAN_TIEU_CHUAN: "/api/phieudangky/duTinhThoiGianKiemNghiem",
      GET_LOC_PHIEU_DANG_KY_BY_TRANG_THAI: "/api/phieudangky/getPhieuDangKyAll",
    },
    UPDATE_PHIEU_DANG_KY: "/api/phieudangky/updatePhieuDangKy",
    HUY_PHIEU_DANG_KY: "/api/phieudangky/deletePhieuDangKy",
    DANG_NHAP: "/api/KhachHang/loginKhachHang",
    DANG_KY: "/api/khachhang/createKhachHang",
    USER_INFO: "/api/khachhang/getInfoKhachHang",
    QUEN_MAT_KHAU: "/api/khachhang/forgetPassword",
    REFRESH_TOKEN_KHACH_HANG: "/api/khachhang/getRefreshToken",
    REFRESH_TOKEN_TRUNG_TAM: "/api/nhanvien/getRefreshToken",
    UPDATE_INFOR: "/api/khachhang/updateKhachHang",
    DOI_MAT_KHAU: "/api/khachhang/updateKhachHang",
  },
};

export const ACCESS_TOKEN = "ACCESS_TOKEN_APP";
export const REFRESH_TOKEN = "REFRESH_TOKEN_APP";

export enum EKey {
  TOKEN = "token",
  REFRESH_TOKEN = "refresh_token",
  TOKEN_GUEST = "token_guest",
  REFRESH_TOKEN_GUEST = "refresh_token_guest",
  ID = "id",
}
