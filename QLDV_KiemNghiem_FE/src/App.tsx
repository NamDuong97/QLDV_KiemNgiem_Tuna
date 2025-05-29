import { QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routers";
import { queryClient } from "./lib/reactQuery";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
    </QueryClientProvider>
  );
}

export default App;
