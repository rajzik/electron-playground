import { z } from "zod";
import { router, publicProcedure } from "./trpc";

export const appRouter = router({
  getAppInfo: publicProcedure.query(({ ctx }) => ({
    version: ctx.getVersion(),
    userData: ctx.getPath("userData"),
  })),

  ping: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(({ input }) => ({
      pong: `Received: ${input.message}`,
    })),
});

export type AppRouter = typeof appRouter;
