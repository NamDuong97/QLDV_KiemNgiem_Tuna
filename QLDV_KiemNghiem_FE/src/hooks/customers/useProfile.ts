import { useMutation } from "@tanstack/react-query";
import profileServices from "../../services/customers/profile";
// import { useStoreNotification } from "../../configs/stores/useStoreNotification";

interface Props {
  queryKey: string;
}

export const updateInfor = (props: Props) => {
  const { queryKey } = props;
  // const showNotification = useStoreNotification(
  //   (state: any) => state.showNotification
  // );
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (params: any) => {
      const response = await profileServices.updateInfor(params);
      return response;
    },
    onSuccess: (response: any) => {
      console.log("response", response);

      // showNotification({ message: "Lỗi Server", status: 400 });
    },
    onError: (err) => {
      console.log("err", err);
    },
  });
};
