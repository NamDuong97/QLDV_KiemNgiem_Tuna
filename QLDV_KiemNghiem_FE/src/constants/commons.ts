export const API = {
  ADMIN: {},
  CUSTOMER: {
    PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM: {
      CREATE_PHIEU_DANG_KY: "/api/phieudangky/createPhieuDangKy",
      GET_ALL_PHIEU_DANG_KY_BY_TRANG_THAI: "/api/phieudangky/getPhieuDangKiesOfCustomer",
      GET_DANH_MUC_MAU_ALL: "/api/dmmau/getDmMauAll",
      GET_LOAI_DICH_VU_ALL: "/api/loaidichvu/getLoaiDichVuAll",
      GET_TRANG_THAI_DKY_ALL: "/api/trangthaiphieudk/getTrangThaiPhieuDkAll",
      GET_TIEU_CHUAN_ALL: "/api/tieuchuan/getTieuChuanAll",
      GET_LOAI_MAU_ALL: "/api/loaimau/getLoaiMauAll",
      GET_DANH_MUC_PLHC: "/api/dmphulieuhoachat/getDmPhuLieuHoaChatAll",
    },
  },
};
