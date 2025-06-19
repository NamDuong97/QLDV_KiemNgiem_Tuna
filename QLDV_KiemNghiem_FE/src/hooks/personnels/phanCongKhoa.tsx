import { useMutation } from "@tanstack/react-query";
import phanCongKhoaServices from "../../services/personnels/phanCongKhoa";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
}

export const createPhieuPhanCongKhoa = (props: Props) => {
  const { queryKey, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanCongKhoaServices.createPhieuPhanCongKhoa(
        params
      );
      return response;
    },
    onSettled: onSettled,
  });
};
