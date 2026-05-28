
export default function loading() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 animate-pulse">
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <div className="h-28 rounded-2xl bg-zinc-700/50" />
        <div className="h-12 rounded-xl bg-zinc-700/55" />
        <div className="space-y-3">
          <div className="h-16 rounded-xl bg-zinc-700/45" />
          <div className="h-16 rounded-xl bg-zinc-700/45" />
          <div className="h-16 rounded-xl bg-zinc-700/45" />
          <div className="h-16 rounded-xl bg-zinc-700/45" />
        </div>
      </div>
    </div>
  );
}
