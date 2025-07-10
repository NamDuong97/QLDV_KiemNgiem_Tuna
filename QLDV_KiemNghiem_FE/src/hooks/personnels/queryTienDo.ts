import { useQuery, useMutation } from "@tanstack/react-query";
import phieuTienDoServices from "../../services/personnels/tienDoServices";

interface Props {
  queryKey: string;
  params?: any;
  onSettled?: any;
  onSuccess?: any;
  onError?: any;
}

//====== Query Hook  ======
export const useQueryPhieuTienDoAll = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await phieuTienDoServices.getAll(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useQueryPhieuTienDoByID = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await phieuTienDoServices.getByID(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

//====== Mutation Hook  ======
export const useMutationCreatePhieuTienDo = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: any) => phieuTienDoServices.create(data),
    onSettled,
    onSuccess,
    onError,
  });
};

export const useMutationNhanXetPhieuTienDo = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: any) => phieuTienDoServices.nhanXet(data),
    onSettled,
    onSuccess,
    onError,
  });
};

export const useMutationDeletePhieuTienDo = (props: Props) => {
  const { queryKey, onSettled, onSuccess, onError } = props;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (maPhieuTienDoLamViec: string) =>
      phieuTienDoServices.delete(maPhieuTienDoLamViec),
    onSettled,
    onSuccess,
    onError,
  });
};
