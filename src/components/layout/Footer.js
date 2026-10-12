import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import Container from "@/components/ui/Container";

/**
 * Footer nhiều cột, dữ liệu từ siteConfig.footer.
 */
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Solisst logo" width={32} height={32} />
              <span className="text-lg font-bold text-slate-950">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              {siteConfig.footer.tagline}
            </p>
            <p className="mt-4 text-sm text-slate-500">{siteConfig.description}</p>
          </div>

          {siteConfig.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 py-6 sm:flex-row">
          <p className="text-xs text-slate-500">{siteConfig.footer.copyright}</p>
          <p className="text-xs text-slate-400">Next.js + TailwindCSS + JS thuần</p>
        </div>
      </Container>
    </footer>
  );
}
