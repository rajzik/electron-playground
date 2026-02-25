import { createFileRoute, Link } from '@tanstack/react-router'
import { ipcTRPC } from "../trpc/TRPCReactProvider";
import { useEffect } from 'react';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  const getPath = ipcTRPC.ipc.sendSomething.useMutation();

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
          const v = await getPath.mutateAsync({ a: "hello", b: 123 });
          console.log({ v });
        }}
        className="bg-blue-500 text-white p-2 rounded-sm text-xs shadow-xs hover:bg-blue-600"
      >
        Send event
      </button>{" "}
      to main through IPC on tRPC.
      <div className="flex gap-2 flex-col">
      <Link to="/" className="hover:underline text-sm">Back to the top</Link>
      </div>
    </div>
  );
}
