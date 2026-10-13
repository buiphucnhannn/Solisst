import Link from "next/link";
import { IMAGES } from "@/lib/products";
import Container from "@/components/ui/Container";
import Cutout from "@/components/ui/Cutout";
import { ScriptNote } from "@/components/ui/Decor";

/**
 * Đầu trang Bộ sưu tập — cùng "căn phòng" tông be với hero trang chủ,
 * 3 người mẫu tách nền đứng cạnh nhau như một buổi trình diễn.
 */
export default function CollectionHero({ count }) {
  return (
    <section className="relative -mt-24 overflow-hidden bg-[linear-gradient(100deg,#f4ebe1_0%,#ecdccc_55%,#dcc5ae_100%)] pt-24 lg:-mt-[6.5rem] lg:pt-[6.5rem]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[480px] w-[480px] rounded-full bg-white/60 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#d5bda5]/45 to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid items-end gap-8 lg:min-h-[460px] lg:grid-cols-[1fr_1.1fr]">
          <div className="self-center pt-8 pb-2 lg:py-14">
            <nav data-reveal="down" aria-label="Breadcrumb" className="text-[12px] text-ink-soft/70">
              <Link href="/" className="hover:text-plum">
                Trang chủ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-plum">Bộ sưu tập</span>
            </nav>
            <p data-reveal="up" data-reveal-delay="100" className="mt-6 text-[11px] font-semibold tracking-[0.3em] text-rose uppercase">Solisst · Thu – Đông 2026</p>
            <h1 data-reveal="blur" data-reveal-delay="180" className="mt-4 font-serif text-5xl leading-[1.05] text-plum italic sm:text-6xl lg:text-7xl">Bộ sưu tập</h1>
            <p data-reveal="up" data-reveal-delay="320" className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Từ đầm dạ hội sang trọng đến đồ mặc nhà mềm mại — mỗi thiết kế đều được chọn chất liệu kỹ lưỡng
              để bạn đẹp và thoải mái trong từng khoảnh khắc.
            </p>
            <ul data-reveal="up" data-reveal-delay="440" className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-ink-soft">
              <li>
                <span className="font-serif text-xl text-plum">{count}</span> thiết kế
              </li>
              <li>
                <span className="font-serif text-xl text-plum">0đ</span> ship combo 2+
              </li>
            </ul>
          </div>

          {/* Trình diễn 3 người mẫu — ẩn trên mobile để lưới sản phẩm lên sớm hơn */}
          <div className="relative hidden h-[420px] sm:block lg:h-[460px]">
            <Cutout data-reveal="rise" data-reveal-delay="250"
              src={IMAGES.mochaBackCut}
              alt=""
              ratio="661 / 1563"
              sizes="180px"
              eager
              glow={false}
              fadeBottom
              shadow={false}
              className="absolute bottom-0 left-[6%] h-[80%] opacity-95"
            />
            <Cutout data-reveal="rise" data-reveal-delay="100"
              src={IMAGES.blushCut}
              alt="Đầm tulle Blush"
              ratio="797 / 1541"
              sizes="240px"
              eager
              glow={false}
              className="absolute bottom-[3%] left-1/2 z-10 h-[94%] -translate-x-1/2"
            />
            <Cutout data-reveal="rise" data-reveal-delay="400"
              src={IMAGES.mochaFrontCut}
              alt="Đầm lụa satin Mocha"
              ratio="796 / 1539"
              sizes="200px"
              eager
              glow={false}
              fadeBottom
              shadow={false}
              className="absolute right-[4%] bottom-0 h-[84%]"
            />
            <ScriptNote data-reveal="fade" data-reveal-delay="800" lines={["New", "Season"]} className="absolute top-0 -right-3 z-20 hidden -rotate-12 text-[2.2rem] lg:block 2xl:top-0 2xl:-right-16 2xl:text-5xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
