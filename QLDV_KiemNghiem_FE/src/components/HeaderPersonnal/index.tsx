import { useEffect, useState } from "react";
import { Bell } from "react-feather";
import Notification from "./Notification";

export interface InitialNotifications {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
}

const initialNotifications = [
  {
    id: 1,
    title: "Cập nhật hệ thống",
    message: "Hệ thống sẽ bảo trì vào ngày 15/07/2023 từ 22:00 - 23:00.",
    time: "10 phút trước",
    read: false,
    type: "system",
  },
  {
    id: 2,
    title: "Đơn hàng #12345 đã được xác nhận",
    message: "Đơn hàng của bạn đã được xác nhận và đang được xử lý.",
    time: "2 giờ trước",
    read: false,
    type: "order",
  },
  {
    id: 3,
    title: "Khuyến mãi mới",
    message: "Giảm giá 20% cho tất cả sản phẩm từ ngày 10/07 - 15/07/2023.",
    time: "1 ngày trước",
    read: false,
    type: "promotion",
  },
  {
    id: 4,
    title: "Lời nhắc",
    message: "Bạn có cuộc họp vào lúc 15:00 hôm nay.",
    time: "3 ngày trước",
    read: true,
    type: "reminder",
  },
  {
    id: 5,
    title: "Cập nhật tài khoản",
    message: "Thông tin tài khoản của bạn đã được cập nhật thành công.",
    time: "1 tuần trước",
    read: true,
    type: "account",
  },
];

const HeaderPersonnal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] =
    useState<InitialNotifications[]>(initialNotifications);

  const unreadCount = notifications.filter(
    (notification: any) => !notification.read
  ).length;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className="flex items-center justify-end px-6 py-5 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none relative cursor-pointer"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-[6px] -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
      <Notification
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setNotifications={setNotifications}
        notifications={notifications}
      />
    </header>
  );
};

export default HeaderPersonnal;
