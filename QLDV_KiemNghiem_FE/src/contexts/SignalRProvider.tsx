// src/contexts/SignalRContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext<any>(null);

export const useSignalR = () => useContext(SignalRContext);

export const SignalRProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7233/notify")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    setConnection(conn);
  }, []);

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};
