export const typeConformationColor: any = {
  error: {
    bgColor: "bg-red-600",
    textColor: "text-white",
    textIconColor: "text-red-600",
    bgIconColor: "bg-red-100",
    hoverTextColor: "bg-red-700",
  },
  warning: {
    bgColor: "bg-yellow-600",
    textColor: "text-white",
    textIconColor: "text-yellow-600",
    bgIconColor: "bg-yellow-100",
    hoverTextColor: "bg-yellow-700",
  },
  infor: {
    bgColor: "bg-indigo-600",
    textColor: "text-white",
    textIconColor: "text-indigo-600",
    bgIconColor: "bg-indigo-100",
    hoverTextColor: "bg-indigo-700",
  },
  success: {
    bgColor: "bg-green-600",
    textColor: "text-white",
    textIconColor: "text-green-600",
    bgIconColor: "bg-green-100",
    hoverTextColor: "bg-indigo-700",
  },
};

export enum TypeConformation {
  Error = "error",
  Warning = "warning",
  Info = "infor",
  Success = "success",
}
