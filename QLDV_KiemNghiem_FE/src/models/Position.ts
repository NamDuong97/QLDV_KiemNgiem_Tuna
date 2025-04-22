export enum statusPosition {
  activity = "Hoạt Động",
  canceled = "Đã Hủy",
}

export interface PositionManager {
  positionID?: string;
  positionName?: string;
  idPersonCreate?: string;
  idPersonEdit?: string;
  statusPosition?: statusPosition;
}

export interface FormPositionCreate {
  positionID: string;
  positionName: string;
  idPersonCreate: string;
  statusPosition: string;
}
export interface FormPositionEdit {
  positionID: string;
  positionName: string;
  idPersonEdit: string;
  statusPosition: string;
}
