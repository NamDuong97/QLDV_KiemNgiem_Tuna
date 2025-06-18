import { QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routers/RoutersCustomer";
import { queryClient } from "./lib/reactQuery";
import HandleSnackbar from "./components/HandleSnackbar";
import RoutesPersonnels from "./routers/RoutesPersonnels";
import { PersonnelProvider } from "./contexts/PersonelsProvider";
import { StoreProvider } from "./contexts/storeProvider";
import { SignalRProvider } from "./contexts/SignalRProvider";
import { useLocation } from "react-router";

function App() {
  const isAdmin = useLocation().pathname.startsWith("/tuna");

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        <PersonnelProvider>
          <SignalRProvider>
            <RoutesPersonnels />
          </SignalRProvider>
        </PersonnelProvider>
      ) : (
        <SignalRProvider>
          <StoreProvider>
            <Routers />
          </StoreProvider>
        </SignalRProvider>
      )}
      <HandleSnackbar />
    </QueryClientProvider>
  );
}

export default App;
