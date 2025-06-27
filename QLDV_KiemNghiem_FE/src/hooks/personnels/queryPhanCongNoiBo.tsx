import { useQuery } from "@tanstack/react-query";
import phanCongNoiBoServices from "../../services/personnels/phanCongNoiBoServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
}

export const queryPhanCongNoiBoAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await phanCongNoiBoServices.getPhanCongNoiBoAll();
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
