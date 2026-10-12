import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-white text-slate-950 hover:bg-slate-200 focus-visible:outline-white",
  secondary:
    "border border-white/20 bg-white/5 text-white hover:bg-white/10 focus-visible:outline-white/40",
  outline:
    "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

/**
 * Button dùng chung — render <a> nếu có href, <button> nếu không.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
