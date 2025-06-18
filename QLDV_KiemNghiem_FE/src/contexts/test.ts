import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()

  .withUrl("https://localhost:7233/notify")

  .withAutomaticReconnect()

  .configureLogging(signalR.LogLevel.Information)

  .build();

export default connection;
