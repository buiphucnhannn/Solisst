import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  // Nút chốt đơn — Đỏ mận theo brief
  primary:
    "bg-plum text-white shadow-[0_12px_28px_-12px_rgba(123,30,46,0.75)] hover:bg-plum-dark focus-visible:outline-plum",
  outline: "border border-plum/40 bg-transparent text-plum hover:bg-plum hover:text-white",
  light: "bg-cream/90 text-plum hover:bg-white",
};

const sizes = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-xs",
  lg: "h-13 px-8 text-[13px]",
};

/**
 * Button dùng chung — render <Link> nếu có href, <button> nếu không.
 * arrow → thêm mũi tên "→" trượt nhẹ khi hover.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-md font-semibold tracking-[0.12em] uppercase transition-all duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {arrow ? (
        <span aria-hidden="true" className="transition-transform duration-300 group-hover/btn:translate-x-1">
          →
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
