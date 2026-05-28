
export default function loading() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 animate-pulse">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="h-9 w-56 rounded-xl bg-zinc-700/60" />
        <div className="h-20 rounded-2xl bg-zinc-700/50" />
        <div className="h-20 rounded-2xl bg-zinc-700/50" />
        <div className="h-20 rounded-2xl bg-zinc-700/50" />
      </div>
    </div>
  );
}
