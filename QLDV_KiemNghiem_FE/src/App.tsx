import { QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routers";
import { queryClient } from "./lib/reactQuery";
import HandleSnackbar from "./components/HandleSnackbar";
import { StoreProvider } from "./contexts/storeProvider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Routers />
        <HandleSnackbar />
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
