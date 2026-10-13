import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PRODUCTS, collectionItems, getProduct, productGallery } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductView from "@/components/product/ProductView";
import ProductTile from "@/components/product/ProductTile";
import PromiseStrip from "@/components/product/PromiseStrip";

/** Tạo sẵn trang tĩnh cho mọi sản phẩm lúc build. */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const image = productGallery(product).find((src) => !src.includes("-cut-")) ?? product.colors[0].image;
  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    alternates: { canonical: `/san-pham/${product.id}` },
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
      images: [{ url: image, alt: product.name }],
    },
  };
}

/**
 * Khung trang hiện ngay khi điều hướng (Partial Prefetching), nội dung theo slug
 * đổ vào trong <Suspense> — đúng khuyến nghị của Next 16 cho params động.
 */
export default function ProductPage({ params }) {
  return (
    <main>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}

function ProductSkeleton() {
  return (
    <section className="bg-cream pt-4 pb-16" aria-busy="true" aria-label="Đang tải sản phẩm">
      <Container>
        <div className="h-4 w-64 animate-pulse rounded bg-sand" />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="aspect-[4/5] animate-pulse rounded-2xl bg-sand/70" />
          <div className="space-y-4">
            <div className="h-3 w-24 animate-pulse rounded bg-sand" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-sand" />
            <div className="h-8 w-1/2 animate-pulse rounded bg-sand" />
            <div className="h-24 w-full animate-pulse rounded bg-sand/70" />
            <div className="h-12 w-full animate-pulse rounded bg-sand" />
          </div>
        </div>
      </Container>
    </section>
  );
}

async function ProductContent({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = collectionItems().filter((it) => it.featured && it.product.id !== product.id);

  // Dữ liệu có cấu trúc cho Google (giá, tình trạng còn hàng)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.colors.map((c) => new URL(c.image, siteConfig.url).href),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "VND",
      price: product.salePrice,
      availability: "https://schema.org/InStock",
      url: new URL(`/san-pham/${product.id}`, siteConfig.url).href,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductView product={product} />
      <PromiseStrip />

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <SectionHeading reveal="left" eyebrow="Gợi ý cho bạn" size="md" title={<em>Có thể bạn cũng thích</em>} />
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
            {related.map((item, i) => (
              <ProductTile data-reveal="up" data-reveal-delay={i * 110} key={item.key} item={item} sizes="(min-width: 640px) 33vw, 50vw" />
            ))}
          </div>
        </Container>
      </section>

    </>
  );
}
