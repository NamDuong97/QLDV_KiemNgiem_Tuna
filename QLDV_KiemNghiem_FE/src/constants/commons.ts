export const API = {
  ADMIN: {
    DANG_NHAP: "/api/nhanvien/loginNhanVien",
    NHAN_VIEN: {
      GET_INFOR_NHAN_VIEN: "/api/nhanvien/getNhanVienByID",
      GET_NHAN_VIEN_BY_ID: "/api/nhanvien/getNhanVienByID",
      GET_NHAN_VIEN_ALL: "/api/NhanVien/getNhanVienAll",
    },
    PHIEU_DKY_DVKM: {
      QUAN_LY_PHIEU_DKY_DVKM: "/api/phieudangky/getPhieuDangKyAll",
      XEM_CHI_TIET: "/api/PhieuDangKy/findPhieuDangKy?maPhieuDangKy=",
      DANH_GIA_NHANVIEN: "/api/PhieuDangKy/reviewPhieuDangKyByKHDT",
      DANH_GIA_BLD: "/api/PhieuDangKy/reviewPhieuDangKyByBLD",
      UNDO_DANH_GIA_BLD: "/api/PhieuDangKy/undoReviewPhieuDangKyByBLD",
      THONG_KE: "/api/PhieuDangKy/getPhieuDangKyThongKe",
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
    CHI_TIET_PHAN_CONG_KHOA: {
      TRUONG_PHONG_DUYET_MAUS:
        "/api/ChiTietPhieuDeXuatPhongBan/reviewChiTietPhieuDeXuatPhongBanByPhongKhoa",
      BLD_DUYET_MAUS:
        "/api/ChiTietPhieuDeXuatPhongBan/reviewChiTietPhieuDeXuatPhongBanByBLD",
    },
    CHUC_VU: {
      GET_CHUC_VU_BY_ID: "/api/ChucVu/getChucVuByID",
    },
    MAUS: {
      GET_MAU_ALL: "/api/PhieuDangKyMau/getPhieuDangKyMauAll",
      GET_MAU_BY_ID: "/api/PhieuDangKyMau/getPhieuDangKyMau",
      GET_LOAI_MAU_ALL: "/api/LoaiMau/getLoaiMauAll",
      GET_LOAI_MAU_BY_ID: "/api/LoaiMau/getLoaiMau",
      HUY_MAU: "/api/PhieuDangKyMau/cancelPhieuDangKyMau",
      THONG_KE_MAUS: "/api/PhieuDangKyMau/getPhieuDangKyMauThongKe",
    },
    MAUS_LUU: {
      GET_MAUS_LUU_ALL: "/api/PhieuLuuMau/getPhieuLuuMauAll",
      GET_MAUS_LUU_BY_ID: "/api/PhieuLuuMau/getPhieuLuuMauByID",
      CREATE_MAUS_LUU: "/api/PhieuLuuMau/createPhieuLuuMau",
      UPDATE_MAUS_LUU: "/api/PhieuLuuMau/updatePhieuLuuMau",
      DELETE_MAUS_LUU: "/api/PhieuLuuMau/deletePhieuLuuMau",
    },
    PHAN_CONG_NOI_BO: {
      GET_ALL: "/api/PhanCongNoiBo/getPhanCongNoiBoAll",
      GET_BY_ID: "/api/PhanCongNoiBo/getPhanCongNoiBoByID",
      CREATE: "/api/PhanCongNoiBo/createPhanCongNoiBo",
      UPDATE: "/api/PhanCongNoiBo/updatePhanCongNoiBo",
      PHAN_CONG_LAI: "/api/PhanCongNoiBo/reassignPhanCongNoiBo",
      HUY_PHAN_CONG: "/api/PhanCongNoiBo/deletePhanCongNoiBo",
      LICH_SU_PHAN_CONG: "/api/LichSuPhanCong/getLichSuPhanCongAll",
    },
    DU_TRU: {
      GET_DU_TRU_ALL: "/api/PhieuDuTru/getPhieuDuTruAll",
      GET_DU_TRU_BY_ID: "/api/PhieuDuTru/getPhieuDuTruByID",
      CREATE_DU_TRU: "/api/PhieuDuTru/createPhieuDuTru",
      UPDATE_DU_TRU: "/api/PhieuDuTru/updatePhieuDuTru",
      DELETE_DU_TRU: "/api/PhieuDuTru/deletePhieuDuTru",
      DUYET_DU_TRU: "/api/PhieuDuTru/reviewPhieuDuTruByLDP",
      LAM_LAI_PHIEU: "/api/PhieuDuTru/requestReviewAgainPhieuDuTru",
    },
    PHAN_TICH_KET_QUA: {
      GET_PHAN_TICH_KET_QUA_ALL:
        "/api/PhieuPhanTichKetQua/getPhieuPhanTichKetQuaAll",
      GET_PHAN_TICH_KET_QUA_BY_ID:
        "/api/PhieuPhanTichKetQua/getPhieuPhanTichKetQuaByID",
      CREATE_PHAN_TICH_KET_QUA:
        "/api/PhieuPhanTichKetQua/createPhieuPhanTichKetQua",
      UPDATE_PHAN_TICH_KET_QUA:
        "/api/PhieuPhanTichKetQua/updatePhieuPhanTichKetQua",
      REVIEW_PHAN_TICH_KET_QUA_LDP:
        "/api/PhieuPhanTichKetQua/reviewPhieuPhanTichKetQuaByLDP",
      REVIEW_PHAN_TICH_KET_QUA_BLD:
        "/api/PhieuPhanTichKetQua/reviewPhieuPhanTichKetQuaByBLD",
      DELETE_PHAN_TICH_KET_QUA:
        "/api/PhieuPhanTichKetQua/deletePhieuPhanTichKetQua",
      REVIEW_PHAN_TICH_KET_QUA_CUSTOMER:
        "/api/PhieuPhanTichKetQua/reviewPhieuPhanTichKetQuaByCustomer",
    },
    CHI_TIEU: {
      GET_CHI_TIEU_ALL: "/api/ChiTieu/getChiTieuAll",
    },
    HOA_DON_THU: {
      GET_ALL: "/api/HoaDonThu/getHoaDonThuAll",
      GET_BY_GUEST: "/api/HoaDonThu/getHoaDonThuOfCustomer?maKH=",
      GET_BY_ID: "/api/HoaDonThu/getHoaDonThuByID?maHoaDonThu=",
      DELETE: "/api/HoaDonThu/deleteHoaDonThu?maHoaDonThu=",
      HOA_DON_BO_SUNG: {
        GET_ALL: "/api/HoaDonThuBoSung/getHoaDonThuBoSungAll",
        GET_BY_ID:
          "/api/HoaDonThuBoSung/getHoaDonThuBoSungByID?maHoaDonThuBoSung=",
        DELETE: "/api/HoaDonThuBoSung/deleteHoaDonThuBoSung?maHoaDonThuBoSung=",
        CREATE: "/api/HoaDonThuBoSung/createHoaDonThuBoSung",
        UPDATE: "/api/HoaDonThuBoSung/updateHoaDonThuBoSung",
      },
    },
    TIEN_DO: {
      GET_ALL: "/api/PhieuTienDoLamViec/getPhieuTienDoLamViecAll",
      GET_BY_ID:
        "/api/PhieuTienDoLamViec/getPhieuTienDoLamViecByID?maPhieuTienDoLamViec=",
      CREATE: "/api/PhieuTienDoLamViec/createPhieuTienDoLamViec",
      NHAN_XET: "/api/PhieuTienDoLamViec/reviewPhieuTienDoLamViec",
      DELETE:
        "/api/PhieuTienDoLamViec/deletePhieuTienDoLamViec?maPhieuTienDoLamViec=",
    },
    DM_PLHC: {
      GET_BY_ID: "/api/DmPhuLieuHoaChat/findDmPhuLieuHoaChat?id=",
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
  ID = "id",
}
