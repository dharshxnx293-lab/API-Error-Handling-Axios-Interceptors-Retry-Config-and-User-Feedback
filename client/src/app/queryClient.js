import { QueryClient } from "@tanstack/react-query";

// Retry failed queries once and use exponential backoff, capped at 30 seconds.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    },
  },
});
