export enum statusDepartment {
  activity = "Hoạt Động",
  canceled = "Đã Hủy",
}

export interface Department {
  departmentID: string;
  departmentName: string;
  userCreate: string;
  userEdit?: string;
  status: string;
}

export interface FormDepartmentCreate {
  departmentID: string;
  departmentName: string;
  userCreate: string;
  statusDepartment: string;
}

export interface FormDepartmentEdit {
  departmentID: string;
  departmentName: string;
  userEdit: string;
  statusDepartment: string;
}
