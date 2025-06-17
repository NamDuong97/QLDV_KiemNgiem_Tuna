import { QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routers/RoutersCustomer";
import { queryClient } from "./lib/reactQuery";
import HandleSnackbar from "./components/HandleSnackbar";
import RoutesPersonnels from "./routers/RoutesPersonnels";
import { PersonnelProvider } from "./contexts/PersonelsProvider";
import { StoreProvider } from "./contexts/storeProvider";
import { SignalRProvider } from "./contexts/SignalRProvider";
import Cookie from "js-cookie";
import { EKey } from "./constants/commons";
import { useLocation } from "react-router";

function App() {
  const token = Cookie.get(EKey.TOKEN);
  const token_guest = Cookie.get(EKey.TOKEN_GUEST);
  const isAdmin = useLocation().pathname.startsWith("/tuna");
  console.log("isAdmin", isAdmin);

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        <SignalRProvider token={token}>
          <PersonnelProvider>
            <RoutesPersonnels />
          </PersonnelProvider>
        </SignalRProvider>
      ) : (
        <SignalRProvider token={token_guest}>
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
