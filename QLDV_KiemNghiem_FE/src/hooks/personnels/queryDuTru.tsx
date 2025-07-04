import { useMutation, useQuery } from "@tanstack/react-query";
import duTruServices from "../../services/personnels/duTruServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  onSuccess?: any;
  onError?: any;
}

export const queryDuTruAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await duTruServices.getDuTruAll(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!params,
  });
};

export const getDuTruByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await duTruServices.getDuTruByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!params,
  });
};

export const createDuTru = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await duTruServices.createDuTru(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const updateDuTru = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await duTruServices.updateDuTru(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const lamLaiPhieuDuTru = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await duTruServices.lamLaiPhieuDuTru(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const duyetDuTru = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await duTruServices.duyetDuTru(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const deleteDuTru = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await duTruServices.deleteDuTru(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};
