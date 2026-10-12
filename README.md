# Solisst — Landing Page (Next.js + TailwindCSS + JS thuần)

Khung landing page chuyên nghiệp, tối thiểu, dễ mở rộng.

## Công nghệ

- **Next.js 16** (App Router, `src/` dir)
- **TailwindCSS v4** (CSS-first, không config file)
- **JS thuần** (không TypeScript)
- **ESLint** chuẩn Next.js

## Cấu trúc

```
src/
  app/
    layout.js        → font, metadata SEO, Header/Footer chung
    page.js          → lắp ráp section như lego
    globals.css      → Tailwind + theme tokens
    sitemap.js       → /sitemap.xml tự động
    robots.js        → /robots.txt tự động
    loading.js       → fallback loading
    not-found.js     → trang 404
  components/
    layout/
      Header.js      → sticky nav + mobile menu
      Footer.js      → footer nhiều cột
    sections/
      Hero.js        → section mẫu để copy theo
      PlaceholderSections.js → xóa khi có section thật
    ui/
      Button.js      → button/link dùng chung
      Container.js   → container chuẩn mọi section
      SectionHeading.js → tiêu đề section chuẩn
      Badge.js       → nhãn nhỏ
  lib/
    site.js          → cấu hình trung tâm (tên, nav, CTA, footer)
    utils.js         → hàm cn() nối class

public/
  favicon.svg        → icon trình duyệt
  logo.svg           → logo Header/Footer
  manifest.webmanifest
  icons/apple-touch-icon.svg
  images/
    hero-cover.svg   → ảnh Hero demo
    og-cover.svg     → ảnh share MXH
```

## Chạy local

```bash
npm install
npm run dev
# mở http://localhost:3000
```

## Thêm section mới (chuẩn)

1. Tạo file `src/components/sections/TenMoi.js`:

```js
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TenMoi() {
  return (
    <section id="ten-moi">
      <Container>
        <SectionHeading
          badge="Nhãn"
          title="Tiêu đề"
          description="Mô tả ngắn."
        />
        {/* nội dung */}
      </Container>
    </section>
  );
}
```

2. Import + render trong `src/app/page.js` theo thứ tự mong muốn.
3. Nếu cần link nav: thêm `{ label, href: "#ten-moi" }` vào `siteConfig.nav` trong `src/lib/site.js`.

## Đổi nội dung chung

Mọi text dùng chung nằm ở `src/lib/site.js`: tên site, mô tả, nav, CTA, footer, URL.

## Build & deploy

```bash
npm run lint
npm run build
npm start
```

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Đổi `NEXT_PUBLIC_SITE_URL` trong `.env.local` (xem `.env.example`) trước khi deploy để SEO/OG đúng domain.

## Quy ước code

- Component là function JS thuần, `export default`.
- Dùng alias `@/*` → `src/*` (VD: `@/components/ui/Button`).
- Style bằng Tailwind, nối class bằng `cn()` từ `@/lib/utils`.
- Section nào cũng bọc bằng `<Container>` để giữ padding/độ rộng nhất quán.
