import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type * as React from "react";
import type { RootRouter } from "../../../main/trpc/rootRouter";
import { ipcLink } from "./ipcLink";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

export const ipcTRPC = createTRPCReact<RootRouter>();

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: true } },
});

export const trpcClient = createTRPCClient<RootRouter>({
  links: [ipcLink],
});

export const trpc = createTRPCOptionsProxy<RootRouter>({
  client: trpcClient,
  queryClient,
});

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
