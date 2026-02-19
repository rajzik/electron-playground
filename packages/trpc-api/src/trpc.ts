import { initTRPC } from "@trpc/server";

export interface TRPCContext {
  getVersion: () => string;
  getPath: (name: string) => string;
}

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
