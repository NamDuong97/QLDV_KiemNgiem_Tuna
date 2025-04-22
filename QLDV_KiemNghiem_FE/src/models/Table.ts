export enum Align {
  Left = "left",
  Right = "right",
  Center = "center",
  Top = "top",
  Bottom = "bottom",
}
export interface TableHeader {
  id: string;
  sort: boolean;
  label: string;
  align: Align;
}
