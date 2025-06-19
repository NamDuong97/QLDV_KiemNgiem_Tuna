import * as signalR from "@microsoft/signalr";

const createSignalRConnection = (token: string) => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7233/notify", {
      accessTokenFactory: async () => token,
    })
    .withAutomaticReconnect() // tùy chỉnh thời gian reconnect
    .configureLogging(signalR.LogLevel.Information)
    .build();

  // Xử lý các sự kiện kết nối
  connection.onclose((error) => {
    console.error("❌ Kết nối đã đóng:", error);
  });

  connection.onreconnecting((error) => {
    console.warn("🔄 Đang cố gắng kết nối lại:", error);
  });

  connection.onreconnected((connectionId) => {
    console.log("✅ Đã kết nối lại. Connection ID:", connectionId);
  });

  return connection;
};
export default createSignalRConnection;
