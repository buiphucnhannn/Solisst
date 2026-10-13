/**
 * Cấu hình trung tâm của site.
 * Mọi text dùng chung (tên, mô tả, liên hệ, nav, footer) nằm ở đây
 * để đổi 1 chỗ là đổi cả landing page.
 */

export const siteConfig = {
  name: "Solisst",
  shortName: "Solisst",
  description:
    "Solisst — đầm dạ hội & đồ bộ mặc nhà thiết kế tôn dáng. Flash sale mỗi ngày, freeship combo, kiểm tra hàng rồi mới thanh toán.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://solisst.example.com",
  locale: "vi_VN",
  themeColor: "#171312",

  contact: {
    person: "Bá Mỹ",
    phone: "0904221887",
    phoneDisplay: "0904 221 887",
    zalo: "https://zalo.me/0904221887",
    facebook: "https://www.facebook.com/xike.my.7/",
    maps: "https://maps.app.goo.gl/keLqtX2kAbS4rpcZ6",
    city: "Bắc Ninh",
    hours: "8:00 – 22:00, tất cả các ngày",
  },

  // Link "/#..." để bấm từ trang bộ sưu tập / chi tiết vẫn về đúng section ở trang chủ
  nav: [
    { label: "Trang chủ", href: "/" },
    { label: "Bộ sưu tập", href: "/bo-suu-tap" },
    { label: "Lookbook", href: "/#lookbook" },
    { label: "Ưu đãi", href: "/#combo" },
    { label: "Đánh giá", href: "/#reviews" },
    { label: "Liên hệ", href: "#contact" },
  ],

  cta: {
    primary: { label: "Đặt hàng ngay", href: "#dat-hang" },
    secondary: { label: "Khám phá bộ sưu tập", href: "/bo-suu-tap" },
  },

  promises: [
    "Freeship toàn quốc cho combo từ 2 sản phẩm",
    "Kiểm tra hàng trước khi thanh toán (COD)",
    "Đổi size miễn phí trong 7 ngày",
    "Hàng có sẵn — giao 2–4 ngày",
  ],

  footer: {
    tagline: "Thanh lịch trong từng đường may — từ buổi tiệc tối đến giấc ngủ êm.",
    copyright: "© 2026 Solisst. All rights reserved.",
  },
};
