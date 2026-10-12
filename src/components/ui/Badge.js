import { cn } from "@/lib/utils";

export default function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700 uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
