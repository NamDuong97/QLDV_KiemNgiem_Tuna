import { useMutation, useQuery } from "@tanstack/react-query";
import phanCongNoiBoServices from "../../services/personnels/phanCongNoiBoServices";

interface Props {
  queryKey: any;
  params?: any;
  onSettled?: any;
  onSuccess?: any;
  onError?: any;
}

export const queryPhanCongNoiBoAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await phanCongNoiBoServices.getPhanCongNoiBoAll(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const queryLichSuPhanCongAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await phanCongNoiBoServices.getLichSuPhanCongAll(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const queryPhanCongNoiBoByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await phanCongNoiBoServices.getPhanCongNoiBoByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!params,
  });
};

export const queryCreatePhanCongNoiBo = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanCongNoiBoServices.createPhanCongNoiBo(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const queryUpdatePhanCongNoiBo = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanCongNoiBoServices.updatePhanCongNoiBo(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const queryPhanCongLai = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanCongNoiBoServices.phanCongLai(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const queryHuyPhanCong = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanCongNoiBoServices.huyPhanCong(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};
