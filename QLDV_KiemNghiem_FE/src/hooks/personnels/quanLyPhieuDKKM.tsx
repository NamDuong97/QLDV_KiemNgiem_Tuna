import { useMutation, useQuery } from "@tanstack/react-query";
import QuanlyPhieuDKYKNServices from "../../services/personnels/quanlyPhieuDKYKN";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  activeFilter?: any;
  onSuccess?: any;
  onError?: any;
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
    staleTime: 5 * 60 * 1000,
    enabled: !!params,
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
    enabled: !!params,
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

export const useUndoDanhGiaBLD = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await QuanlyPhieuDKYKNServices.UndoDanhGiaBLD(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const ThongKePhieuDky = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await QuanlyPhieuDKYKNServices.ThongKePhieuDky();
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const mutationUploadFile = (props: Props) => {
  const { queryKey, onSuccess } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: FormData) => {
      const response = await QuanlyPhieuDKYKNServices.uploadFile(params);
      console.log("responseresponse", response);
      return response;
    },
    onSuccess: onSuccess,
  });
};
