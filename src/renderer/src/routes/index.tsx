/// <reference types="vite/client" />

import { useQuery } from "@tanstack/react-query";
import App from "../App";
import { trpc } from "../trpc/TRPCReactProvider";
import { createFileRoute, Link } from "@tanstack/react-router";

const isDev = import.meta.env.DEV;
console.debug("renderer: isDev:", isDev);
console.debug("renderer: import.meta.env:", import.meta.env);

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(trpc.ipc.getPath.queryOptions("home")),
});

export default function Index() {
  const getPath = useQuery(trpc.ipc.getPath.queryOptions("home"));
  const e = useQuery(trpc.ipc.loginItemSettings.queryOptions());
  const something = useQuery(trpc.ipc.getSomething.queryOptions());

  console.log({ getPath, something });
  return (
    <main className="container mx-auto p-8 grid gap-4">
      <div>
        <h1 className="font-bold text-xl">
          Electron + React Router + Vite + TailwindCSS
        </h1>
        <ul className="list-disc list-inside text-sm">
          <li>Electron API is available through IPC on tRPC.</li>
          <li>React Router framework.</li>
          <li>Built by Vite.</li>
          <li>Styled by TailwindCSS v3. (v4 will be supported)</li>
        </ul>
      </div>

      <div>
        <h2 className="font-bold">Given by Electron API</h2>
        <p className="text-sm">
          version:{" "}
          <code className="bg-slate-200 p-1 rounded-xs text-[10px]">
            {getPath.data}
            {/* {v.version} */}
          </code>
        </p>
        <p className="text-sm">
          something:{" "}
          <code className="bg-slate-200 p-1 rounded-xs text-[10px]">
            {something.data?.a}
            {something.data?.b}
          </code>
        </p>
        <p className="text-sm">
          userData:{" "}
          <code className="bg-slate-200 p-1 rounded-xs text-[10px]">
            {e.data?.status}
            {/* {v.userData} */}
          </code>
        </p>
      </div>

      <App />

      <div className="flex gap-2 flex-col">
        <h2 className="font-bold">Routing</h2>
        <Link to="/welcome" className="hover:underline text-sm">
          To Welcome page
        </Link>
        <Link to="/app" className="hover:underline text-sm">
          To App page
        </Link>
      </div>
    </main>
  );
}
