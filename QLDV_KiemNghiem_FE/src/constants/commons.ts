export const API = {
  ADMIN: {},
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
  },
};
