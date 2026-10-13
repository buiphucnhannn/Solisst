"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { smoothScrollTo } from "@/lib/smooth-scroll";

/**
 * Bắt mọi link "#section" / "/trang#section" trên site:
 * - Cùng trang → cuộn mượt tới vị trí đẹp nhất (không nhảy giật, không để lại #hash trên URL).
 * - Khác trang → chuyển trang trước, rồi lướt mượt tới section khi nội dung đã có.
 */
export default function SmoothAnchors() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank") return;

      const url = new URL(a.getAttribute("href"), window.location.href);
      if (url.origin !== window.location.origin) return;
      const samePage = url.pathname === window.location.pathname;
      const id = url.hash.slice(1);
      // Báo cho menu mobile tự đóng (vì cú bấm bị chặn trước khi tới onClick của link)
      const handled = () => window.dispatchEvent(new Event("solisst:anchor"));

      // "Trang chủ" khi đang ở trang chủ → lướt lên đầu
      if (samePage && !id && url.search === window.location.search) {
        e.preventDefault();
        e.stopPropagation();
        handled();
        smoothScrollTo("top");
        return;
      }
      if (!id) return;

      // Chặn ở pha capture để <Link> của Next không nhảy thẳng tới #hash
      e.preventDefault();
      e.stopPropagation();
      handled();
      // Khối nút mua ở trang chi tiết: đặt giữa màn hình cho dễ thao tác
      const opts = id === "mua" ? { align: "center" } : {};
      if (samePage) {
        smoothScrollTo(id, opts);
        return;
      }
      router.push(url.pathname + url.search, { scroll: true });
      const started = Date.now();
      const wait = () => {
        if (window.location.pathname === url.pathname && document.getElementById(id)) {
          setTimeout(() => smoothScrollTo(id, opts), 120);
        } else if (Date.now() - started < 4000) {
          requestAnimationFrame(wait);
        }
      };
      requestAnimationFrame(wait);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Vào trang bằng link có #hash (vd. chia sẻ /#combo) → lướt mượt tới section
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    const t = setTimeout(() => smoothScrollTo(id), 350);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
