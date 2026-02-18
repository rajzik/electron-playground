import { createFileRoute, Link } from "@tanstack/react-router";
import { App } from "../components/App";

export const Route = createFileRoute("/")({
  loader: async () => {
    const info = await window.ipc?.invoke("getAppInfo");
    return { version: info?.version ?? "N/A", userData: info?.userData ?? "N/A" };
  },
  component: Index,
});

function Index() {
  const { version, userData } = Route.useLoaderData();

  return (
    <main className="container mx-auto p-8 grid gap-4">
      <div>
        <h1 className="font-bold text-xl">
          Electron + TanStack Router + Vite + TailwindCSS
        </h1>
        <ul className="list-disc list-inside text-sm">
          <li>Electron API is available via IPC.</li>
          <li>TanStack Router for client-side routing.</li>
          <li>Built by Vite.</li>
          <li>Styled by TailwindCSS v4.</li>
        </ul>
      </div>

      <div>
        <h2 className="font-bold">Given by Electron API</h2>
        <p className="text-sm">
          version:{" "}
          <code className="bg-slate-200 p-1 rounded-xs text-[10px]">
            {version}
          </code>
        </p>
        <p className="text-sm">
          userData:{" "}
          <code className="bg-slate-200 p-1 rounded-xs text-[10px]">
            {userData}
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
