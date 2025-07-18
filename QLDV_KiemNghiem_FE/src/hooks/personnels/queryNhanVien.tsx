import { useQuery } from "@tanstack/react-query";
import nhanVienServices from "../../services/personnels/nhanVienServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  onSuccess?: any;
  onError?: any;
}

export const queryNhanVienALL = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await nhanVienServices.getNhanVienAll(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!params,
  });
};
