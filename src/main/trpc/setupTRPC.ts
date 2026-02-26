import type { Operation } from "@trpc/client";
import { callTRPCProcedure } from "@trpc/server";
import type { IpcMainInvokeEvent } from "electron";
import { ipcMain } from "electron";
import type { TRPCBridge } from "../../renderer/src/trpc/trpc-bridge.d.ts";
import { createContext, rootRouter } from "./rootRouter";
import { Maybe } from "@trpc/server/unstable-core-do-not-import";

const channel: TRPCBridge.IPCChannelName = "electron:ipc:trpc";

function raceAbortSignals(...signals: Maybe<AbortSignal>[]): AbortSignal {
  const ac = new AbortController();

  for (const signal of signals) {
    if (signal?.aborted) {
      ac.abort();
    } else {
      signal?.addEventListener("abort", () => ac.abort(), { once: true });
    }
  }

  return ac.signal;
}

export function setupTRPC() {
  console.debug("setup TRPC.");
  ipcMain.handle(channel, (_event: IpcMainInvokeEvent, op: Operation) => {
    return resolveTRPCOperation(op);
  });
}

async function resolveTRPCOperation(args: Operation<unknown>) {
  const { path, type, input: serInput } = args;
  const deinput = serInput; //transformer.input.deserialize(serInput) as unknown;
  const ctx = await createContext();
  const signal = raceAbortSignals(args.signal);

  try {
    const data = await callTRPCProcedure({
      ctx,
      path,
      router: rootRouter,
      batchIndex: 0,
      getRawInput: async () => deinput,
      type,
      signal,
    });

    return {
      input: deinput,
      path,
      data,
    };
  } catch (err) {
    console.error(
      new Date().toISOString(),
      "failed to callProcedure.",
      { args },
      err,
    );
    throw err;
  }
}
