
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { TRPCReactProvider } from "../trpc/TRPCReactProvider";


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <TRPCReactProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </TRPCReactProvider>
  )
}