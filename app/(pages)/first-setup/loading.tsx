
export default function loading() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 animate-pulse">
      <div className="mx-auto w-full max-w-6xl grid gap-4 md:grid-cols-[280px_1fr]">
        <div className="h-[520px] rounded-2xl bg-zinc-700/50" />
        <div className="h-[520px] rounded-2xl bg-zinc-700/45" />
      </div>
    </div>
  );
}
