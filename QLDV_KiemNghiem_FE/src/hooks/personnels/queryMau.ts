import { useMutation, useQuery } from "@tanstack/react-query";
import mauServices from "../../services/personnels/mausServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  onSuccess?: any;
  onError?: any;
}

export const queryLoaiMauAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await mauServices.getLoaiMauAll();
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const queryLoaiMauByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await mauServices.getLoaiMauByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!params,
  });
};

export const queryMauByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await mauServices.getMauByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useHuyMau = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await mauServices.HuyMau(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const queryThongKe = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await mauServices.getThongKe();
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const mutationLDPHoanTraMau = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await mauServices.LDPHoanTraMau(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const mutationBLDPheDuyetHoanTraMau = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await mauServices.BLDPheDuyetHoanTraMau(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};
