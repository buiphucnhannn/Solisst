import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Section mẫu để bạn copy làm Features / Pricing / FAQ...
 * Xóa file này khi đã có section thật, hoặc giữ làm placeholder.
 *
 * Cách thêm section mới:
 * 1. Tạo file trong src/components/sections/TenSection.js
 * 2. Import + render trong src/app/page.js
 * 3. Thêm link #id vào siteConfig.nav nếu cần
 */
const PLACEHOLDERS = [
  {
    title: "Features",
    desc: "Liệt kê 3–6 lợi ích chính, mỗi card 1 icon + tiêu đề + mô tả ngắn.",
  },
  {
    title: "Pricing",
    desc: "2–3 gói giá, gói nổi bật ở giữa, nút CTA rõ ràng.",
  },
  {
    title: "FAQ",
    desc: "5–8 câu hỏi thường gặp dạng accordion, tốt cho SEO.",
  },
];

export default function PlaceholderSections() {
  return (
    <section id="features" className="bg-white">
      <Container>
        <div className="py-16 sm:py-20">
          <SectionHeading
            badge="Khung mẫu"
            title="Thêm section mới tại đây"
            description="Xóa PlaceholderSections trong src/app/page.js và thay bằng Features, Pricing, Testimonials, FAQ, CTA của bạn."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PLACEHOLDERS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6"
              >
                <h3 className="font-bold text-slate-900">#{item.title.toLowerCase()}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
                <code className="mt-4 block rounded-lg bg-slate-950 px-3 py-2 text-xs text-slate-100">
                  src/components/sections/{item.title}.js
                </code>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
