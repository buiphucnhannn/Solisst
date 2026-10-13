import Image from "next/image";
import Cutout from "@/components/ui/Cutout";
import { IMAGES } from "@/lib/products";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { FlowerSprig, Icon, ScriptNote, Sparkle, SunHalo } from "@/components/ui/Decor";

const PROMISES = [
  { icon: "cash", label: "Thanh toán khi nhận" },
  { icon: "truck", label: "Freeship combo 2+" },
  { icon: "swap", label: "Đổi size 7 ngày" },
];

/** Banner khép lại trang — "Solisst · A Little More You". */
export default function ClosingBanner({ ctaHref = "#dat-hang" }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(100deg,#e9dccf_0%,#f3e9df_45%,#ead8c6_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[30%] h-[420px] w-[420px] rounded-full bg-white/50 blur-3xl" />
      <Container className="relative">
        {/* py bằng nhau → khoảng trống trên đầu và dưới chân người mẫu như nhau */}
        <div className="grid gap-8 py-16 md:grid-cols-[1fr_1fr] md:py-20">
          <div className="relative order-2 mx-auto h-[380px] w-full max-w-[420px] sm:h-[480px] md:order-none md:self-center">
            <SunHalo className="absolute top-[14%] left-1/2 h-[72%] -translate-x-1/2" />
            <Sparkle className="absolute top-[14%] left-[8%] h-3.5 w-3.5 animate-float text-rose/45" />
            <Cutout data-reveal="rise"
              src={IMAGES.mochaFrontCut}
              alt="Người mẫu mặc đầm lụa satin Mocha"
              ratio="796 / 1539"
              sizes="260px"
              className="absolute bottom-0 left-1/2 h-full -translate-x-1/2"
            />
            <FlowerSprig data-reveal="fade" data-reveal-delay="450" className="absolute right-[2%] bottom-0 h-56 w-40 -scale-x-100" />
          </div>

          {/* Cụm chữ căn giữa theo chiều cao của khối ảnh người mẫu */}
          <div className="relative order-1 text-center md:order-none md:self-center md:text-left">
            {/* Dùng đúng logo (rose-gold) như header thay cho chữ đỏ mận */}
            <h2 data-reveal="blur" data-reveal-delay="150" className="flex justify-center md:justify-start">
              <Image
                src="/images/logo-solisst-hd.png"
                alt="Solisst"
                width={720}
                height={190}
                sizes="320px"
                className="h-16 w-auto sm:h-20"
              />
            </h2>
            <p data-reveal="up" data-reveal-delay="300" className="mt-1 font-serif text-2xl text-rose italic sm:text-3xl">A Little More You</p>
            <div data-reveal="pop" data-reveal-delay="450" className="mt-8">
              <Button href={ctaHref} arrow>
                Đặt hàng ngay
              </Button>
            </div>
            <ul data-reveal="up" data-reveal-delay="580" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
              {PROMISES.map((p) => (
                <li key={p.label} className="flex items-center gap-2 text-[12.5px] text-ink-soft">
                  <Icon name={p.icon} className="h-4 w-4 text-plum" />
                  {p.label}
                </li>
              ))}
            </ul>
            <Sparkle className="absolute right-[18%] bottom-[22%] hidden h-3 w-3 text-rose/40 lg:block" />
            <ScriptNote data-reveal="fade" data-reveal-delay="700"
              lines={["Thank you", "for being here"]}
              className="absolute -top-14 right-0 hidden -rotate-12 text-4xl lg:block xl:-top-10"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
