import { useQuery } from "@tanstack/react-query";
import chiTieuServices from "../../services/personnels/chiTieuServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
}

export const queryChiTieuAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await chiTieuServices.getChiTieuAll();
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
