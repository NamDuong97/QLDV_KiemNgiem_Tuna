import React, { useEffect, useRef } from "react";
import { NotificationProps } from "../../models/notification";
import { useNotification } from "../../contexts/NotificationContext";

interface NotificationComponentProps {
  notification: NotificationProps;
}

const Notification: React.FC<NotificationComponentProps> = ({
  notification,
}) => {
  const { removeNotification } = useNotification();
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = notificationRef.current;
    if (element) {
      element.style.animation = "slideIn 1s ease-out forwards";
    }

    return () => {
      if (element) {
        element.style.animation = "slideOut 1s ease-in forwards";
      }
    };
  }, []);

  const handleClose = () => {
    const element = notificationRef.current;
    if (element) {
      element.style.animation = "slideOut 1s ease-in forwards";
      setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    }
  };

  const renderAvatar = () => {
    if (notification.isEvent) {
      return (
        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      );
    }

    return (
      <div
        className={`h-10 w-10 rounded-full ${notification.avatarClass} flex items-center justify-center text-white font-bold`}
      >
        {notification.avatar}
      </div>
    );
  };

  return (
    <div
      ref={notificationRef}
      className="notification-popup bg-white rounded-lg border border-gray-200 w-full relative overflow-hidden shadow-lg"
    >
      <div className="p-4">
        <div className="flex">
          <div className="flex-shrink-0 mr-3 mt-1">{renderAvatar()}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{notification.name}</span>{" "}
              {notification.content}
            </p>

            {notification.buttons && (
              <div className="mt-2 flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                  Chấp nhận
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors">
                  Từ chối
                </button>
              </div>
            )}

            <div className="mt-1 flex items-center">
              {notification.icon}
              <span className="ml-1 text-xs text-gray-500">
                {notification.time}
              </span>
            </div>
          </div>
          <button
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={handleClose}
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
      <div className="progress-bar"></div>
    </div>
  );
};

export default Notification;
