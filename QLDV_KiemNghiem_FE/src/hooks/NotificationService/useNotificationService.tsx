import { formatDateNotTime } from "../../configs/configAll";
import { useNotification } from "../../contexts/NotificationContext";

export const useNotificationService = () => {
  const { addNotification } = useNotification();

  const showEventNotification = (item: any) => {
    addNotification({
      type: "event",
      avatarClass: "bg-gradient-to-r from-amber-500 to-orange-500",
      name: item?.title,
      content: item?.message,
      time: formatDateNotTime(item?.createdAt),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-amber-500"
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
      ),
      isEvent: true,
    });
  };

  return {
    showEventNotification,
  };
};
