import "./tailwind.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createRoot } from "react-dom/client";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { queryClient, TRPCReactProvider } from "./trpc/TRPCReactProvider";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    queryClient,
  },
  defaultPreloadStaleTime: 0,
});

setupRouterSsrQueryIntegration({
  router,
  queryClient,
  // optional:
  // handleRedirects: true,
  // wrapQueryClient: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <TRPCReactProvider>
      <RouterProvider router={router} />
    </TRPCReactProvider>,
  );
}
