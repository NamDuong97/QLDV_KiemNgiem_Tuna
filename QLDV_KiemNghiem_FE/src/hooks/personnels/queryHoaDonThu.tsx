import { useQuery, useMutation } from "@tanstack/react-query";
import hoaDonThuServices from "../../services/personnels/hoaDonThuServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: (data: any, error: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
}

// --------- useQuery hooks ---------

export const useQueryHoaDonThuAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await hoaDonThuServices.getAll(params);
      return response?.data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useQueryHoaDonThuByGuest = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await hoaDonThuServices.getByGuest(params);
      return response?.data;
    },
    enabled: !!params,
    refetchOnWindowFocus: false,
  });
};

export const useQueryHoaDonThuByID = (
  props: Props & { maHoaDonThu: string }
) => {
  const { queryKey, maHoaDonThu } = props;
  return useQuery({
    queryKey: [queryKey, maHoaDonThu],
    queryFn: async () => {
      const response = await hoaDonThuServices.getByID(maHoaDonThu);
      return response?.data;
    },
    enabled: !!maHoaDonThu,
    refetchOnWindowFocus: false,
  });
};

export const useQueryHoaDonBoSungAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await hoaDonThuServices.getHoaDonBoSungAll(params);
      return response?.data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useQueryHoaDonBoSungByID = (
  props: Props & { maHoaDonThuBoSung: string }
) => {
  const { queryKey, maHoaDonThuBoSung } = props;
  return useQuery({
    queryKey: [queryKey, maHoaDonThuBoSung],
    queryFn: async () => {
      const response = await hoaDonThuServices.getHoaDonBoSungByID(
        maHoaDonThuBoSung
      );
      return response?.data;
    },
    enabled: !!maHoaDonThuBoSung,
    refetchOnWindowFocus: false,
  });
};

// --------- useMutation hooks ---------

export const useDeleteHoaDonThu = (props: Props) => {
  const { queryKey, onSuccess, onError, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (maHoaDonThu: string) => hoaDonThuServices.delete(maHoaDonThu),
    onSuccess,
    onError,
    onSettled,
  });
};

export const useDeleteHoaDonBoSung = (props: Props) => {
  const { queryKey, onSuccess, onError, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (maHoaDonThuBoSung: string) =>
      hoaDonThuServices.deleteHoaDonBoSung(maHoaDonThuBoSung),
    onSuccess,
    onError,
    onSettled,
  });
};

export const useCreateHoaDonBoSung = (props: Props) => {
  const { queryKey, onSuccess, onError, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: any) => hoaDonThuServices.createHoaDonBoSung(data),
    onSuccess,
    onError,
    onSettled,
  });
};

export const useUpdateHoaDonBoSung = (props: Props) => {
  const { queryKey, onSuccess, onError, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: any) => hoaDonThuServices.updateHoaDonBoSung(data),
    onSuccess,
    onError,
    onSettled,
  });
};

export const useUpdateHoaDonThu = (props: Props) => {
  const { queryKey, onSuccess, onError, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: any) => hoaDonThuServices.updateHoaDonThu(data),
    onSuccess,
    onError,
    onSettled,
  });
};
