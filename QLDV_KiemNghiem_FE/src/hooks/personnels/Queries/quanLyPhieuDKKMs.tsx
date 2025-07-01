import { useQueries } from "@tanstack/react-query";
import QuanlyPhieuDKYKNServices from "../../../services/personnels/quanlyPhieuDKYKN";

interface Props {
  paramsList: Array<Record<string, any>>;
  queryKey: any;
}

export const quanLyPhieuDKKMs = (props: Props) => {
  const { queryKey, paramsList } = props;
  const results = useQueries({
    queries: paramsList.map((params) => ({
      queryKey: [queryKey, params],
      queryFn: async () => {
        const response = await QuanlyPhieuDKYKNServices.quanLyPhieuDKKN(params);
        return response?.data;
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!params,
    })),
  });
  const data = results.flatMap((q) => q.data ?? []);
  const isLoading = results.some((q) => q.isLoading);
  return {
    data,
    isLoading,
  };
};
