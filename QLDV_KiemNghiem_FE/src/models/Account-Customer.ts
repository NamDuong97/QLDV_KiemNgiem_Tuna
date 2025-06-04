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
};

export interface FormAccountCustomerLogin {
  username: string;
  password: string;
}

export interface FormAccountCustomerSignUp {
  tenKH: string;
  email: string;
  username: string;
  password: string;
  rePassword: string;
}

export interface FormAccountCustomerRepassword {
  username: string;
}

export interface FormAccountCustomerResetPassword {
  password: string;
  rePassword: string;
}
