import Hero from "@/components/sections/Hero";
import PlaceholderSections from "@/components/sections/PlaceholderSections";

/**
 * Trang chủ — lắp ráp các section như lego.
 * Thêm section mới: tạo file trong src/components/sections/
 * rồi import + render ở đây theo thứ tự mong muốn.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <PlaceholderSections />
      {/* TODO: thay PlaceholderSections bằng:
          <Features />
          <Showcase />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CTA />
      */}
    </main>
  );
}
