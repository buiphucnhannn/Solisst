import Image from "next/image";
import { IMAGES } from "@/lib/products";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const OCCASIONS = [
  { image: IMAGES.blush, label: "Dự tiệc" },
  { image: IMAGES.mochaBack, label: "Hẹn hò" },
  { image: IMAGES.pjBunny, label: "Ở nhà" },
];

/** "Gợi ý cách mặc" — 3 dịp + câu trích dẫn. */
export default function StyleInspiration() {
  return (
    <section className="bg-sand/70 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.5fr_0.8fr] lg:gap-10">
          <SectionHeading reveal="left"
            eyebrow="Style inspiration"
            size="md"
            title="Gợi ý cách mặc"
            description="Một thiết kế, nhiều cách thể hiện cá tính. Hãy khám phá phong cách phù hợp với bạn."
          />

          <div className="grid grid-cols-3 gap-3">
            {OCCASIONS.map((o, i) => (
              <figure
                key={o.label}
                data-reveal="zoom"
                style={{ "--reveal-delay": `${i * 110}ms` }}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-paper"
              >
                <Image
                  src={o.image}
                  alt={`Gợi ý phối đồ ${o.label.toLowerCase()}`}
                  fill
                  sizes="(min-width: 1024px) 340px, 45vw"
                  className="origin-top object-cover object-top transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <figcaption className="absolute right-2 bottom-2 rounded-sm bg-cream/95 px-2.5 py-1 text-[11px] font-medium text-ink">
                  {o.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <blockquote data-reveal="blur" data-reveal-delay="350" className="text-center font-serif text-2xl leading-snug text-rose italic lg:text-[1.65rem]">
            “Mỗi ngày đều là một phiên bản tốt đẹp hơn của bạn.”
            <svg viewBox="0 0 40 36" className="mx-auto mt-4 h-5 w-6 text-rose" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M20 33C8 24 3 17 3 11a8 8 0 0 1 17-3 8 8 0 0 1 17 3c0 6-5 13-17 22Z" />
            </svg>
          </blockquote>
        </div>
      </Container>
    </section>
  );
}
