import { useMutation, useQuery } from "@tanstack/react-query";
import mauLuuServices from "../../services/personnels/mauLuuServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  onSuccess?: any;
  onError?: any;
}

export const queryMauLuuAll = (props: Props) => {
  const { queryKey } = props;
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await mauLuuServices.getMauLuuAll();
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const getMauLuuByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await mauLuuServices.getMauLuuByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!params,
  });
};

export const createMauLuu = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await mauLuuServices.createMauLuu(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};
