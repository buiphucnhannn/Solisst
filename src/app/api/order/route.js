import { getProduct, quote } from "@/lib/products";

/**
 * POST /api/order — nhận đơn từ form chốt đơn.
 *
 * Server tự tính lại giá từ src/lib/products.js (không tin giá từ trình duyệt),
 * rồi đẩy đơn sang Google Apps Script Web App → ghi 1 dòng vào Google Sheet
 * + gửi email thông báo qua Gmail. Xem hướng dẫn: docs/google-apps-script.gs
 *
 * Env: GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/xxx/exec
 */

const clean = (v, max = 300) => String(v ?? "").trim().slice(0, max);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  // Honeypot: bot điền ô ẩn → giả vờ thành công, không ghi đơn
  if (body.website) {
    return Response.json({ ok: true, orderCode: "SL-000000", total: 0 });
  }

  const product = getProduct(body.productId);
  const color = product?.colors.find((c) => c.id === body.colorId);
  const size = product?.sizes.find((s) => s.id === body.size);
  const qty = [1, 2, 3].includes(Number(body.qty)) ? Number(body.qty) : null;
  const name = clean(body.name, 100);
  const phone = clean(body.phone, 20);
  const address = clean(body.address, 300);

  if (!product || !color || !size || !qty || name.length < 2 || !/^(0\d{9}|\+\d{8,15})$/.test(phone) || address.length < 10) {
    return Response.json({ ok: false, error: "Thiếu hoặc sai thông tin đơn hàng" }, { status: 422 });
  }

  const price = quote(product, qty);
  const now = new Date();
  const orderCode = `SL-${now.getTime().toString(36).toUpperCase().slice(-6)}`;

  const order = {
    orderCode,
    createdAt: now.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
    name,
    phone,
    address,
    product: product.name,
    color: color.label,
    size: size.id,
    qty,
    combo: price.combo.label,
    subtotal: price.subtotal,
    discount: price.discount,
    shipping: price.shipping,
    total: price.total,
    note: clean(body.note, 500),
    source: Object.entries(body.source ?? {})
      .map(([k, v]) => `${k}=${clean(v, 120)}`)
      .join("&"),
    page: clean(body.page, 300),
  };

  const webhook = process.env.GOOGLE_SCRIPT_URL;
  if (!webhook) {
    // Chưa cấu hình Google Sheet → vẫn nhận đơn ở chế độ demo, log ra console server
    console.warn("[order] GOOGLE_SCRIPT_URL chưa cấu hình — đơn demo:", order);
    return Response.json({ ok: true, orderCode, total: price.total, demo: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.GOOGLE_SCRIPT_SECRET ?? "", order }),
      redirect: "follow",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) throw new Error(data?.error || `Apps Script HTTP ${res.status}`);
  } catch (err) {
    console.error("[order] Gửi Google Sheet thất bại:", err, order);
    return Response.json({ ok: false, error: "Không gửi được đơn, vui lòng thử lại" }, { status: 502 });
  }

  return Response.json({ ok: true, orderCode, total: price.total });
}
