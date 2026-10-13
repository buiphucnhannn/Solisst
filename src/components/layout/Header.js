"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { orderHrefFor } from "@/lib/order-bus";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Countdown from "@/components/ui/Countdown";

/**
 * Header sticky:
 * 1. Thanh flash sale mảnh có đồng hồ đếm ngược (yêu cầu brief)
 * 2. Logo đỏ mận + nav + nút đặt hàng — trong suốt trên hero, mờ kính khi cuộn
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const orderHref = orderHrefFor(pathname);
  const isActive = (href) => (href === "/" ? pathname === "/" : href.startsWith("/") && !href.includes("#") && pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    const close = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("solisst:anchor", close);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("solisst:anchor", close);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Flash sale bar */}
      <div className="bg-plum text-white">
        <Container>
          <Link
            href={orderHref}
            className="flex h-8 items-center justify-center gap-2 text-[10.5px] font-medium tracking-[0.16em] uppercase sm:gap-3"
          >
            <span className="hidden sm:inline">Flash sale đến 35% · Kết thúc sau</span>
            <span className="sm:hidden">Flash sale còn</span>
            <Countdown className="rounded bg-white/15 px-1.5 py-0.5 text-[11.5px] tracking-normal" />
            <span className="hidden opacity-80 md:inline">· Freeship combo từ 2 sản phẩm</span>
          </Link>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled || open
            ? "bg-cream/90 shadow-[0_8px_30px_-20px_rgba(42,30,27,0.4)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
            <Link href="/#top" aria-label="Solisst — về đầu trang" className="shrink-0">
              <Image
                src="/images/logo-solisst-hd.png"
                alt="Solisst"
                width={720}
                height={190}
                priority
                className="h-7 w-[106px] lg:h-8 lg:w-[121px]"
              />
            </Link>

            <nav className="hidden items-center gap-9 lg:flex" aria-label="Điều hướng chính">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "group relative text-[13px] transition-colors hover:text-plum",
                    isActive(item.href) ? "font-medium text-plum" : "text-ink-soft",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-1/2 h-px -translate-x-1/2 bg-plum transition-all duration-300 group-hover:w-full",
                      isActive(item.href) ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button href={orderHref} size="sm" className="hidden sm:inline-flex">
                {siteConfig.cta.primary.label}
              </Button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Đóng menu" : "Mở menu"}
                className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-plum/20 lg:hidden"
              >
                <span className={cn("h-px w-4 bg-plum transition", open && "translate-y-[3.5px] rotate-45")} />
                <span className={cn("h-px w-4 bg-plum transition", open && "-translate-y-[3.5px] -rotate-45")} />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={cn("grid transition-[grid-template-rows] duration-300 lg:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <nav className="overflow-hidden" aria-label="Điều hướng di động">
              <div className="flex flex-col pb-5">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-plum/10 py-3.5 font-serif text-xl text-plum"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button href={orderHref} className="mt-5 w-full" arrow onClick={() => setOpen(false)}>
                  {siteConfig.cta.primary.label}
                </Button>
              </div>
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
}
