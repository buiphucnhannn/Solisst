"use client";

import { useCountdown } from "@/lib/countdown";
import { cn } from "@/lib/utils";

/**
 * Hiển thị đồng hồ flash sale.
 * variant="inline" → 02:14:09 gọn trên 1 dòng
 * variant="boxes"  → 3 ô Giờ / Phút / Giây
 */
export default function Countdown({ variant = "inline", tone = "dark", className }) {
  const { h, m, s } = useCountdown();

  if (variant === "inline") {
    return (
      <span className={cn("font-mono tabular-nums", className)} suppressHydrationWarning>
        {h}:{m}:{s}
      </span>
    );
  }

  const box =
    tone === "dark"
      ? "bg-ink text-cream"
      : "bg-cream text-ink ring-1 ring-ink/10";

  return (
    <div className={cn("flex items-center gap-2", className)} role="timer" aria-label="Thời gian flash sale còn lại">
      {[
        [h, "Giờ"],
        [m, "Phút"],
        [s, "Giây"],
      ].map(([val, label], i) => (
        <div key={label} className="flex items-center gap-2">
          {i > 0 ? <span className="font-serif text-xl text-current opacity-50">:</span> : null}
          <div className={cn("flex w-14 flex-col items-center rounded-xl py-2", box)}>
            <span className="font-mono text-xl font-semibold tabular-nums">{val}</span>
            <span className="text-[9px] tracking-[0.2em] uppercase opacity-60">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
