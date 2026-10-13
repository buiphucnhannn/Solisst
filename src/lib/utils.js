/**
 * Nối class CSS, bỏ qua giá trị falsy.
 * Dùng thay cho clsx để giữ project JS thuần, không thêm dependency.
 *
 * @example cn("px-4", isActive && "bg-black", className)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const vnd = new Intl.NumberFormat("vi-VN");

/** 459000 → "459.000đ" */
export function formatVND(value) {
  return `${vnd.format(value)}đ`;
}

/** 459000 → "459k" — dùng cho nhãn ngắn */
export function formatK(value) {
  return `${Math.round(value / 1000)}k`;
}
