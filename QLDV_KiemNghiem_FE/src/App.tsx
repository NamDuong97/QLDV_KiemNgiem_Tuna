import { QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routers";
import { queryClient } from "./lib/reactQuery";
import HandleSnackbar from "./components/HandleSnackbar";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
      <HandleSnackbar />
    </QueryClientProvider>
  );
}

export default App;
