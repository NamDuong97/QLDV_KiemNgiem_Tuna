import { useQuery } from "@tanstack/react-query";
import PhieuDKyDVKN_Services from "../../services/customers/PhieuDKyDVKN_Services";

interface Props {
  queryKey?: string;
  maKH?: string;
  timeFrom?: string;
  timeTo?: string;
  trangThaiID?: string;
}

export const usePhieuDKyDVKNALL = (props: Props) => {
  const { queryKey, trangThaiID, maKH, timeFrom, timeTo } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const params = {
        trangThaiID: trangThaiID,
        maKH: maKH,
        timeFrom: timeFrom,
        timeTo: timeTo,
      };
      const response = await PhieuDKyDVKN_Services.getAllPhieuDKyDVKN(params);
      return response;
    },
  });
};
