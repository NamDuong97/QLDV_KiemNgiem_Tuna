import { useEffect } from "react";
// import { useSignalR } from "../../contexts/SignalRProvider";
import { usePersonnel } from "../../contexts/PersonelsProvider";
import { HubConnectionState } from "@microsoft/signalr";
//import createSignalRConnection from "../test";
import { useSignalR } from "../../contexts/SignalRProvider";
import { useNotificationService } from "../../hooks/NotificationService/useNotificationService";

const ToastNotification = () => {
  // const connection = useSignalR();
  //const token = Cookies.get(EKey.TOKEN);
  const connection = useSignalR();
  const { personnelInfo } = usePersonnel();
  const { showEventNotification } = useNotificationService();
  useEffect(() => {
    if (
      personnelInfo !== null &&
      personnelInfo !== undefined &&
      personnelInfo?.maLoaiTk !== null &&
      personnelInfo?.maLoaiTk !== ""
    ) {
      if (connection && connection.state === HubConnectionState.Disconnected) {
        connection
          .start()
          .then(() => {
            // Gọi tới Hub server để join nhóm "BLD", chỗ này cần thay đổi theo role người dùng

            //JoinGroup Loại TK
            connection
              .invoke("JoinGroup", personnelInfo?.maLoaiTk.split("_")[0])
              .then(() =>
                console.log(
                  `Joined group ${personnelInfo?.maLoaiTk.split("_")[0]}`
                )
              )
              .catch((err: any) =>
                console.error(
                  `Joined group ${personnelInfo?.maLoaiTk.split("_")[0]}`,
                  err
                )
              );

            connection
              .invoke("JoinGroup", personnelInfo?.maLoaiTk)
              .then(() =>
                console.log(
                  `Joined group ${personnelInfo?.maLoaiTk}`
                )
              )
              .catch((err: any) =>
                console.error(
                  `Joined group ${personnelInfo?.maLoaiTk}`,
                  err
                )
              );

            //JoinGroup Khoa
            connection
              .invoke("JoinGroup", personnelInfo?.maKhoa)
              .then(() => console.log(`Joined group ${personnelInfo?.maKhoa}`))
              .catch((err: any) =>
                console.error(
                  `Failed to join group ${personnelInfo?.maKhoa}`,
                  err
                )
              );

            //JoinGroup Chức Vụ
            connection
              .invoke("JoinGroup", personnelInfo?.maChucVu)
              .then(() =>
                console.log(`Joined group ${personnelInfo?.maChucVu}`)
              )
              .catch((err: any) =>
                console.error(
                  `Failed to join group ${personnelInfo?.maChucVu}`,
                  err
                )
              );

            //JoinGroup UserId
            connection
              .invoke("JoinGroup", personnelInfo?.maId)
              .then(() => console.log(`JoinGroup ${personnelInfo?.maId}`))
              .catch((err: any) =>
                console.error(
                  `Failed to JoinGroupUserId ${personnelInfo?.maId}`,
                  err
                )
              );

            // Lắng nghe sự kiện notifycation
            console.log("SignalR Connected 1");
            connection.on("notifycation", (data: any) => {
              console.log("New notifycation:", data);
              showEventNotification(data);
            });

            // Lắng nghe sự kiện receiveNotification
            console.log("SignalR Connected 2");
            connection.on("receiveNotification", (data: any) => {
              console.log("New receiveNotification:", data);
              showEventNotification(data);
            });

            console.log("SignalR Connected 3");
            connection.on("notificationForPDXPB", (data: any) => {
              console.log("New notificationForPDXPB:", data);
              showEventNotification(data);
            });
          })
          .catch((e: any) => console.error("Connection failed: ", e));
      }
    }
  }, [connection]);
};
export default ToastNotification;
