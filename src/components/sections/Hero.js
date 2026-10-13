import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { IMAGES } from "@/lib/products";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Cutout from "@/components/ui/Cutout";
import { ScriptNote, Sparkle, SunHalo } from "@/components/ui/Decor";

/**
 * Hero — vừa khít 1 màn hình (100svh, header trong suốt nằm đè lên).
 * Cỡ chữ co theo chiều cao màn hình để không tràn trên laptop màn thấp.
 * Mobile: chữ ở trên, người mẫu lấp phần còn lại phía dưới.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative -mt-24 flex h-[100svh] max-h-[1080px] min-h-[600px] flex-col overflow-hidden bg-[linear-gradient(100deg,#f4ebe1_0%,#ecdccc_55%,#dcc5ae_100%)] pt-24 lg:-mt-[6.5rem] lg:min-h-[640px] lg:pt-[6.5rem]"
    >
      {/* ===== Nền phòng ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[560px] w-[560px] rounded-full bg-white/60 blur-3xl" />
        <div className="absolute top-[35%] -left-28 h-80 w-52 rounded-full bg-[#d9c3ad]/50 blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#d5bda5]/50 to-transparent" />
      </div>

      <Container className="relative flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* ===== Chữ ===== */}
        <div className="relative z-10 pt-6 sm:pt-10 lg:self-center lg:pt-0 lg:pb-10">
          <p data-reveal="down" className="text-[11px] font-semibold tracking-[0.3em] text-rose uppercase">
            Solisst · New collection
          </p>
          <h1
            data-reveal="blur"
            data-reveal-delay="120"
            className="mt-[clamp(0.75rem,2.2svh,1.5rem)] font-serif text-[clamp(2.3rem,5.4svh,3.6rem)] leading-[1.06] text-plum italic lg:text-[clamp(3rem,8.4svh,5.2rem)]"
          >
            Thanh lịch
            <br />
            trong từng
            <br />
            <span className="not-italic">khoảnh khắc</span>
          </h1>
          <p
            data-reveal="up"
            data-reveal-delay="280"
            className="mt-[clamp(0.75rem,2.6svh,1.75rem)] max-w-md text-[14px] leading-relaxed text-ink-soft sm:text-[15px] lg:text-base"
          >
            Những thiết kế tôn dáng, mang đến vẻ đẹp hiện đại và sự tự tin cho mọi cô gái
            <span className="hidden sm:inline"> — từ buổi tiệc sang trọng đến những phút thư thả ở nhà</span>.
          </p>
          <div data-reveal="up" data-reveal-delay="420" className="mt-[clamp(1rem,3.4svh,2.5rem)]">
            <Button href={siteConfig.cta.secondary.href} size="lg" arrow>
              {siteConfig.cta.secondary.label}
            </Button>
          </div>
        </div>

        {/* ===== Người mẫu ===== */}
        <div className="relative min-h-0 flex-1 lg:h-full">
          {/*
            Hai người mẫu toàn thân đứng ngang hàng, chung vầng "mặt trời" Sol·isst phía sau.
            Khung đo theo container (cqh/cqw) → cặp đôi luôn vừa cả chiều cao lẫn chiều rộng, không tràn màn hình.
            Desktop: vùng ảnh nới sang trái (khoảng trống cạnh chữ) để người mẫu to hơn, chừa chỗ nhãn bên phải.
          */}
          <div className="absolute inset-y-0 right-0 left-0 flex items-end justify-center [container-type:size] lg:-left-[10%] xl:-left-[16%] xl:pr-[20%]">
            <div className="relative mb-[3cqh] flex items-end">
              {/* Lệch tâm nhẹ (54%) để vòng ôm đều phần thấy được của 2 người — ảnh váy hồng có túi xách bên phải */}
              <SunHalo data-reveal="zoom" data-reveal-delay="100" className="absolute -top-[3%] left-1/2 h-[min(74cqh,80cqw)] -translate-x-[54.3%]" />

              <Cutout
                src={IMAGES.mochaFrontCut}
                alt="Người mẫu mặc đầm lụa satin Mocha"
                data-reveal="rise"
                data-reveal-delay="250"
                ratio="796 / 1539"
                eager
                glow={false}
                sizes="(min-width: 1024px) 400px, 48vw"
                className="z-10 -mr-[7%] h-[min(92cqh,98cqw)] lg:h-[min(93cqh,96cqw)]"
              />
              <Cutout
                src={IMAGES.heroBlushCut}
                alt="Người mẫu mặc đầm tulle Blush cổ V"
                data-reveal="rise"
                data-reveal-delay="420"
                ratio="797 / 1541"
                eager
                glow={false}
                sizes="(min-width: 1024px) 400px, 48vw"
                className="z-20 mb-[1cqh] h-[min(92cqh,98cqw)] lg:h-[min(93cqh,96cqw)]"
              />

              {/* "Shop the look" — mỗi người mẫu một nhãn, đối xứng hai bên */}
              <ShopTheLook
                href="/san-pham/dam-satin-mocha"
                name="Đầm lụa satin Mocha"
                price="459.000đ"
                side="left"
                data-reveal="left"
                data-reveal-delay="750"
                className="top-[10%] right-full mr-1 translate-x-[5cqh]"
              />
              <ShopTheLook
                href="/san-pham/dam-tulle-blush"
                name="Đầm tulle Blush"
                price="489.000đ"
                side="right"
                data-reveal="right"
                data-reveal-delay="850"
                className="bottom-[18%] left-full ml-1 -translate-x-[10cqh]"
              />
            </div>
          </div>

          <Sparkle className="absolute top-[30%] left-[6%] h-4 w-4 animate-float text-rose/50" />
          <Sparkle className="absolute top-[18%] right-[30%] hidden h-2.5 w-2.5 text-rose/40 lg:block" />
          <Sparkle className="absolute bottom-[34%] right-[6%] hidden h-3 w-3 animate-float text-rose/40 lg:block" />

          <ScriptNote
            data-reveal="fade"
            data-reveal-delay="900"
            lines={["Your Style", "Your Story"]}
            className="absolute top-[6%] right-0 hidden -rotate-12 text-[clamp(2.4rem,6svh,3.4rem)] lg:block xl:-right-4"
          />
        </div>
      </Container>

    </section>
  );
}

/** Nhãn "Shop the look" — gạch mảnh hướng vào người mẫu, bấm sang trang chi tiết. */
function ShopTheLook({ href, name, price, side, className, ...rest }) {
  const left = side === "left";
  return (
    <Link
      {...rest}
      href={href}
      className={`group absolute z-30 hidden items-center gap-3 whitespace-nowrap xl:flex ${left ? "flex-row-reverse text-right" : ""} ${className}`}
    >
      <span className="h-px w-10 bg-rose/50 transition-all duration-500 group-hover:w-14 group-hover:bg-plum" />
      <span>
        <span className="block text-[10px] font-semibold tracking-[0.28em] text-rose uppercase">Shop the look</span>
        <span className="mt-1 block font-serif text-lg leading-tight text-ink italic group-hover:text-plum">{name}</span>
        <span className="mt-0.5 block text-[12.5px] text-ink-soft">
          {price} <span className="ml-1 inline-block text-plum transition-transform group-hover:translate-x-1">→</span>
        </span>
      </span>
    </Link>
  );
}
