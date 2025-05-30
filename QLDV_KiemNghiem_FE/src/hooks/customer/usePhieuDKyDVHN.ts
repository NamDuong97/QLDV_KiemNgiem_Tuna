import { useQuery } from "@tanstack/react-query";
import PhieuDKyDVKN_Services from "../../services/customer/PhieuDKyDVKN_Services";

interface Props {
  queryKey?: string;
}

export const usePhieuDKyDVHNALL = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await PhieuDKyDVKN_Services.getAllPhieuDKyDVKN();
      return response;
    },
  });
};
