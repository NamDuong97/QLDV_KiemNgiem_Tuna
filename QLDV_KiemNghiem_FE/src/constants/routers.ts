export const APP_ROUTES = {
  TUNA_ADMIN: {
    DASHBOARD: {
      to: "/tuna",
      title: "Trang Dashboard",
    },
    LOGIN: {
      to: "/tuna/login",
      title: "Login - Admin",
    },
    FORGOTPASSWORD: {
      to: "/tuna/forgot-password",
      title: "Forgot Password - Admin",
    },
    EMPLOYEE_MANAGER: {
      to: "/tuna/employee-manager",
      title: "Trang Quản Lý Nhân Viên",
    },
    POSITION_MANAGER: {
      to: "/tuna/position-manager",
      title: "Chức vụ",
    },
    CUSTOMER_MANAGER: {
      to: "/tuna/customer-manager",
      title: "Khách Hàng",
    },
    CUSTOMER_PROFILE_MANAGER: {
      to: "/tuna/customer-profile-manager",
      title: "Quản Lý Hồ Sơ Khách Hàng",
    },
    DEPARTMENT: {
      to: "/tuna/department-manager",
      title: "Quản Lý Khoa",
    },
    DIVISION: {
      to: "/tuna/division-manager",
      title: "Quản Lý Bộ Phận",
    },
    ACCOUNT_TYPE: {
      to: "/tuna/account-type",
      title: "Quản Lý Loại Tài Khoản",
    },
    ACCOUNT: {
      to: "/tuna/account",
      title: "Quản Lý Tài Khoản",
    },
    QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM: {
      to: "/tuna/quan-ly-phieu-dang-ky-dich-vu-kiem-nghiem",
      title: "Quản Lý Phiếu đăng ký dịch vụ kiểm nghiệm",
      id: "/tuna/quan-ly-phieu-dang-ky-dich-vu-kiem-nghiem/:id",
    },
    LIST_PHAN_CONG_PHONG_CHUYEN_MON: {
      to: "/tuna/danh-sach-phan-cong-phong-chuyen-mon",
      id_cho_xet_duyet:
        "/tuna/danh-sach-phan-cong-phong-chuyen-mon/cho-xet-duyet",
      id_xem_chi_tiet:
        "/tuna/danh-sach-phan-cong-phong-chuyen-mon/xem-chi-tiet",
    },
    QUAN_LY_PHAN_CONG_KHOA_CHUYEN_MON: {
      to: "/tuna/quan-ly-phan-cong-khoa-chuyen-mon",
      id_xem_chi_tiet: "/tuna/quan-ly-phan-cong-khoa-chuyen-mon/xem-chi-tiet",
    },
    PHAN_CONG_PHONG_CHUYEN_MON: {
      to: "/tuna/phan-cong-phong-chuyen-mon",
    },
  },
  TUNA_CUSTOMER: {
    HOME: {
      to: "/",
      title: "Trang Chủ",
    },
    FORM_SIGN_UP_DVKN: {
      to: "/dang-ky-dich-vu-kiem-nghiem",
      title: "Đăng ký dịch vụ kiểm nghiệm",
    },
    CREATE_MAU: {
      to: "/dang-ky-dich-vu-kiem-nghiem/them-thong-tin-mau",
      title: "Thêm Mẫu",
    },
    Edit_MAU: {
      to: "/dang-ky-dich-vu-kiem-nghiem/cap-nhat-thong-tin-mau/:id",
      title: "Sửa Mẫu",
    },
    PHIEU_DKY_DVKN: {
      to: "/quan-ly-phieu-dang-ky-dich-vu-kiem-nghiem",
      title: "Quản lý phiếu đăng ký dịch vụ kiểm nghiệm",
    },
    EDIT_PHIEU_DKY_DVKN: {
      to: "/quan-ly-phieu-dang-ky-dich-vu-kiem-nghiem/sua-phieu-dang-ky-kiem-nghiem",
      title: "Trang sửa phiếu đăng ký dịch vụ kiểm nghiệm",
    },
    SHOW_PHIEU_DKY_DVKN: {
      to: "/chi-tiet-phieu-dang-ky-dich-vu-kiem-nghiem",
      title: "Trang sửa phiếu đăng ký dịch vụ kiểm nghiệm",
    },
    QUAN_LY_HOA_DON: {
      to: "/quan-ly-hoa-don",
      title: "Quản lý hóa đơn",
      SHOW_HOA_DON: {
        to: "/chi-tiet-hoa-don",
        title: "Trang chi chi tiết hóa đơn",
      },
      SHOW_THANH_TOAN_HOA_DON: {
        to: "/thanh-toan-hoa-don",
        title: "Trang thanh toán hóa đơn",
      },
    },
  },
};
