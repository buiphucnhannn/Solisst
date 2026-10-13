"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMBOS, categoryLabel, discountPercent, isCutout, productGallery, productUrl, quote } from "@/lib/products";
import { track } from "@/lib/track";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { siteConfig } from "@/lib/site";
import { cn, formatVND } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Countdown from "@/components/ui/Countdown";
import { Icon } from "@/components/ui/Decor";
import SizeTable from "@/components/order/SizeTable";
import CheckoutDrawer from "@/components/product/CheckoutDrawer";

const STAGE = "bg-[radial-gradient(70%_60%_at_50%_60%,#f3e8dc_0%,#eadccd_60%,#e3d1be_100%)]";

// Đọc ?mau= trên URL (link từ thẻ hoạ tiết ở trang Bộ sưu tập) — server trả null để không lệch hydration
const subscribeUrl = (cb) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};
const readColorParam = () => new URLSearchParams(window.location.search).get("mau");
const serverColorParam = () => null;

// Link breadcrumb: không gạch chân, chỉ đổi sang đỏ mận khi rê chuột
const CRUMB = "transition-colors hover:text-plum";

const SHIPPING_INFO = [
  "Giao toàn quốc 2–4 ngày, nội thành Hà Nội – Bắc Ninh 1–2 ngày.",
  "Freeship cho đơn từ 2 sản phẩm, đơn lẻ phí ship 30.000đ.",
  "Được mở hộp kiểm tra hàng, ưng ý mới thanh toán (COD).",
  "Đổi size miễn phí trong 7 ngày khi sản phẩm còn tag, chưa giặt.",
];

export default function ProductView({ product }) {
  const colorParam = useSyncExternalStore(subscribeUrl, readColorParam, serverColorParam);
  const [pickedColor, setPickedColor] = useState(null);
  const [slide, setSlide] = useState(0);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0].id : "");
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  const multi = product.colors.length > 1;
  const colorId =
    pickedColor ?? (product.colors.some((c) => c.id === colorParam) ? colorParam : product.colors[0].id);
  const color = product.colors.find((c) => c.id === colorId);
  const gallery = productGallery(product);
  // Nhiều màu: ảnh đang xem = ảnh của màu đang chọn; 1 màu: lướt gallery tự do
  const active = multi ? product.colors.findIndex((c) => c.id === colorId) : slide;
  const price = quote(product, qty);

  useEffect(() => {
    track("ViewContent", { id: product.id, name: product.name, value: product.salePrice });
  }, [product]);

  function pickColor(id) {
    setPickedColor(id);
    window.history.replaceState(null, "", productUrl(product, id));
  }

  function go(i) {
    const next = (i + gallery.length) % gallery.length;
    if (multi) pickColor(product.colors[next].id);
    else setSlide(next);
  }

  function order() {
    if (!size) {
      setSizeError(true);
      smoothScrollTo("chon-size", { align: "center" });
      return;
    }
    track("AddToCart", { id: product.id, name: product.name, qty, value: price.total });
    track("InitiateCheckout", { id: product.id, name: product.name, qty, value: price.total });
    setCheckoutOpen(true);
  }

  const src = gallery[active];

  return (
    <section className="bg-cream pt-4 pb-16 lg:pb-20">
      <Container>
        <nav data-reveal="down" aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 text-[12.5px] text-ink-soft/70">
          <Link href="/" className={CRUMB}>
            Trang chủ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/bo-suu-tap" className={CRUMB}>
            Bộ sưu tập
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/bo-suu-tap?danh-muc=${product.collection}`} className={CRUMB}>
            {categoryLabel(product.collection)}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-plum">
            {product.name}
          </span>
        </nav>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          {/* ===== Gallery ===== */}
          <div data-reveal="left" className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[76px_minmax(0,1fr)] lg:sticky lg:top-32 lg:self-start">
            <div className="no-scrollbar order-2 flex gap-3 overflow-x-auto md:order-none md:flex-col md:overflow-visible">
              {gallery.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={multi ? product.colors[i].label : `Ảnh ${i + 1}`}
                  aria-current={i === active}
                  className={cn(
                    "relative h-24 w-[4.75rem] shrink-0 overflow-hidden rounded-lg transition",
                    STAGE,
                    i === active ? "ring-2 ring-plum ring-offset-2 ring-offset-cream" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <Image src={g} alt="" fill loading="eager" quality={85} sizes="120px" className={isCutout(g) ? "object-contain object-bottom pt-1" : "object-cover object-top"} />
                </button>
              ))}
            </div>

            <div className={cn("group relative aspect-[4/5] overflow-hidden rounded-2xl", STAGE)}>
              <Image
                key={src}
                src={src}
                alt={`${product.name} — ${multi ? color.label : `ảnh ${active + 1}`}`}
                fill
                loading="eager"
                fetchPriority="high"
                quality={85}
                sizes="(min-width: 1024px) 560px, 100vw"
                className={
                  isCutout(src)
                    ? "object-contain object-bottom px-[6%] pt-[5%] [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
                    : "object-cover object-top"
                }
              />
              <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-[10.5px] font-semibold tracking-[0.16em] text-plum uppercase">
                {product.tag}
              </span>
              {gallery.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(active - 1)}
                    aria-label="Ảnh trước"
                    className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-plum opacity-0 shadow-sm transition group-hover:opacity-100 max-md:opacity-100"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => go(active + 1)}
                    aria-label="Ảnh tiếp theo"
                    className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-plum opacity-0 shadow-sm transition group-hover:opacity-100 max-md:opacity-100"
                  >
                    ›
                  </button>
                  <span className="absolute right-4 bottom-4 rounded-full bg-ink/55 px-2.5 py-1 text-[11px] text-white tabular-nums">
                    {active + 1} / {gallery.length}
                  </span>
                </>
              ) : null}
            </div>
          </div>

          {/* ===== Thông tin ===== */}
          <div data-reveal="right" data-reveal-delay="150">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-rose uppercase">{categoryLabel(product.collection)}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-plum sm:text-[2.75rem]">{product.name}</h1>
            <p className="mt-1.5 text-[14px] text-ink-soft/75">{product.subtitle}</p>
            <p className="mt-3 flex items-center gap-2 text-[12.5px] text-ink-soft">
              <span className="tracking-wider text-[#d4a24c]">★★★★★</span>
              Được khách hàng yêu thích
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="font-serif text-[2.2rem] leading-none font-semibold text-sale">{formatVND(product.salePrice)}</span>
              <span className="text-[15px] text-ink-soft/50 line-through">{formatVND(product.price)}</span>
              <span className="rounded-full bg-sale px-2.5 py-0.5 text-[11.5px] font-bold text-white">-{discountPercent(product)}%</span>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-plum/[0.06] px-4 py-3 ring-1 ring-plum/10">
              <p className="flex items-center gap-2 text-[12.5px] font-medium text-plum">
                <Icon name="clock" className="h-4 w-4" />
                Flash sale kết thúc sau
              </p>
              <Countdown className="text-[15px] font-semibold text-sale" />
            </div>

            <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft">{product.description}</p>

            {/* Màu */}
            <div className="mt-6">
              <p className="text-[13px] font-medium text-ink">
                {multi ? "Hoạ tiết" : "Màu"}: <span className="font-normal text-ink-soft">{color.label}</span>
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Chọn màu">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={c.id === colorId}
                    aria-label={c.label}
                    title={c.label}
                    onClick={() => pickColor(c.id)}
                    className={cn(
                      "h-8 w-8 rounded-full ring-offset-2 ring-offset-cream transition",
                      c.id === colorId ? "ring-2 ring-plum" : "ring-1 ring-ink/15 hover:ring-plum/40",
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6" id="chon-size">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium text-ink">Size</p>
                <details className="group relative">
                  <summary className="cursor-pointer list-none text-[12px] text-rose underline underline-offset-4 [&::-webkit-details-marker]:hidden">
                    Bảng size
                  </summary>
                  <div className="absolute right-0 z-20 mt-2 w-[min(320px,85vw)] rounded-lg bg-white p-3 shadow-xl ring-1 ring-ink/10">
                    <SizeTable collection={product.collection} />
                  </div>
                </details>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2" role="radiogroup" aria-label="Chọn size">
                {product.sizes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={s.id === size}
                    onClick={() => {
                      setSize(s.id);
                      setSizeError(false);
                    }}
                    className={cn(
                      "flex h-12 min-w-16 flex-col items-center justify-center rounded-md border px-3 transition",
                      s.id === size ? "border-plum bg-plum text-white" : "border-ink/15 bg-white/70 hover:border-plum/50",
                      sizeError && "border-sale/60",
                    )}
                  >
                    <span className="text-[13.5px] font-semibold">{s.id}</span>
                    <span className={cn("text-[10px]", s.id === size ? "text-white/75" : "text-ink-soft/60")}>{s.hint}</span>
                  </button>
                ))}
              </div>
              {sizeError ? <p className="mt-2 text-xs font-medium text-sale">Vui lòng chọn size trước khi đặt hàng</p> : null}
            </div>

            {/* Combo */}
            <div className="mt-6">
              <p className="text-[13px] font-medium text-ink">Số lượng / combo</p>
              <div className="mt-2.5 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Chọn combo">
                {COMBOS.map((c) => {
                  const q = quote(product, c.qty);
                  const on = c.qty === qty;
                  return (
                    <button
                      key={c.qty}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setQty(c.qty)}
                      className={cn(
                        "relative rounded-lg border px-2 py-3 text-center transition",
                        on ? "border-plum bg-plum/[0.06]" : "border-ink/15 bg-white/60 hover:border-plum/40",
                      )}
                    >
                      {c.popular ? (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-sale px-2 py-0.5 text-[9px] font-bold tracking-wider whitespace-nowrap text-white uppercase">
                          Hời nhất
                        </span>
                      ) : null}
                      <p className="text-[13px] font-semibold text-ink">{c.qty} cái</p>
                      <p className="mt-0.5 text-[13px] font-semibold text-sale">{formatVND(q.total)}</p>
                      <p className="mt-1 text-[10px] leading-tight text-ink-soft/70">{c.perk}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div id="mua" className="mt-7 flex scroll-mt-40 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={order}
                className="group flex h-13 w-full items-center sm:w-auto sm:flex-1 justify-center gap-2.5 rounded-md bg-plum px-6 text-[13.5px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_14px_30px_-12px_rgba(123,30,46,0.8)] transition hover:bg-plum-dark"
              >
                Đặt hàng · {formatVND(price.total)}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <a
                href={siteConfig.contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-13 items-center justify-center gap-2 rounded-md border border-plum/30 px-5 text-[12.5px] font-semibold tracking-[0.1em] text-plum uppercase transition hover:bg-plum hover:text-white"
              >
                <Icon name="chat" className="h-4 w-4" />
                Tư vấn Zalo
              </a>
            </div>
            {price.saved > 0 && qty > 1 ? (
              <p className="mt-2.5 text-[12px] text-plum">
                Combo {qty} giúp bạn tiết kiệm {formatVND(price.saved)} so với giá gốc.
              </p>
            ) : null}

            {/* Thông tin thêm */}
            <div data-reveal="up" data-reveal-delay="200" className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              <Accordion title="Mô tả & điểm nổi bật" defaultOpen>
                <ul className="space-y-1.5">
                  {product.highlights?.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-rose">✦</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Chất liệu & bảo quản">
                <p>
                  <span className="font-medium text-ink">Chất liệu:</span> {product.material}.
                </p>
                <p className="mt-2">{product.care}</p>
              </Accordion>
              <Accordion title="Giao hàng & đổi trả">
                <ul className="space-y-1.5">
                  {SHIPPING_INFO.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-rose">✦</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>

      <CheckoutDrawer open={checkoutOpen} onClose={closeCheckout} product={product} color={color} size={size} qty={qty} />
    </section>
  );
}

function Accordion({ title, defaultOpen = false, children }) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[14px] font-medium text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-lg text-plum transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <div className="pb-5 text-[13.5px] leading-relaxed text-ink-soft">{children}</div>
    </details>
  );
}
