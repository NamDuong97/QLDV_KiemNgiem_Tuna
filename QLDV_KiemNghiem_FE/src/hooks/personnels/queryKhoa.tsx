import { useQuery } from "@tanstack/react-query";
import khoaServices from "../../services/personnels/khoa";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
}

export const queryKhoaAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await khoaServices.getKhoaAll();
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const getKhoaByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await khoaServices.getKhoaByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!params,
  });
};
