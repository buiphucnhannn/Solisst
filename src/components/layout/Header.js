"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/**
 * Header sticky + mobile menu.
 * Link điều hướng lấy từ siteConfig.nav để quản lý 1 chỗ.
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Solisst logo" width={32} height={32} priority />
            <span className="text-lg font-bold tracking-tight text-white">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Điều hướng chính">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href={siteConfig.cta.primary.href} size="sm">
              {siteConfig.cta.primary.label}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={cn("pb-4 md:hidden", open ? "block" : "hidden")}>
          <nav className="flex flex-col gap-1" aria-label="Điều hướng di động">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <Button
              href={siteConfig.cta.primary.href}
              size="sm"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              {siteConfig.cta.primary.label}
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
