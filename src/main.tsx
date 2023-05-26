import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import "./styles/scrollbar.css";
import { RouterProvider } from "@tanstack/router";
import { router } from "./router/router";
import {
  QueryClient,
  MutationCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import ErrorBoundary from "./components/wrappers/ErrorBoundary";

const queryClient: QueryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (data,variable,context,mutation) => {
      if (
        Array.isArray(mutation.meta?.invalidates)
      ) {
        return queryClient.invalidateQueries({
          queryKey: mutation.meta?.invalidates,
        });
      }
    },
  }),

  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>
  </ErrorBoundary>
);
