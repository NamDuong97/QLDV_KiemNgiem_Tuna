import { Dispatch, SetStateAction, useEffect } from "react";
import EmptyNotification from "./Empty";
import NotificationItem from "./Item";
import { InitialNotifications } from "..";
import { Drawer } from "@mui/material";
import Notification from "../../../configs/stores/Notification";

interface Props {
  isOpen: boolean;
  setNotifications: Dispatch<SetStateAction<InitialNotifications[]>>;
  notifications: InitialNotifications[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NotificationTest = (props: Props) => {
  const { isOpen, setNotifications, notifications, setIsOpen } = props;

  const test = Notification()
  console.log('testNotification',test);
  

  const markAsRead = (id: any) => {
    setNotifications(
      notifications.map((notification: any) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification: any) => ({
        ...notification,
        read: true,
      }))
    );
  };

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27) setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchor="right"
      sx={{
        ".MuiPaper-root": {},
      }}
    >
      <div className={`w-96 bg-white`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-gray-800">Thông báo</h2>
          <div className="flex items-center">
            <button
              className="text-sm text-blue-600 hover:text-blue-800 mr-4 hover:underline cursor-pointer"
              onClick={markAllAsRead}
            >
              Đánh dấu đã đọc tất cả
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer p-1 hover:bg-gray-200 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={markAsRead}
              />
            ))
          ) : (
            <EmptyNotification />
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default NotificationTest;
