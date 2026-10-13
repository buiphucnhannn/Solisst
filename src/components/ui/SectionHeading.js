import { cn } from "@/lib/utils";

/**
 * Tiêu đề section theo mẫu: eyebrow chữ nhỏ đỏ mận + title serif (nhấn bằng <em>) + mô tả.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  size = "lg",
  reveal = "up",
  className,
}) {
  const center = align === "center";
  const dark = tone === "dark";

  return (
    <div className={cn("flex flex-col gap-3", center ? "items-center text-center" : "items-start", className)} data-reveal={reveal}>
      {eyebrow ? (
        <p className={cn("text-[11px] font-semibold tracking-[0.28em] uppercase", dark ? "text-nude" : "text-rose")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "max-w-2xl font-serif leading-[1.1] font-normal text-balance [&_em]:font-normal",
          size === "lg" ? "text-[2.1rem] sm:text-5xl" : "text-3xl sm:text-4xl",
          dark ? "text-cream" : "text-plum",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("max-w-lg text-[14px] leading-relaxed text-pretty", dark ? "text-cream/70" : "text-ink-soft/80")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
