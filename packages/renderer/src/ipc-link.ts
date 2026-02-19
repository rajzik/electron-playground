import type { TRPCLink } from "@trpc/client";
import { observable } from "@trpc/server/observable";
import type { AppRouter } from "trpc-api";

export const ipcLink: TRPCLink<AppRouter> = () => {
  return ({ op }) => {
    return observable((observer) => {
      const { path, input } = op;
      window.ipc
        ?.trpc(path, input)
        .then((data) => {
          observer.next({ result: { type: "data", data } });
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  };
};
