"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, discountPercent, getProduct } from "@/lib/products";
import { selectForOrder } from "@/lib/order-bus";
import { track } from "@/lib/track";
import { cn, formatVND } from "@/lib/utils";
import Container from "@/components/ui/Container";
import { Icon } from "@/components/ui/Decor";

// "Sân khấu" be loang mềm, không mép — ảnh tách nền đứng trên đó hoà vào nền trang
const STAGE = "bg-[radial-gradient(58%_52%_at_50%_58%,#eadccd_0%,rgba(234,220,205,0.55)_55%,transparent_78%)]";

/** Ảnh tách nền: dáng toàn thân thì mờ dần chân váy, ảnh cận thì mờ tròn 4 phía. */
function GalleryImage({ src, alt, sizes, eager = false, hover = false }) {
  const detail = src === IMAGES.mochaDetailCut;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : undefined}
      quality={eager ? 85 : undefined}
      className={cn(
        "transition-transform duration-700",
        detail
          ? "object-cover [mask-image:radial-gradient(closest-side,#000_68%,transparent)]"
          : "object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_84%,transparent)]",
        hover && "group-hover:scale-105",
      )}
    />
  );
}

const PERKS = [
  { icon: "swap", label: "Đổi size dễ dàng" },
  { icon: "chat", label: "Tư vấn tận tâm" },
  { icon: "truck", label: "Giao hàng toàn quốc" },
];

/**
 * Sản phẩm chủ lực — bố cục 3 cột theo mẫu: ảnh lớn | thông tin + chọn size | 2 ảnh chi tiết.
 */
export default function BestSeller() {
  const product = getProduct("dam-satin-mocha");
  const [main, setMain] = useState(product.gallery[0]);
  const [size, setSize] = useState("");
  const [colorId, setColorId] = useState(product.colors[0].id);
  const side = product.gallery.filter((src) => src !== main).slice(0, 2);

  function order() {
    track("AddToCart", { id: product.id, name: product.name, value: product.salePrice });
    selectForOrder({ productId: product.id, colorId, size: size || undefined });
  }

  return (
    <section id="best-seller" className="relative bg-cream py-16 sm:py-20">
      <Container>
        <div className="grid items-stretch gap-6 md:grid-cols-[1fr_1.15fr] lg:grid-cols-[1fr_1.2fr_0.72fr] lg:gap-8">
          {/* Ảnh chính */}
          <div data-reveal="left" className={cn("relative aspect-[3/4] md:aspect-auto md:min-h-[560px]", STAGE)}>
            <GalleryImage
              key={main}
              src={main}
              alt={`${product.name} — ảnh chính`}
              eager
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 45vw, 100vw"
            />
          </div>

          {/* Thông tin */}
          <div data-reveal="blur" style={{ "--reveal-delay": "120ms" }} className="flex flex-col justify-center py-2 lg:px-4">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-rose uppercase">Best seller</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-plum sm:text-[2.6rem]">Váy Dạ Hội Satin</h2>
            <p className="mt-1 text-sm text-ink-soft/70">
              {product.name} · {product.subtitle.toLowerCase()}
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-serif text-[2rem] font-semibold text-sale">{formatVND(product.salePrice)}</span>
              <span className="text-sm text-ink-soft/50 line-through">{formatVND(product.price)}</span>
              <span className="rounded-full bg-sale px-2.5 py-0.5 text-[11px] font-bold text-white">
                -{discountPercent(product)}%
              </span>
            </div>

            <div className="mt-6 grid grid-cols-[72px_1fr] items-center gap-y-4 text-sm">
              <span className="font-medium text-ink">Màu sắc</span>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColorId(c.id)}
                    aria-label={c.label}
                    aria-pressed={c.id === colorId}
                    className={cn(
                      "h-7 w-7 rounded-full ring-offset-2 ring-offset-cream transition",
                      c.id === colorId ? "ring-2 ring-plum" : "ring-1 ring-ink/15",
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                <span className="text-xs text-ink-soft/70">{product.colors.find((c) => c.id === colorId)?.label}</span>
              </div>

              <span className="font-medium text-ink">Size</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSize(s.id)}
                    aria-pressed={s.id === size}
                    title={s.hint}
                    className={cn(
                      "h-9 min-w-12 rounded-sm border px-3 text-[13px] transition",
                      s.id === size ? "border-plum bg-plum text-white" : "border-ink/15 bg-white/60 hover:border-plum/50",
                    )}
                  >
                    {s.id}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 pl-[72px] text-[11px] text-ink-soft/60">
              {size ? `Size ${size} phù hợp ${product.sizes.find((s) => s.id === size)?.hint}` : "Chưa chắc size? Xem bảng size ở form đặt hàng."}
            </p>

            <button
              type="button"
              onClick={order}
              className="group mt-7 inline-flex h-13 w-full max-w-sm items-center justify-center gap-2.5 rounded-md bg-plum text-[13px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_12px_28px_-12px_rgba(123,30,46,0.75)] transition hover:bg-plum-dark"
            >
              Chọn mẫu & đặt hàng
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <Link
              href={`/san-pham/${product.id}`}
              className="mt-3 block w-full max-w-sm text-center text-[12.5px] font-medium text-plum underline decoration-plum/30 underline-offset-[6px] hover:decoration-plum"
            >
              Xem chi tiết sản phẩm
            </Link>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-5">
              {PERKS.map((p) => (
                <li key={p.label} className="flex items-center gap-2 text-[12px] text-ink-soft">
                  <Icon name={p.icon} className="h-4 w-4 text-plum" />
                  {p.label}
                </li>
              ))}
            </ul>
          </div>

          {/* 2 ảnh chi tiết — bấm để xem lớn */}
          <div className="grid grid-cols-2 gap-4 md:col-span-2 lg:col-span-1 lg:grid-cols-1 lg:grid-rows-2">
            {side.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setMain(src)}
                data-reveal="right"
                style={{ "--reveal-delay": `${200 + i * 100}ms` }}
                className={cn("group relative aspect-[4/5] lg:aspect-auto", STAGE)}
                aria-label="Xem ảnh lớn"
              >
                <GalleryImage src={src} alt="" sizes="(min-width: 1024px) 300px, 50vw" hover />
                <span className="absolute right-2 bottom-2 grid h-8 w-8 place-items-center rounded-full bg-cream/90 text-plum opacity-0 transition group-hover:opacity-100">
                  +
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
