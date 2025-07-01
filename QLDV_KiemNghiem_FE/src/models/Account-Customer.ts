export enum statusAccount {
  activity = "Hoạt Động",
  retired = "Đã Hủy",
}

export const keyTag = {
  Cho_Xu_Ly: "cho-xu-ly",
  Da_Duyet: "da-duyet",
  Dang_Kiem_Nghiem: "dang-kiem-nghiem",
  Hoan_Thanh: "hoan-thanh",
  Da_Huy: "da-huy",
  Tat_Ca: "tat-ca",
  Kiem_Tra_Lai: "kiem-tra-lai",
  Nhan_Vien_Duỵet: "nhan-vien-duyet",
  Ban_Lanh_Dao_Duyet: "BLD-duyet",
};

export interface FormAccountCustomerLogin {
  email: string;
  password: string;
}

export interface FormAccountCustomerSignUp {
  tenKh: string;
  email: string;
  matKhau: string;
  xacNhanMatKhau: string;
  soDienThoai: string;
  diaChi: string;
  tenNguoiDaiDien: string;
}

export interface RequestCustomerSignUp {
  tenKh: string;
  email: string;
  matKhau: string;
  soDienThoai: string;
  diaChi: string;
  tenNguoiDaiDien: string;
}

export interface FormAccountCustomerRepassword {
  username: string;
}

export interface FormAccountCustomerResetPassword {
  password: string;
  rePassword: string;
}
