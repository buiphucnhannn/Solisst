/**
 * Gửi sự kiện chuyển đổi tới Facebook Pixel + TikTok Pixel cùng lúc.
 * Pixel chưa cấu hình (chưa có ID) thì hàm im lặng bỏ qua.
 *
 * @param {"ViewContent"|"AddToCart"|"InitiateCheckout"|"Purchase"} event
 * @param {{ id?: string, name?: string, qty?: number, value?: number }} item
 */
const TIKTOK_EVENT = {
  ViewContent: "ViewContent",
  AddToCart: "AddToCart",
  InitiateCheckout: "InitiateCheckout",
  Purchase: "PlaceAnOrder", // đơn COD: chốt đơn = PlaceAnOrder
};

export function track(event, item = {}) {
  if (typeof window === "undefined") return;
  const { id, name, qty = 1, value } = item;

  try {
    window.fbq?.("track", event, {
      content_ids: id ? [id] : undefined,
      content_name: name,
      content_type: "product",
      num_items: qty,
      value,
      currency: "VND",
    });

    window.ttq?.track(TIKTOK_EVENT[event] ?? event, {
      contents: id ? [{ content_id: id, content_name: name, quantity: qty }] : undefined,
      content_type: "product",
      value,
      currency: "VND",
    });
  } catch {
    // Pixel lỗi không được làm hỏng luồng đặt hàng
  }
}
