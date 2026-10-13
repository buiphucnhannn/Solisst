import Image from "next/image";
import { IMAGES } from "@/lib/products";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SatinPanel, SilkDrape } from "@/components/ui/Decor";

const DETAILS = [
  { image: IMAGES.mochaDetailCut, title: "Chất liệu cao cấp", desc: "Mềm mại, thoáng mát" },
  { image: IMAGES.blushCut, title: "Form dáng tôn dáng", desc: "Che khuyết điểm, nổi bật vóc dáng" },
  { image: IMAGES.mochaBackCut, title: "Đường may tinh tế", desc: "Tỉ mỉ trong từng chi tiết" },
];

/**
 * "Đẹp hơn trong từng chi tiết" — nửa trái tấm satin full-bleed, nửa phải nội dung.
 */
export default function Details() {
  return (
    <section className="bg-paper-texture relative overflow-hidden py-16 sm:py-20">
      {/* Khối nằm trong Container (không tràn viền) → thẳng hàng các section khác ở mọi mức zoom */}
      <Container>
        <div className="grid overflow-hidden rounded-2xl bg-cream/50 ring-1 ring-ink/5 lg:grid-cols-[0.95fr_1.05fr]">
          <SatinPanel data-reveal="curtain" className="min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
            <div className="flex h-full min-h-[inherit] items-center justify-center p-10">
              <p data-reveal="blur" data-reveal-delay="650" className="text-center font-serif text-3xl leading-snug text-cream italic drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:text-[2.6rem]">
                The Details
                <br />
                Make The Difference
              </p>
            </div>
          </SatinPanel>

          <div className="relative flex items-center overflow-hidden px-5 py-12 sm:px-10 lg:px-14 lg:py-14">
            <SilkDrape data-reveal="fade" data-reveal-delay="300" flip className="absolute -right-24 -bottom-20 h-[380px] w-[360px] opacity-80" />
            <div className="relative w-full max-w-xl">
              <SectionHeading reveal="right"
                eyebrow="Chất liệu & thiết kế"
                size="md"
                title="Đẹp hơn trong từng chi tiết"
                description="Solisst chú trọng đến chất liệu và form dáng để mang lại trải nghiệm thoải mái nhưng vẫn tôn lên nét thanh lịch."
              />
              <ul className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
                {DETAILS.map((d, i) => (
                  <li key={d.title} data-reveal="pop" style={{ "--reveal-delay": `${i * 110}ms` }}>
                    <div className="relative aspect-square w-16 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_40%,#f6ece2,#e6d5c3)] sm:w-20">
                      <Image src={d.image} alt="" fill sizes="120px" className="object-cover object-top" />
                    </div>
                    <p className="mt-4 text-[13px] font-semibold text-ink sm:text-sm">{d.title}</p>
                    <p className="mt-1 text-[12px] leading-snug text-ink-soft/70">{d.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
