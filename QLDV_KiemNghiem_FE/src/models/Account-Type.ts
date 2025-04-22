export enum statusAccountType {
  activity = "Hoạt Động",
  canceled = "Đã Hủy",
}

export interface AccountType {
  accountTypeID: string;
  accountTypeName: string;
  userCreate: string;
  statusAccountType: statusAccountType;
}

export interface FormAccountTypeCreate {
  accountTypeID: string;
  accountTypeName: string;
  userCreate: string;
  statusAccountType: string;
}

export interface FormAccountTypeEdit {
  accountTypeID: string;
  accountTypeName: string;
  userEdit: string;
  statusAccountType: string;
}
