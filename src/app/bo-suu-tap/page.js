import { collectionItems } from "@/lib/products";
import CollectionHero from "@/components/collection/CollectionHero";
import CollectionGrid from "@/components/collection/CollectionGrid";
import PromiseStrip from "@/components/product/PromiseStrip";
import ClosingBanner from "@/components/sections/ClosingBanner";

export const metadata = {
  title: "Bộ sưu tập — Đầm dạ hội & đồ mặc nhà",
  description:
    "Khám phá bộ sưu tập Solisst Thu – Đông 2026: đầm dạ hội satin, tulle và đồ bộ mặc nhà cotton lụa. Flash sale đến 35%, freeship combo 2 sản phẩm.",
  alternates: { canonical: "/bo-suu-tap" },
};

export default function CollectionPage() {
  const items = collectionItems();

  return (
    <main>
      <CollectionHero count={items.length} />
      <CollectionGrid items={items} />
      <PromiseStrip />
      <ClosingBanner ctaHref="/#dat-hang" />
    </main>
  );
}
