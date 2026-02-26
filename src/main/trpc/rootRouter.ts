import { initTRPC } from "@trpc/server";
import { app } from "electron";
import superjson from "superjson";
import { z } from "zod";

// sample context
export const createContext = async () => {
  return { foo: "baz" };
};

type Context = Awaited<typeof createContext>;
const t = initTRPC.context<Context>().create({ transformer: superjson });

const ipc = t.router({
  version: t.procedure.query(() => app.getVersion()),

  getPath: t.procedure
    .input(z.enum(["home", "temp"] as const)) // for zod: https://zenn.dev/tyshgc/articles/c7a404481bf255
    .query(({ input }) => app.getPath(input)),

  loginItemSettings: t.procedure.query(() => app.getLoginItemSettings()),

  getSomething: t.procedure.query(() => {
    return {
      a: "hello from main",
      b: 123,
    };
  }),

  getSomething2: t.procedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      a: "hello from main",
      b: 123,
    };
  }),

  sendSomething: t.procedure
    .input(z.object({ a: z.string(), b: z.number(), c: z.boolean() }))
    .mutation(({ input }) => {
      console.debug("sendSomething", input);
      return input.b + 100;
    }),
});

const someRouter = t.router({
  getSomeData: t.procedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      a: "hello from main",
      b: 123,
    };
  }),
});

const root = initTRPC.create();
export const rootRouter = root.router({ ipc, someRouter });
export type RootRouter = typeof rootRouter;
