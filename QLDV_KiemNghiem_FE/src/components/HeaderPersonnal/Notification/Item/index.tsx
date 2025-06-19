import NotificationIcon from "../Icon";

interface Props {
  notification: any;
  onRead: any;
}

const NotificationItem = (props: Props) => {
  const { notification, onRead } = props;
  return (
    <div
      className={`notification-item p-4 border-l-4 ${
        notification.read
          ? "border-transparent"
          : "border-blue-500 bg-blue-50 hover:bg-blue-100"
      } hover:bg-gray-50 transition-all cursor-pointer`}
      onClick={() => onRead(notification.id)}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <NotificationIcon type={notification.type} />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-800">
              {notification.title}
            </p>
            <p className="text-xs text-gray-500">{notification.time}</p>
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
