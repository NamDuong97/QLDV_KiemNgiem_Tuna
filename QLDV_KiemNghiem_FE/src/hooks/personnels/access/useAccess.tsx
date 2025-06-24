import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useStoreNotification } from "../../../configs/stores/useStoreNotification";
import accessServices from "../../../services/personnels/access";
import { EKey } from "../../../constants/commons";
import { isProd } from "../../../utils/env";
import { PersonnelContext } from "../../../contexts/PersonelsProvider";
import { APP_ROUTES } from "../../../constants/routers";

interface Props {
  queryKey?: string;
  onSettled?: (response: any) => void;
  params?: any;
}

export const useDangNhapNhanVien = (props: Props) => {
  const { queryKey, onSettled } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
  const { setIsMaID } = useContext(PersonnelContext);
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await accessServices.loginPersonnel(params);
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
        window.location.href = APP_ROUTES.TUNA_ADMIN.DASHBOARD.to;
        showNotification({ message: "Đăng nhập thành công", status: 200 });
        const { token, refreshToken, maId } = res.data;
        Cookies.set(EKey.TOKEN, token, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        Cookies.set(EKey.REFRESH_TOKEN, refreshToken, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        Cookies.set(EKey.ID, maId, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        setIsMaID(maId);
      }
    },
    onError: (errors: any) => {
      return errors;
    },
    onSettled: onSettled,
  });
};

// export const useQuenMatKhau = (props: Props) => {
//   const { queryKey, onSettled } = props;
//   const showNotification = useStoreNotification(
//     (state: any) => state.showNotification
//   );
//   return useMutation({
//     mutationKey: [queryKey],
//     mutationFn: async (params: any) => {
//       const response = await accessServices.postQuenMatKhau(params);
//       return response;
//     },
//     onSuccess: (response: any) => {
//       if (response.status !== 200) {
//         showNotification({
//           message: `${response.response.data}`,
//           status: response.response.status,
//         });
//       } else return response;
//     },
//     onError: (errors: any) => {
//       console.log("errors", errors);
//     },
//     onSettled: onSettled,
//   });
// };

export const getInforNhanVien = (props: Props) => {
  const { queryKey, params } = props;
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await accessServices.getInforNhanVien(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });
};
