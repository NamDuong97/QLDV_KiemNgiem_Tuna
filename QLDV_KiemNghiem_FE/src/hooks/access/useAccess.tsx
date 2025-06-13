import { useMutation } from "@tanstack/react-query";
import { useStoreNotification } from "../../configs/stores/useStoreNotification";
import accessServices from "../../services/customers/accessService";
import { EKey } from "../../constants/commons";

interface Props {
  queryKey?: string;
  onSettled?: (response: any) => void;
}

export const useDangKyKhachHang = (props: Props) => {
  const { queryKey, onSettled } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await accessServices.dangKyKhachHang(params);
      return response;
    },
    onSuccess: (response: any) => {
      if (response.status !== 200) {
        showNotification({
          message: `${response.response.data}`,
          status: response.response.status,
        });
      } else showNotification({ message: "Đăng ký thành công", status: 200 });
    },
    onError: (errors: any) => {
      console.log("errors", errors);
    },
    onSettled: onSettled,
  });
};

export const useDangNhapKhachHang = (props: Props) => {
  const { queryKey, onSettled } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await accessServices.loginKhachHang(params);
      return response;
    },
    onSuccess: (response: any) => {
      if (response.status !== 200) {
        showNotification({
          message: `${response.response.data.message}`,
          status: response.response.status,
        });
      } else {
        showNotification({ message: "Đăng nhập thành công", status: 200 });
        localStorage.setItem(
          EKey.TOKEN_GUEST,
          JSON.stringify(response.data.data)
        );
      }
    },
    onError: (errors: any) => {
      console.log("errors", errors);
    },
    onSettled: onSettled,
  });
};
