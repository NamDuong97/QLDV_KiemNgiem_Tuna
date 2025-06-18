import { useEffect, useState } from "react";
import { useSignalR } from "../../contexts/SignalRProvider";
import { usePersonnel } from "../../contexts/PersonelsProvider";

const Notification = () => {
  const connection = useSignalR();
  const { personnelInfo } = usePersonnel();
  console.log("personnelInfo", personnelInfo?.maLoaiTk);
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    console.log("chưa vào if", personnelInfo?.maLoaiTk);
    if (
      personnelInfo !== null &&
      personnelInfo !== undefined &&
      personnelInfo?.maLoaiTk !== null &&
      personnelInfo?.maLoaiTk !== ""
    ) {
      if (connection) {
        connection
          .start()
          .then(() => {
            // Gọi tới Hub server để join nhóm "BLD", chỗ này cần thay đổi theo role người dùng
            console.log("Vào invoke");
            connection
              .invoke("JoinGroup", personnelInfo?.maLoaiTk)
              .then(() =>
                console.log(`Joined group ${personnelInfo?.maLoaiTk}`)
              )
              .catch((err: any) => console.error("Failed to join group", err));

            // Lắng nghe sự kiện notifycation
            console.log("SignalR Connected 1");
            connection.on("notifycation", (data: any) => {
              console.log("New notification:", data);
              setNotifications((prev: any) => [...prev, data]);
            });

            // Lắng nghe sự kiện receiveNotification
            console.log("SignalR Connected 2");
            connection.on("receiveNotification", (data: any) => {
              console.log("New notification:", data);
              setNotifications((prev: any) => [...prev, data]);
            });
          })
          .catch((e: any) => console.error("Connection failed: ", e));
      }
    }
  }, [connection, personnelInfo]);

  return notifications;
};

export default Notification;
