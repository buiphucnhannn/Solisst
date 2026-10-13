import { smoothScrollTo } from "@/lib/smooth-scroll";

/**
 * Cầu nối giữa các nút "Chọn mẫu" / "Chọn combo" rải khắp trang
 * và form đặt hàng — không cần context hay thư viện state.
 */
export const ORDER_SELECT_EVENT = "solisst:select";
export const ORDER_ANCHOR = "dat-hang";

// Khối nút mua ở trang chi tiết (mở khung đặt hàng trượt ra)
export const BUY_ANCHOR = "mua";

/**
 * Nút "Đặt hàng ngay" (header, thanh đáy mobile) trỏ tới đâu theo từng trang:
 * trang chủ → form; trang chi tiết → khối chọn size & nút mua; trang khác → form ở trang chủ.
 */
export function orderHrefFor(pathname = "/") {
  if (pathname === "/") return `#${ORDER_ANCHOR}`;
  if (pathname.startsWith("/san-pham/")) return `#${BUY_ANCHOR}`;
  return `/#${ORDER_ANCHOR}`;
}

/** Phần tử mà thanh đặt hàng mobile tự ẩn khi khách đã cuộn tới. */
export function orderTargetFor(pathname = "/") {
  return pathname.startsWith("/san-pham/") ? BUY_ANCHOR : ORDER_ANCHOR;
}

/** @param {{ productId?: string, colorId?: string, size?: string, qty?: number }} detail */
export function selectForOrder(detail) {
  window.dispatchEvent(new CustomEvent(ORDER_SELECT_EVENT, { detail }));
  smoothScrollTo(ORDER_ANCHOR);
}
