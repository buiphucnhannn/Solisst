import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import Container from "@/components/ui/Container";

const { contact } = siteConfig;

export default function Footer() {
  return (
    <footer id="contact" className="bg-plum-dark text-cream">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div data-reveal="up">
            <Image src="/images/logo-solisst-hd.png" alt="Solisst" width={720} height={190} className="h-9 w-[136px]" />
            <p className="mt-5 max-w-sm font-serif text-lg leading-snug text-cream/80 italic">{siteConfig.footer.tagline}</p>
          </div>

          <div data-reveal="up" data-reveal-delay="120">
            <h3 className="text-[11px] font-semibold tracking-[0.28em] text-nude uppercase">Liên hệ</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/75">
              <li>
                Hotline / Zalo:{" "}
                <a href={`tel:${contact.phone}`} className="text-cream hover:text-nude">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>Phụ trách: {contact.person}</li>
              <li>Giờ mở cửa: {contact.hours}</li>
              <li>
                <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="hover:text-nude">
                  Showroom tại {contact.city} — xem bản đồ ↗
                </a>
              </li>
            </ul>
          </div>

          <div data-reveal="up" data-reveal-delay="240">
            <h3 className="text-[11px] font-semibold tracking-[0.28em] text-nude uppercase">Kết nối</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/75">
              <li>
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-nude">
                  Facebook ↗
                </a>
              </li>
              <li>
                <a href={contact.zalo} target="_blank" rel="noopener noreferrer" className="hover:text-nude">
                  Chat Zalo ↗
                </a>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-nude">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="/bo-suu-tap" className="hover:text-nude">
                  Bộ sưu tập
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div data-reveal="fade" data-reveal-delay="300" className="flex flex-col items-center justify-between gap-2 border-t border-cream/10 py-6 pb-24 text-xs text-cream/50 sm:flex-row md:pb-6">
          <p>{siteConfig.footer.copyright}</p>
          <p>Thanh toán khi nhận hàng · Giao toàn quốc</p>
        </div>
      </Container>
    </footer>
  );
}
