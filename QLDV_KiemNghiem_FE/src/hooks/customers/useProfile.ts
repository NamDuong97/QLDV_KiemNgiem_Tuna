import { useMutation } from "@tanstack/react-query";
import profileServices from "../../services/customers/profile";

interface Props {
  queryKey: string;
  onSuccess?: any;
  onError?: any;
}

export const updateInfor = (props: Props) => {
  const { queryKey, onSuccess, onError } = props;
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await profileServices.updateInfor(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const doiMatKhau = (props: Props) => {
  const { queryKey, onSuccess, onError } = props;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await profileServices.doiMatKhau(params);
      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};
