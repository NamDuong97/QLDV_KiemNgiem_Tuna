import { useQueries } from "@tanstack/react-query";
import QuanlyPhieuDKYKNServices from "../../../services/personnels/quanlyPhieuDKYKN";

interface Props {
  queryKey: string;
  params: any[];
  onSettled?: any;
}

export const listPhieuDKKM_BLD = (props: Props) => {
  const { queryKey, params } = props;
  const results = useQueries({
    queries: params.map((trangThaiID: any) => ({
      queryKey: [queryKey, trangThaiID],
      queryFn: async () => {
        const response = await QuanlyPhieuDKYKNServices.quanLyPhieuDKKN(
          trangThaiID
        );
        return response?.data ?? [];
      },
      staleTime: Infinity,
      cacheTime: Infinity,
    })),
  });
  const allData = results.flatMap((result) => result.data ?? []);

  const isLoading = results.some((r) => r.isLoading);

  return { data: allData, isLoading };
};
