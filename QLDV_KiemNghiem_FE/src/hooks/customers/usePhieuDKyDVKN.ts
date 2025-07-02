import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import PhieuDKyDVKN_Services from "../../services/customers/PhieuDKyDVKN_Services";
import { ThoiGianTieuChuanParams } from "../../models/PhieuDangKy";
import { useStoreNotification } from "../../configs/stores/useStoreNotification";

interface Props {
  queryKey?: string;
  maKH?: string;
  timeFrom?: string;
  timeTo?: string;
  trangThaiID?: string;
  maTrangThaiPhieuDangKy?: string;
  onSettled?: (response: any) => void;
  maTieuChuan?: string;
  maDmMau?: string;
  onSuccess?: (response: any) => void;
  onError?: (errors: any) => void;
  options?: any;
  trangThaiIDs?: any;
  handleClickOpenPopupNofitication?: () => void;
}

export const useGetPhieuDangKyKiemNghiemByTrangThaiArray = (props: Props) => {
  const { queryKey, maKH, trangThaiIDs } = props;

  const results = useQueries({
    queries: trangThaiIDs.map((id: any) => ({
      queryKey: [queryKey, id],
      queryFn: async () => {
        const params = {
          maKH: maKH,
          maTrangThaiPhieuDangKy: id,
        };

        const response =
          await PhieuDKyDVKN_Services.getPhieuDangKyKiemNghiemByTrangThai(
            params
          );
        return response;
      },
      staleTime: Infinity,
      cacheTime: Infinity,
    })),
  });
  const allData = results.flatMap((result) => result.data ?? []);

  const isLoading = results.some((r) => r.isLoading);

  return { data: allData, isLoading };
};

export const useGetDmMauAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getDmMauAll();
      return response;
    },
    staleTime: Infinity,
  });
};

export const useGetDmPhuLieuHoaChatAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getDmPhuLieuHoaChatAll();
      return response;
    },
    staleTime: Infinity,
  });
};

export const useGetLoaiDichVuAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getLoaiDichVuAll();
      return response;
    },
  });
};

export const useGetLoaiMauAll = (props: Props) => {
  const { queryKey, options } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getLoaiMauAll();
      return response;
    },
    ...options,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetTieuChuanAll = (props: Props) => {
  const { queryKey, options } = props;

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getTieuChuanAll();
      return response;
    },
    ...options,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetTrangThaiPhieuDkAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getTrangThaiPhieuDkAll();
      return response;
    },
  });
};

export const useCreatePhieuDKyDVKN = (props: Props) => {
  const { queryKey, onSettled, handleClickOpenPopupNofitication } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (paramsPhieuDangKyDVKN: FormData) => {
      const response = await PhieuDKyDVKN_Services.createPhieuDKyDVKN(
        paramsPhieuDangKyDVKN
      );
      return response;
    },
    onSuccess: (response: any) => {
      if (response.status !== 200)
        showNotification({ message: "Lỗi Server", status: 400 });
      else handleClickOpenPopupNofitication?.();
    },
    onSettled: onSettled,
  });
};

export const useCreateDmMau = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await PhieuDKyDVKN_Services.createDmMau(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const useCreateTieuChuan = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await PhieuDKyDVKN_Services.createTieuChuan(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const useCreateDmPhuLieuHoaChat = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await PhieuDKyDVKN_Services.createDmPhuLieuHoaChat(
        params
      );
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const useGetThoiGianTieuChuan = (props: Props) => {
  const { queryKey, maTieuChuan, maDmMau } = props;
  return useQuery({
    queryKey: [queryKey, maTieuChuan, maDmMau],
    queryFn: async () => {
      if (maDmMau && maTieuChuan) {
        let params: ThoiGianTieuChuanParams = {
          maDmMau: maDmMau,
          maTieuChuan: maTieuChuan,
        };
        const response = await PhieuDKyDVKN_Services.getThoiGianTieuChuan(
          params
        );

        return response;
      }
      return null;
    },
  });
};

export const useUpdatePhieuDangKy = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await PhieuDKyDVKN_Services.updatePhieuDangKy(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const useHuyPhieuDangKy = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await PhieuDKyDVKN_Services.HuyPhieuDangKy(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export const useGetLocPhieuDky = (props: Props) => {
  const { queryKey, maKH, trangThaiID, timeFrom, timeTo } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const params = {
        maKH: maKH,
        timeFrom: timeFrom,
        timeTo: timeTo,
        trangThaiID: trangThaiID,
      };
      const response = await PhieuDKyDVKN_Services.getLocPhieuDky(params);
      return response;
    },
  });
};
