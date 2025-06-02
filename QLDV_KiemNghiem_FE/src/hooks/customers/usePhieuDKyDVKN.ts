import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import PhieuDKyDVKN_Services from "../../services/customers/PhieuDKyDVKN_Services";
import { ThoiGianTieuChuanParams } from "../../models/PhieuDangKy";

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
}

export const useGetPhieuDangKyKiemNghiemByTrangThai = (props: Props) => {
  const { queryKey, maKH } = props;
  const trangThaiIDs = ["TT01", "TT02", "TT03", "TT04", "TT05"];
  const results = useQueries({
    queries: trangThaiIDs.map((id) => ({
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
    })),
  });
  return {
    data: results.flatMap((r) => r || []),
    isLoading: results.some((r) => r.isLoading),
  };
};

export const useGetDmMauAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getDmMauAll();
      return response;
    },
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
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getLoaiMauAll();
      return response;
    },
  });
};

export const useGetTieuChuanAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getTieuChuanAll();
      return response;
    },
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
  const { queryKey, onSettled } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (paramsPhieuDangKyDVKN: FormData) => {
      const response = await PhieuDKyDVKN_Services.createPhieuDKyDVKN(
        paramsPhieuDangKyDVKN
      );
      if (response !== 200) return console.log("Lỗi Server");
      return response;
    },
    onSuccess: (response: any) => {
      if (response !== 200) console.log("Lỗi Server");
    },
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
