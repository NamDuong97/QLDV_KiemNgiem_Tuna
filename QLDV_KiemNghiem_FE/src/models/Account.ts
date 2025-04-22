export enum statusAccount {
  activity = "Hoạt Động",
  retired = "Đã Hủy",
}

export interface Account {
  idAccount?: number;
  accountName?: string;
  password?: string;
  positionName?: string;
  departmentName?: string;
  divisionName?: string;
  fullname?: string;
  statusAccount?: statusAccount;
  passwordDateUpdated?: string;
  passwordDateExpired?: string;
}

export interface FormAccount {
  accountName: string;
  password: string;
  positionName: string;
  departmentName: string;
  divisionName: string;
  fullname: string;
  statusAccount: string;
  passwordDateUpdated: string;
  passwordDateExpired: string;
}
