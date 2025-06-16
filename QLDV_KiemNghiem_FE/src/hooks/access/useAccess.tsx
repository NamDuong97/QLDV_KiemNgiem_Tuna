import { useMutation } from "@tanstack/react-query";
import { useStoreNotification } from "../../configs/stores/useStoreNotification";
import accessServices from "../../services/customers/accessService";
import { EKey } from "../../constants/commons";
import Cookies from "js-cookie";
import { useContext } from "react";
import { StoreContext } from "../../contexts/storeProvider";
import { isProd } from "../../utils/env";

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
  const { setToken, setOpenLoginCustomer } = useContext(StoreContext);
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await accessServices.loginKhachHang(params);
      return response;
    },
    onSuccess: (res: any) => {
      const { status, response } = res;
      if (status !== 200) {
        showNotification({
          message:
            response?.data?.message || "Email không tồn tại hoặc sai mật khẩu",
          status: status,
        });
        return;
      } else {
        showNotification({ message: "Đăng nhập thành công", status: 200 });
        const { token, refreshToken } = res.data;

        Cookies.set(EKey.TOKEN_GUEST, token, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        Cookies.set(EKey.REFRESH_TOKEN_GUEST, refreshToken, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        setToken(token);
        setOpenLoginCustomer(false);
      }
    },
    onError: (errors: any) => {
      return errors;
    },
    onSettled: onSettled,
  });
};

export const useQuenMatKhau = (props: Props) => {
  const { queryKey, onSettled } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await accessServices.postQuenMatKhau(params);
      return response;
    },
    onSuccess: (response: any) => {
      if (response.status !== 200) {
        showNotification({
          message: `${response.response.data}`,
          status: response.response.status,
        });
      } else return response;
    },
    onError: (errors: any) => {
      console.log("errors", errors);
    },
    onSettled: onSettled,
  });
};
