
export default function loading() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 animate-pulse">
      <div className="mx-auto w-full max-w-7xl space-y-5">
        <div className="h-9 w-72 rounded-xl bg-zinc-700/60" />
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <div className="h-[520px] rounded-2xl bg-zinc-700/45" />
          <div className="h-[520px] rounded-2xl bg-zinc-700/45" />
        </div>
      </div>
    </div>
  );
}
