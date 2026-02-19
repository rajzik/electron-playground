import { useEffect, useState } from "react";
import { trpc } from "../trpc";

export const App = () => {
  const ping = trpc.ping.useMutation();
  const [lastPong, setLastPong] = useState<string | null>(null);

  useEffect(() => {
    if (!window.ipc) return;
    const dispose = window.ipc.on("ping", function (...args: unknown[]) {
      console.debug("ipc: main -> renderer", JSON.stringify(args));
    });
    return () => {
      dispose();
    };
  });

  return (
    <div className="text-sm">
      <h2 className="font-bold">tRPC over IPC</h2>
      <button
        onClick={async () => {
          const result = await ping.mutateAsync({ message: "hello from renderer" });
          setLastPong(result.pong);
        }}
        className="bg-blue-500 text-white p-2 rounded-sm text-xs shadow-xs hover:bg-blue-600"
      >
        Send ping via tRPC
      </button>
      {lastPong && (
        <p className="mt-1 text-xs text-gray-600">{lastPong}</p>
      )}
    </div>
  );
};
