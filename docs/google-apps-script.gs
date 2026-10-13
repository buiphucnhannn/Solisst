/**
 * SOLISST — Nhận đơn từ landing page → Google Sheet + email Gmail
 *
 * CÀI ĐẶT (5 phút):
 * 1. Tạo 1 Google Sheet mới (VD: "Solisst - Đơn hàng").
 * 2. Menu Tiện ích mở rộng → Apps Script → xoá code mẫu, dán toàn bộ file này.
 * 3. Sửa NOTIFY_EMAIL (email nhận thông báo) và SECRET (chuỗi bí mật bất kỳ).
 * 4. Bấm Triển khai → Tùy chọn triển khai mới → Loại: Ứng dụng web
 *      - Thực thi dưới dạng: Tôi
 *      - Người có quyền truy cập: Bất kỳ ai
 *    → Cấp quyền (Sheets + Gmail) → copy "URL ứng dụng web" (…/exec).
 * 5. Trong project Next.js, tạo .env.local:
 *      GOOGLE_SCRIPT_URL=<URL vừa copy>
 *      GOOGLE_SCRIPT_SECRET=<đúng chuỗi SECRET ở bước 3>
 * 6. Khởi động lại `npm run dev` / redeploy. Đặt thử 1 đơn để kiểm tra.
 *
 * Lưu ý: mỗi lần sửa code Apps Script phải "Quản lý triển khai" → chỉnh sửa → Phiên bản mới.
 */

const NOTIFY_EMAIL = "your-email@gmail.com"; // nhiều email: "a@gmail.com,b@gmail.com"
const SECRET = "doi-chuoi-bi-mat-nay";
const SHEET_NAME = "Đơn hàng";

const HEADERS = [
  "Mã đơn", "Thời gian", "Họ tên", "SĐT", "Địa chỉ",
  "Sản phẩm", "Màu", "Size", "SL", "Combo",
  "Tạm tính", "Giảm", "Phí ship", "Tổng thu (COD)",
  "Ghi chú", "Nguồn quảng cáo", "Trang", "Trạng thái",
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (SECRET && body.secret !== SECRET) return json_({ ok: false, error: "unauthorized" });

    const o = body.order;
    const sheet = getSheet_();
    sheet.appendRow([
      o.orderCode, o.createdAt, o.name, "'" + o.phone, o.address,
      o.product, o.color, o.size, o.qty, o.combo,
      o.subtotal, o.discount, o.shipping, o.total,
      o.note, o.source, o.page, "Mới",
    ]);

    sendMail_(o);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#171312").setFontColor("#faf6f1");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendMail_(o) {
  if (!NOTIFY_EMAIL) return;
  const vnd = (n) => Number(n).toLocaleString("vi-VN") + "đ";
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#171312">' +
    '<h2 style="color:#7a1f3d;margin:0 0 12px">🛍️ Đơn mới ' + o.orderCode + "</h2>" +
    "<p><b>" + o.name + "</b> — " + o.phone + "<br>" + o.address + "</p>" +
    "<p>" + o.product + " · " + o.color + " · Size " + o.size + " · " + o.combo + "</p>" +
    "<p>Tạm tính: " + vnd(o.subtotal) + " · Giảm: " + vnd(o.discount) + " · Ship: " + vnd(o.shipping) + "<br>" +
    '<b style="font-size:16px">Tổng thu COD: ' + vnd(o.total) + "</b></p>" +
    (o.note ? "<p>Ghi chú: " + o.note + "</p>" : "") +
    '<p style="color:#888;font-size:12px">' + o.createdAt + (o.source ? " · " + o.source : "") + "</p>" +
    "</div>";

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "[Solisst] Đơn mới " + o.orderCode + " — " + o.name + " — " + vnd(o.total),
    htmlBody: html,
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
