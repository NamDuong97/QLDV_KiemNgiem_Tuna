export enum statusDivision {
  activity = "Hoạt Động",
  canceled = "Đã Hủy",
}

export interface Division {
  divisionID: string;
  divisionName: string;
  userCreate: string;
  userEdit?: string;
  status: string;
}

export interface FormDivisionCreate {
  divisiontID: string;
  divisionName: string;
  userCreate: string;
  statusDivision: string;
}

export interface FormDivisionEdit {
  divisionID: string;
  divisionName: string;
  userEdit: string;
  statusDivision: string;
}
