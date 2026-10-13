"use client";

import { useState, useSyncExternalStore } from "react";
import { CATEGORIES } from "@/lib/products";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Link from "next/link";
import ProductTile from "@/components/product/ProductTile";
import { ScriptNote, Sparkle } from "@/components/ui/Decor";

/** Thẻ ưu đãi combo cuối lưới — lấp ô trống cuối hàng, nhắc khách mua combo. */
function ComboTile(props) {
  return (
    <Link
      {...props}
      href="/#combo"
      className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl bg-plum p-4 text-cream sm:p-6"
    >
      <div aria-hidden="true" className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full border border-cream/15" />
      <div aria-hidden="true" className="absolute -right-6 -bottom-6 h-36 w-36 rounded-full border border-cream/10" />
      <Sparkle className="absolute top-6 right-6 h-4 w-4 text-nude/60" />
      <div>
        <p className="text-[10.5px] font-semibold tracking-[0.25em] text-nude uppercase">Ưu đãi combo</p>
        <ScriptNote lines={["Mix", "& Match"]} heart={false} className="mt-2 -rotate-6 text-[1.9rem] text-nude sm:mt-3 sm:text-5xl" />
      </div>
      <div className="relative">
        <p className="font-serif text-[1.15rem] leading-tight sm:text-3xl">
          Mua 2 giảm 10%
          <br />
          Mua 3 giảm 15%
        </p>
        <p className="mt-2 hidden text-[12.5px] text-cream/75 sm:block">Phối mẫu, màu, size tuỳ ý · Freeship toàn quốc</p>
        <span className="mt-3 inline-flex items-center gap-2 text-[11px] sm:mt-5 sm:text-[11.5px] font-semibold tracking-[0.15em] uppercase">
          Xem ưu đãi <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

const SORTS = [
  { id: "featured", label: "Nổi bật" },
  { id: "price-asc", label: "Giá thấp → cao" },
  { id: "price-desc", label: "Giá cao → thấp" },
  { id: "discount", label: "Giảm nhiều nhất" },
];

function sortItems(items, sort) {
  const list = [...items];
  if (sort === "price-asc") list.sort((a, b) => a.product.salePrice - b.product.salePrice);
  if (sort === "price-desc") list.sort((a, b) => b.product.salePrice - a.product.salePrice);
  if (sort === "discount") list.sort((a, b) => a.product.salePrice / a.product.price - b.product.salePrice / b.product.price);
  return list;
}

// Đọc ?danh-muc= (link từ breadcrumb trang chi tiết) — server trả null để không lệch hydration
const subscribeUrl = (cb) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};
const readCategoryParam = () => new URLSearchParams(window.location.search).get("danh-muc");
const serverCategoryParam = () => null;

/** Lưới sản phẩm + thanh lọc danh mục & sắp xếp. */
export default function CollectionGrid({ items }) {
  const categoryParam = useSyncExternalStore(subscribeUrl, readCategoryParam, serverCategoryParam);
  const [picked, setPicked] = useState(null);
  const category = picked ?? (CATEGORIES.some((c) => c.id === categoryParam) ? categoryParam : "all");

  function setCategory(id) {
    setPicked(id);
    window.history.replaceState(null, "", id === "all" ? "/bo-suu-tap" : `/bo-suu-tap?danh-muc=${id}`);
  }
  const [sort, setSort] = useState("featured");

  const visible = sortItems(
    items.filter((it) => category === "all" || it.product.collection === category),
    sort,
  );

  return (
    <section className="bg-cream pb-20">
      <div data-reveal="down" className="border-b border-ink/5 bg-cream">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1" role="tablist" aria-label="Danh mục">
              {CATEGORIES.map((c) => {
                const count = items.filter((it) => c.id === "all" || it.product.collection === c.id).length;
                const active = c.id === category;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "h-9 shrink-0 rounded-full px-4 text-[13px] transition",
                      active ? "bg-plum text-white" : "bg-paper text-ink-soft hover:bg-sand",
                    )}
                  >
                    {c.label} <span className={active ? "text-white/70" : "text-ink-soft/50"}>({count})</span>
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-2 text-[12.5px] text-ink-soft">
              Sắp xếp
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 rounded-md border border-ink/15 bg-white px-3 text-[13px] text-ink outline-none focus:border-plum"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Container>
      </div>

      <Container>
        <p data-reveal="fade" className="pt-8 text-[13px] text-ink-soft/70">
          Hiển thị <span className="font-semibold text-ink">{visible.length}</span> thiết kế
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {visible.map((item, i) => (
            <ProductTile data-reveal="up" data-reveal-delay={(i % 4) * 90} key={item.key} item={item} eager={i < 4} />
          ))}
          <ComboTile data-reveal="zoom" data-reveal-delay="200" />
        </div>
      </Container>
    </section>
  );
}
