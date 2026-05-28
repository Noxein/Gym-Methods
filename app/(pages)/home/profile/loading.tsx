
export default function loading() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 animate-pulse">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="h-10 w-48 rounded-xl bg-zinc-700/60" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-24 rounded-2xl bg-zinc-700/50" />
          <div className="h-24 rounded-2xl bg-zinc-700/50" />
          <div className="h-24 rounded-2xl bg-zinc-700/50" />
        </div>
        <div className="h-96 rounded-2xl bg-zinc-700/45" />
      </div>
    </div>
  );
}
