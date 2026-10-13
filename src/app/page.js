import Hero from "@/components/sections/Hero";
import BestSeller from "@/components/sections/BestSeller";
import LookbookStyles from "@/components/sections/LookbookStyles";
import Details from "@/components/sections/Details";
import ComboOffer from "@/components/sections/ComboOffer";
import StyleInspiration from "@/components/sections/StyleInspiration";
import OrderSection from "@/components/sections/OrderSection";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import ClosingBanner from "@/components/sections/ClosingBanner";

/**
 * Landing page chuyển đổi — bố cục theo mẫu thiết kế (fashion lookbook):
 * Hero → Best seller → Lookbook → Chi tiết chất liệu → Combo + countdown
 * → Gợi ý cách mặc → Đặt hàng nhanh → Đánh giá → Hỏi đáp → Banner kết.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <BestSeller />
      <LookbookStyles />
      <Details />
      <ComboOffer />
      <StyleInspiration />
      <OrderSection />
      <Reviews />
      <FAQ />
      <ClosingBanner />
    </main>
  );
}
