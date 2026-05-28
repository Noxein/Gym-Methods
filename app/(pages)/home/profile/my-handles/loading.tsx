
export default function loading() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 animate-pulse">
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <div className="h-9 w-48 rounded-xl bg-zinc-700/60" />
        <div className="flex flex-wrap gap-3">
          <div className="h-10 w-28 rounded-full bg-zinc-700/50" />
          <div className="h-10 w-36 rounded-full bg-zinc-700/50" />
          <div className="h-10 w-32 rounded-full bg-zinc-700/50" />
          <div className="h-10 w-24 rounded-full bg-zinc-700/50" />
          <div className="h-10 w-40 rounded-full bg-zinc-700/50" />
        </div>
      </div>
    </div>
  );
}
