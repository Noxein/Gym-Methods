export function PageLoadingSkeleton() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="h-9 w-56 rounded-xl bg-zinc-200/70" />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="h-28 rounded-2xl bg-zinc-200/60" />
          <div className="h-28 rounded-2xl bg-zinc-200/60" />
          <div className="h-28 rounded-2xl bg-zinc-200/60 md:col-span-2 xl:col-span-1" />
        </div>

        <div className="space-y-3 rounded-2xl border border-zinc-200/80 p-4">
          <div className="h-5 w-48 rounded-lg bg-zinc-200/70" />
          <div className="h-4 w-full rounded-lg bg-zinc-200/60" />
          <div className="h-4 w-11/12 rounded-lg bg-zinc-200/60" />
          <div className="h-4 w-4/5 rounded-lg bg-zinc-200/60" />
        </div>
      </div>
    </div>
  );
}
