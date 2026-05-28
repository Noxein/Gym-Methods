
export default function loading() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 animate-pulse">
      <div className="mx-auto mt-10 w-full max-w-lg rounded-2xl border border-zinc-700/40 bg-zinc-900/50 p-6 space-y-4">
        <div className="h-8 w-52 rounded-lg bg-zinc-700/60" />
        <div className="h-11 rounded-xl bg-zinc-700/50" />
        <div className="h-11 rounded-xl bg-zinc-700/50" />
        <div className="h-11 rounded-xl bg-zinc-700/50" />
        <div className="h-10 w-40 rounded-xl bg-zinc-600/70" />
      </div>
    </div>
  );
}
