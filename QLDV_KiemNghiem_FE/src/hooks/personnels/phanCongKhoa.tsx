import { useMutation, useQuery } from "@tanstack/react-query";
import phanCongKhoaServices from "../../services/personnels/phanCongKhoa";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  onSuccess?: any;
  onError?: any;
}

export const createPhieuPhanCongKhoa = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanCongKhoaServices.createPhieuPhanCongKhoa(
        params
      );
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const getPhanCongKhoaCMAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await phanCongKhoaServices.getPhanCongKhoaCMAll(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!params,
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
    enabled: !!params,
  });
};

export const getAllDanhSachMau = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await phanCongKhoaServices.getAllDanhSachMau(params);
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 7 * 60 * 1000,
    enabled: !!params,
    placeholderData: (prev) => prev
  });
};

export const useTruongPhongDuyet = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanCongKhoaServices.truongPhongDuyet(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const useBLDDuyet = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanCongKhoaServices.BLDDuyet(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};
