import React from "react";
import { useNotification } from "../../../contexts/NotificationContext";
import Notification from "..";

const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-5 right-5 w-full max-w-sm z-50 flex flex-col gap-3">
      {notifications.map((notification: any) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;
