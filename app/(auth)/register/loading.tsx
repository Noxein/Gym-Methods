
export default function loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 animate-pulse">
      <div className="w-full max-w-md rounded-2xl border border-zinc-700/40 bg-zinc-900/50 p-6 space-y-4">
        <div className="h-8 w-52 rounded-lg bg-zinc-700/60" />
        <div className="h-11 rounded-xl bg-zinc-700/50" />
        <div className="h-11 rounded-xl bg-zinc-700/50" />
        <div className="h-11 rounded-xl bg-zinc-700/50" />
        <div className="h-10 w-full rounded-xl bg-zinc-600/70" />
        <div className="h-4 w-44 rounded bg-zinc-700/50" />
      </div>
    </div>
  );
}
