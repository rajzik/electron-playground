import { createFileRoute, Link } from "@tanstack/react-router";
import { trpc } from "../trpc";
import { App } from "../components/App";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = trpc.getAppInfo.useQuery();

  return (
    <main className="container mx-auto p-8 grid gap-4">
      <div>
        <h1 className="font-bold text-xl">
          Electron + TanStack Router + Vite + TailwindCSS
        </h1>
        <ul className="list-disc list-inside text-sm">
          <li>Electron API is available via tRPC over IPC.</li>
          <li>TanStack Router for client-side routing.</li>
          <li>Built by Vite.</li>
          <li>Styled by TailwindCSS v4.</li>
        </ul>
      </div>

      <div>
        <h2 className="font-bold">Given by Electron API (via tRPC)</h2>
        <p className="text-sm">
          version:{" "}
          <code className="bg-slate-200 p-1 rounded-xs text-[10px]">
            {data?.version ?? "loading..."}
          </code>
        </p>
        <p className="text-sm">
          userData:{" "}
          <code className="bg-slate-200 p-1 rounded-xs text-[10px]">
            {data?.userData ?? "loading..."}
          </code>
        </p>
      </div>

      <App />

      <div>
        <h2 className="font-bold">Routing</h2>
        <Link to="/welcome" className="hover:underline text-sm">
          To Welcome page
        </Link>
      </div>
    </main>
  );
}
