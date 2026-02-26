import { useEffect } from "react";
import { trpc } from "./trpc/TRPCReactProvider";
import { useMutation } from "@tanstack/react-query";

const App = () => {
  const getPath = useMutation(trpc.ipc.sendSomething.mutationOptions());

  useEffect(() => {
    if (!window.__$ipc__) {
      return;
    }
    console.debug("register.on");
    const dispose = window.__$ipc__.on("ping", function (...args) {
      console.debug("ipc: main -> renderer", JSON.stringify(args));
    });
    return () => {
      console.debug("dispose.on");
      dispose();
    };
  });

  return (
    <div className="text-sm">
      <h2 className="font-bold">IPC is available</h2>
      <button
        onClick={async () => {
          const v = await getPath.mutateAsync({ a: "hello", b: 123, c: true });
          console.log({ v });
        }}
        className="bg-blue-500 text-white p-2 rounded-sm text-xs shadow-xs hover:bg-blue-600"
      >
        Send event
      </button>{" "}
      to main through IPC on tRPC.
    </div>
  );
};

export default App;
