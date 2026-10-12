import { cn } from "@/lib/utils";

/**
 * Container chuẩn cho toàn landing page.
 * Giữ độ rộng + padding nhất quán mọi section.
 */
export default function Container({ className, children, ...props }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
