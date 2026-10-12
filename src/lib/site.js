/**
 * Cấu hình trung tâm của site.
 * Mọi text dùng chung (tên, mô tả, nav, footer) nằm ở đây
 * để đổi 1 chỗ là đổi cả landing page.
 */

export const siteConfig = {
  name: "Solisst",
  shortName: "Solisst",
  description:
    "Solisst — landing page hiện đại, tốc độ cao, chuẩn SEO với Next.js + TailwindCSS.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://solisst.example.com",
  locale: "vi_VN",
  themeColor: "#0B0F19",

  nav: [
    { label: "Tính năng", href: "#features" },
    { label: "Bảng giá", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Liên hệ", href: "#contact" },
  ],

  cta: {
    primary: { label: "Bắt đầu miễn phí", href: "#contact" },
    secondary: { label: "Xem demo", href: "#features" },
  },

  footer: {
    tagline: "Xây dựng landing page nhanh, đẹp, chuẩn SEO.",
    columns: [
      {
        title: "Sản phẩm",
        links: [
          { label: "Tính năng", href: "#features" },
          { label: "Bảng giá", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Công ty",
        links: [
          { label: "Về chúng tôi", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Liên hệ", href: "#contact" },
        ],
      },
      {
        title: "Pháp lý",
        links: [
          { label: "Điều khoản", href: "#" },
          { label: "Bảo mật", href: "#" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Solisst. All rights reserved.`,
  },
};
