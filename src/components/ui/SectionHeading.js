import { cn } from "@/lib/utils";
import Badge from "./Badge";

/**
 * Tiêu đề chuẩn cho mỗi section: badge + title + description.
 */
export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}) {
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={cn("flex flex-col gap-4", alignCls, className)}>
      {badge ? <Badge>{badge}</Badge> : null}
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
