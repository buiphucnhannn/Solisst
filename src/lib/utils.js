/**
 * Nối class CSS, bỏ qua giá trị falsy.
 * Dùng thay cho clsx để giữ project JS thuần, không thêm dependency.
 *
 * @example cn("px-4", isActive && "bg-black", className)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
