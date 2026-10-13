"use client";

import Image from "next/image";
import { COMBOS, IMAGES, SHIPPING_FEE, getProduct, quote } from "@/lib/products";
import { selectForOrder } from "@/lib/order-bus";
import { cn, formatK, formatVND } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Countdown from "@/components/ui/Countdown";
import { ScriptNote } from "@/components/ui/Decor";

// Ảnh váy đã tách nền — đặt trực tiếp lên thẻ như ảnh sản phẩm trong mẫu thiết kế
const STACKS = {
  1: [IMAGES.mochaFrontCut],
  2: [IMAGES.mochaFrontCut, IMAGES.blushCut],
  3: [IMAGES.mochaFrontCut, IMAGES.blushCut, IMAGES.mochaBackCut],
};

/**
 * "Mua nhiều hơn, tiết kiệm hơn" — 3 thẻ combo 1/2/3 sản phẩm (brief) + đồng hồ flash sale.
 * Giá minh hoạ theo Váy Satin; mẫu khác áp dụng cùng tỉ lệ giảm.
 */
export default function ComboOffer() {
  const ref = getProduct("dam-satin-mocha");

  return (
    <section id="combo" className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12">
          <div className="relative">
            <SectionHeading reveal="left"
              eyebrow="Ưu đãi đặc biệt"
              title={
                <em>
                  Mua nhiều hơn,
                  <br />
                  tiết kiệm hơn
                </em>
              }
              description="Chọn combo phù hợp với nhu cầu của bạn và nhận ưu đãi hấp dẫn. Được phối màu, phối mẫu tuỳ ý."
            />
            <ScriptNote data-reveal="fade" data-reveal-delay="400" lines={["Special", "Offer"]} className="absolute -top-6 right-0 -rotate-12 text-4xl sm:text-5xl lg:-right-4" />

            <div data-reveal="up" data-reveal-delay="200" className="mt-8 inline-flex flex-col gap-2 rounded-lg bg-paper px-5 py-4 ring-1 ring-plum/10">
              <p className="text-[10.5px] font-semibold tracking-[0.22em] text-plum uppercase">Ưu đãi kết thúc sau</p>
              <Countdown variant="boxes" />
            </div>
          </div>

          {/* Mobile: vuốt ngang 3 thẻ (đỡ dài trang); từ sm: lưới 3 cột */}
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-3 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0">
            {COMBOS.map((combo, i) => {
              const q = quote(ref, combo.qty);
              const price = q.subtotal - q.discount;
              const featured = combo.qty === 2;
              return (
                <button
                  key={combo.qty}
                  type="button"
                  onClick={() => selectForOrder({ qty: combo.qty })}
                  data-reveal="flip"
                  style={{ "--reveal-delay": `${i * 110}ms` }}
                  className={cn(
                    "group relative flex w-[72%] shrink-0 snap-center flex-col items-center rounded-lg bg-white/70 sm:w-auto px-4 pt-5 pb-5 text-center transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_rgba(42,30,27,0.5)]",
                    featured ? "ring-[1.5px] ring-plum" : "ring-1 ring-ink/10",
                  )}
                >
                  {combo.popular ? (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-sale px-2.5 py-0.5 text-[9.5px] font-bold tracking-wider text-white uppercase">
                      Hời nhất
                    </span>
                  ) : null}
                  <p className="text-[13px] text-ink-soft">Mua {combo.qty} sản phẩm</p>
                  <p className="mt-1 font-serif text-2xl font-semibold text-sale">{formatVND(price)}</p>

                  <div className="relative mt-4 flex h-36 items-end justify-center">
                    {STACKS[combo.qty].map((src, j, arr) => (
                      <div key={src} className="flex items-end">
                        {j > 0 ? <span className="z-10 -mx-1 mb-14 text-lg font-light text-ink/60">+</span> : null}
                        <div
                          className={cn(
                            "relative transition-transform duration-500",
                            arr.length === 1 ? "h-40 w-[5.3rem]" : arr.length === 2 ? "h-36 w-[4.7rem]" : "h-32 w-[4.1rem]",
                            j === 1 && "group-hover:-translate-y-1",
                          )}
                        >
                          <Image src={src} alt="" fill sizes="120px" className="object-contain object-bottom drop-shadow-[0_10px_14px_rgba(70,40,25,0.18)]" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-[11.5px] text-ink-soft/80">{combo.perk}</p>
                  {q.discount ? (
                    <span className="mt-2 rounded-sm bg-plum px-2.5 py-1 text-[10.5px] font-semibold text-white">
                      Tiết kiệm {formatK(q.discount + SHIPPING_FEE)}
                    </span>
                  ) : (
                    <span className="mt-2 rounded-sm bg-sand px-2.5 py-1 text-[10.5px] font-semibold text-ink-soft">Giá flash sale</span>
                  )}
                  <span className="mt-4 text-[11px] font-semibold tracking-[0.15em] text-plum uppercase underline-offset-4 group-hover:underline">
                    Chọn combo →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-6 text-right text-[11px] text-ink-soft/60">
          * Giá minh hoạ theo {ref.name}. Combo 2–3 sản phẩm được miễn phí giao hàng.
        </p>
      </Container>
    </section>
  );
}
