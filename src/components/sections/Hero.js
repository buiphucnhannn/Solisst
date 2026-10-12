import Image from "next/image";
import { siteConfig } from "@/lib/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/**
 * Hero — section đầu tiên của landing page.
 * Nhân bản pattern này cho các section khác trong src/components/sections/.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] text-white">
      {/* Decor nền */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,130,246,0.25),transparent)]"
      />

      <Container>
        <div className="relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <Badge className="border-white/15 bg-white/10 text-slate-200">
              ● Solisst — sẵn sàng triển khai
            </Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Landing page nhanh, đẹp, chuẩn SEO
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Khung Next.js + TailwindCSS + JS thuần đã chia component chuyên
              nghiệp. Bạn chỉ cần nhân bản section mới và đổ nội dung vào.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.cta.primary.href} size="lg">
                {siteConfig.cta.primary.label} →
              </Button>
              <Button
                href={siteConfig.cta.secondary.href}
                variant="secondary"
                size="lg"
              >
                {siteConfig.cta.secondary.label}
              </Button>
            </div>

            <dl className="mt-10 flex gap-8 text-sm">
              <div>
                <dt className="text-slate-400">Hiệu năng</dt>
                <dd className="mt-1 text-xl font-bold">100/100</dd>
              </div>
              <div>
                <dt className="text-slate-400">Chuẩn SEO</dt>
                <dd className="mt-1 text-xl font-bold">Metadata API</dd>
              </div>
              <div>
                <dt className="text-slate-400">JS thuần</dt>
                <dd className="mt-1 text-xl font-bold">Không TS</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/images/hero-cover.svg"
                alt="Minh họa sản phẩm Solisst"
                width={960}
                height={720}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
