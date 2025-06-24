import { useMutation, useQuery } from "@tanstack/react-query";
import QuanlyPhieuDKYKNServices from "../../services/personnels/quanlyPhieuDKYKN";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  activeFilter?: any;
}

export const listPhieuDKKNAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await QuanlyPhieuDKYKNServices.quanLyPhieuDKKN(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const listPhieuDKKM = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await QuanlyPhieuDKYKNServices.quanLyPhieuDKKN(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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
    staleTime: Infinity,
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
