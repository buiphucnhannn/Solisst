"use client";

import { useRef } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/products";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * ⚠️ NỘI DUNG MẪU cho bản demo — thay bằng đánh giá / feedback thật của khách
 * (ảnh khách mặc, ảnh chụp inbox) trước khi chạy quảng cáo.
 */
const REVIEWS = [
  { name: "Ngọc Anh", city: "Hà Nội", image: IMAGES.mochaFront, text: "Váy mặc lên rất tôn dáng, chất vải đẹp ngoài mong đợi! Khăn choàng che bắp tay khéo lắm." },
  { name: "Phương Linh", city: "Bắc Ninh", image: IMAGES.pjNavy, text: "Bộ mặc nhà xinh, vải mát, giao hàng nhanh, shop tư vấn size rất nhiệt tình." },
  { name: "Thu Thảo", city: "TP. Hồ Chí Minh", image: IMAGES.blush, text: "Mình đã mua 2 lần, chất lượng luôn ổn định, sẽ ủng hộ thêm." },
  { name: "Minh Anh", city: "Hải Phòng", image: IMAGES.pjPudding, text: "Lấy combo 3 bộ mặc nhà giá quá hời, vải mát lạnh, mặc ngủ không bí." },
  { name: "Hà My", city: "Đà Nẵng", image: IMAGES.pjBunny, text: "Bộ dài tay dày dặn mà vẫn thoáng, hoạ tiết dễ thương y hình." },
];

export default function Reviews() {
  const track = useRef(null);

  function scroll(dir) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("figure");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  }

  return (
    <section id="reviews" className="bg-cream py-16 sm:py-20">
      <Container>
        <SectionHeading reveal="zoom"
          align="center"
          size="md"
          title="Khách hàng nói gì về Solisst?"
          description="Hàng ngàn cô gái đã tin chọn và yêu thích những thiết kế của Solisst."
        />

        <div className="relative mt-10 sm:px-12">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Đánh giá trước"
            className="absolute top-1/2 left-0 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-white text-ink-soft transition hover:border-plum hover:text-plum sm:grid"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Đánh giá tiếp theo"
            className="absolute top-1/2 right-0 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-white text-ink-soft transition hover:border-plum hover:text-plum sm:grid"
          >
            ›
          </button>

          <div ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0">
            {REVIEWS.map((r, i) => (
              <figure
                key={r.name}
                data-reveal="flip"
                data-reveal-delay={Math.min(i, 3) * 120}
                className="flex w-[86%] shrink-0 snap-start gap-4 rounded-lg bg-white p-3 shadow-[0_20px_40px_-30px_rgba(42,30,27,0.5)] ring-1 ring-ink/5 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <div className="relative w-24 shrink-0 overflow-hidden rounded-md bg-sand sm:w-28">
                  <Image src={r.image} alt="" fill sizes="180px" className="object-cover object-top" />
                </div>
                <div className="flex min-w-0 flex-col py-1 pr-1">
                  <p className="text-[13px] tracking-wider text-[#d4a24c]" aria-label="5 sao">
                    ★★★★★
                  </p>
                  <blockquote className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-soft">“{r.text}”</blockquote>
                  <figcaption className="mt-3">
                    <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                    <p className="text-[11.5px] text-ink-soft/60">{r.city}</p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
