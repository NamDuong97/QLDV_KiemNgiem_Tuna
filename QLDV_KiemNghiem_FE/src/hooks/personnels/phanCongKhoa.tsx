import { useMutation, useQuery } from "@tanstack/react-query";
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

export const getPhanCongKhoaCMAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await phanCongKhoaServices.getPhanCongKhoaCMAll();
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const getPhanCongKhoaCMByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await phanCongKhoaServices.getPhanCongKhoaCMByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const getAllDanhSachMau = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await phanCongKhoaServices.getAllDanhSachMau(params);
      const paginationRaw = response.headers["x-pagination"];
      const pagination = paginationRaw ? JSON.parse(paginationRaw) : null;
      return { data: response?.data, pagination };
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
