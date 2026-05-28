
export default function loading() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 animate-pulse">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <div className="h-9 w-56 rounded-xl bg-zinc-700/60" />
        <div className="h-24 rounded-2xl bg-zinc-700/50" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-64 rounded-2xl bg-zinc-700/45" />
          <div className="h-64 rounded-2xl bg-zinc-700/45" />
        </div>
        <div className="h-28 rounded-2xl bg-zinc-700/40" />
      </div>
    </div>
  );
}
