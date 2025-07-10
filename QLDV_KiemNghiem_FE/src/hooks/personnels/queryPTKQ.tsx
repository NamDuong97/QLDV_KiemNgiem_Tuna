import { useMutation, useQuery } from "@tanstack/react-query";
import phanTichKetQuaServices from "../../services/personnels/phanTichKetQua";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  onSuccess?: any;
  onError?: any;
}

export const queryPhanTichKetQuaAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await phanTichKetQuaServices.getPhanTichKetQuaAll(
        params
      );
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!params,
  });
};

export const getPhanTichKetQuaByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await phanTichKetQuaServices.getPhanTichKetQuaByID(
        params
      );
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!params,
  });
};

export const createPhanTichKetQua = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanTichKetQuaServices.createPhanTichKetQua(
        params
      );
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const updatePhanTichKetQua = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanTichKetQuaServices.updatePhanTichKetQua(
        params
      );
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const duyetPhanTichKetQuaLDP = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanTichKetQuaServices.duyetPhanTichKetQuaLDP(
        params
      );
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const duyetPhanTichKetQuaBLD = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanTichKetQuaServices.duyetPhanTichKetQuaBLD(
        params
      );
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const duyetPhanTichKetQuaCUSTOMER = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanTichKetQuaServices.duyetPhanTichKetQuaCUSTOMER(
        params
      );
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const deletePhanTichKetQua = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await phanTichKetQuaServices.deletePhanTichKetQua(
        params
      );
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};
