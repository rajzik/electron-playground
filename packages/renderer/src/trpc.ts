import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "trpc-api";

export const trpc = createTRPCReact<AppRouter>();
