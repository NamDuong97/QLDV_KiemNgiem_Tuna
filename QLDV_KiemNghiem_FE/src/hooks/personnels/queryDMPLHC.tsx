import { useQuery } from "@tanstack/react-query";
import danhMucPLHCServices from "../../services/personnels/danhMucPLHCServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
}

export const getDMPLHCByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await danhMucPLHCServices.getDMPLHCByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!params,
  });
};
