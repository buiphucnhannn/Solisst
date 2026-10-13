"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { usePathname } from "next/navigation";
import { orderHrefFor, orderTargetFor } from "@/lib/order-bus";
import { cn } from "@/lib/utils";
import Countdown from "@/components/ui/Countdown";

/**
 * Thanh chốt đơn dính đáy màn hình trên điện thoại (traffic quảng cáo TikTok/FB
 * chủ yếu là mobile). Tự ẩn khi khách đã cuộn tới form đặt hàng.
 */
export default function MobileOrderBar() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const target = document.getElementById(orderTargetFor(pathname));
    if (!target) return undefined;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(target);
    return () => {
      io.disconnect();
      setHidden(false);
    };
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 md:hidden",
        hidden && "translate-y-full",
      )}
    >
      <div className="flex items-center gap-2">
        <a
          href={siteConfig.contact.zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
          className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md border border-plum/20 bg-white text-[10px] font-bold text-[#0068ff]"
        >
          Zalo
        </a>
        <a
          href={orderHrefFor(pathname)}
          className="flex h-12 flex-1 items-center justify-between rounded-md bg-plum pr-2 pl-5 text-white shadow-[0_10px_30px_-10px_rgba(122,31,61,0.8)]"
        >
          <span className="text-[13px] font-semibold tracking-[0.12em] uppercase">Đặt hàng ngay</span>
          <span className="rounded bg-white/15 px-2.5 py-1.5 text-xs">
            ⏱ <Countdown />
          </span>
        </a>
      </div>
    </div>
  );
}
