import { useMutation, useQuery } from "@tanstack/react-query";
import PhieuDKyDVKN_Services from "../../services/customers/PhieuDKyDVKN_Services";

interface Props {
  queryKey?: string;
  maKH?: string;
  timeFrom?: string;
  timeTo?: string;
  trangThaiID?: string;
  maTrangThaiPhieuDangKy?: string;
}

export const useGetPhieuDangKyKiemNghiemByTrangThai = (props: Props) => {
  const { queryKey, maTrangThaiPhieuDangKy, maKH } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const params = {
        maKH: maKH,
        maTrangThaiPhieuDangKy: maTrangThaiPhieuDangKy,
      };
      const response =
        await PhieuDKyDVKN_Services.getPhieuDangKyKiemNghiemByTrangThai(params);
      return response;
    },
  });
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
  const { queryKey } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (paramsPhieuDangKyDVKN: FormData) => {
      const response = await PhieuDKyDVKN_Services.createPhieuDKyDVKN(
        paramsPhieuDangKyDVKN
      );
      return response;
    },
  });
};
