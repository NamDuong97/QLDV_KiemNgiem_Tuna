import { useMutation, useQuery } from "@tanstack/react-query";
import QuanlyPhieuDKYKNServices from "../../services/personnels/quanlyPhieuDKYKN";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
}

export const quanLyPhieuDKKM = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await QuanlyPhieuDKYKNServices.quanLyPhieuDKKN(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const xemChitietPhieuDKKM = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await QuanlyPhieuDKYKNServices.xemChitietPhieuDKKM(
        params
      );
      return response;
    },
    refetchOnWindowFocus: false,
    enabled: !!params,
  });
};

export const useDanhGiaNhanVien = (props: Props) => {
  const { queryKey, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await QuanlyPhieuDKYKNServices.DanhGiaNhanVien(params);
      return response;
    },
    onSettled: onSettled,
  });
};

export const useDanhGiaBLD = (props: Props) => {
  const { queryKey, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await QuanlyPhieuDKYKNServices.DanhGiaBLD(params);
      return response;
    },
    onSettled: onSettled,
  });
};
