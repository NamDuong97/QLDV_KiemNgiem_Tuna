import { useEffect, useState } from "react";
import { image } from "../../../constants/image";
import connection from "../../../contexts/test"; // export mặc định connection

const Dashboard = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    connection.on("recivenotification", (message) => {
      console.log("📩 Message received:", message.message);
      setMessages((prev) => [...prev, message]);
    });

    const setupSignalR = async () => {
      if (connection.state === "Disconnected") {
        await connection.start();
        await connection.invoke("JoinGroup", "KHTH");
      }
    };

    setupSignalR();

    return () => {
      connection.off("recivenotification");
    };
  }, []);

  return (
    <div className="text-2xl">
      {messages.length > 0 ? (
        messages.map((msg, idx) => (
          <div key={idx}>
            <p>
              📨 {msg.title}: {msg.body}
            </p>
          </div>
        ))
      ) : (
        <p>🕐 Đang chờ thông báo...</p>
      )}
    </div>
  );
};

export default Dashboard;
