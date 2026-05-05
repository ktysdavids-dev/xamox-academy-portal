export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 font-semibold tracking-tight ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold shadow-sm">
        X
      </span>
      <span className="text-foreground">
        Xamox<span className="text-brand-muted">Academy</span>
      </span>
    </div>
  );
}
