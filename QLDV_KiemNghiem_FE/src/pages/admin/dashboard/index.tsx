import Notification from "../../../configs/stores/Notification";

const Dashboard = () => {
  const notifications = Notification();
  return (
    <div className="bg-[linear-gradient(to_bottom,#F7797D,#FBD786,#C6FFDD)] min-h-screen">
      <h2>Thông báo</h2>
      <ul>
        {notifications.map((item: any, index: any) => (
          <li key={index}>
            <strong>{item.title}</strong>: {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
