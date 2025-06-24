import { useQuery } from "@tanstack/react-query";
import chucVuServices from "../../services/personnels/chucVuServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
}

export const getChucVuByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await chucVuServices.getChucVuByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
