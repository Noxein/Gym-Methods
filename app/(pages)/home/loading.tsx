
export default function loading() {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden animate-pulse p-4 sm:p-6">
      <div className="w-full max-w-6xl space-y-6">
        <div className="h-10 w-60 rounded-xl bg-zinc-700/60" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-28 rounded-2xl bg-zinc-700/50" />
          <div className="h-28 rounded-2xl bg-zinc-700/50" />
          <div className="h-28 rounded-2xl bg-zinc-700/50" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-80 rounded-2xl bg-zinc-700/45" />
          <div className="h-80 rounded-2xl bg-zinc-700/45" />
        </div>
      </div>
    </div>
  );
}
