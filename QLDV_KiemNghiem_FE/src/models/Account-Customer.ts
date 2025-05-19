export enum statusAccount {
  activity = "Hoạt Động",
  retired = "Đã Hủy",
}

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
