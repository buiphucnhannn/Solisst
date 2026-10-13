"use client";

import Image from "next/image";
import { IMAGES, getProduct } from "@/lib/products";
import { selectForOrder } from "@/lib/order-bus";
import { track } from "@/lib/track";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Icon, ScriptNote, SilkDrape } from "@/components/ui/Decor";

const LOOKS = [
  { title: "Elegant dresses", sub: "Thanh lịch & sang trọng", image: IMAGES.mochaFront, productId: "dam-satin-mocha" },
  { title: "Party dresses", sub: "Nữ tính & dịu dàng", image: IMAGES.blush, productId: "dam-tulle-blush" },
  { title: "Everyday looks", sub: "Trẻ trung & thoải mái", image: IMAGES.pjFloral, productId: "bo-babydoll-coc-tay", colorId: "floral" },
  { title: "Pajamas & more", sub: "Tiện lợi mỗi ngày", image: IMAGES.pjNavy, productId: "bo-babydoll-coc-tay", colorId: "navy" },
];

/**
 * "Nhiều phong cách cho nhiều phiên bản của bạn" — 4 thẻ phong cách,
 * bấm mũi tên là mẫu đó được điền sẵn vào form đặt hàng.
 */
export default function LookbookStyles() {
  function pick(look) {
    const p = getProduct(look.productId);
    track("AddToCart", { id: p.id, name: p.name, value: p.salePrice });
    selectForOrder({ productId: look.productId, colorId: look.colorId });
  }

  return (
    <section id="lookbook" className="bg-paper-texture relative overflow-hidden py-16 sm:py-20">
      <SilkDrape data-reveal="fade" data-reveal-delay="200" className="absolute -top-10 -right-16 h-[360px] w-[340px] opacity-90 sm:h-[440px] sm:w-[420px]" />
      <Container className="relative">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading reveal="left"
            eyebrow="Lookbook"
            title={
              <>
                <em>Nhiều phong cách</em>
                <br />
                cho nhiều phiên bản của bạn
              </>
            }
            description="Từ những buổi tiệc sang trọng đến những ngày thường nhẹ nhàng, Solisst luôn có thiết kế phù hợp với cá tính của bạn."
          />
          <ScriptNote data-reveal="fade" data-reveal-delay="350" lines={["Find", "Your Look"]} className="mr-6 hidden -rotate-12 text-5xl md:block lg:mr-24" />
        </div>

        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {LOOKS.map((look, i) => (
            <button
              key={look.title}
              type="button"
              onClick={() => pick(look)}
              data-reveal={i % 2 ? "tilt-right" : "tilt-left"}
              style={{ "--reveal-delay": `${i * 100}ms` }}
              className="group relative aspect-[3/4] w-[70%] shrink-0 snap-start overflow-hidden rounded-md bg-sand text-left sm:w-[42%] md:w-auto"
            >
              <Image
                src={look.image}
                alt={`${look.title} — ${look.sub}`}
                fill
                sizes="(min-width: 768px) 32vw, 95vw"
                className="origin-top object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/75 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <div className="text-white">
                  <p className="text-[12px] font-semibold tracking-[0.18em] uppercase">{look.title}</p>
                  <p className="mt-0.5 text-[12px] text-white/75">{look.sub}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-ink transition-colors group-hover:bg-plum group-hover:text-white">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button data-reveal="pop" data-reveal-delay="150" href="/bo-suu-tap" variant="outline" arrow>
            Xem toàn bộ bộ sưu tập
          </Button>
        </div>
      </Container>
    </section>
  );
}
