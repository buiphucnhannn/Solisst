/**
 * Cuộn mượt "chậm rãi" tới một section/phần tử (tham khảo BanMuongXanh):
 * easeInOutCubic, thời lượng 750–1100ms theo quãng đường, dừng ngay nếu khách tự cuộn.
 * Điểm dừng tính theo chiều cao header thật + chừa một phần padding đầu section
 * để tiêu đề nằm ngay dưới header, vừa mắt trên cả desktop lẫn mobile.
 */

let rafId = null;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function headerHeight() {
  return document.querySelector("header")?.getBoundingClientRect().height ?? 0;
}

/** Vị trí đẹp nhất để xem phần tử. */
export function targetYFor(el, { align = "start" } = {}) {
  const r = el.getBoundingClientRect();
  const y = r.top + window.scrollY;
  const header = headerHeight();

  if (align === "center") {
    // Phần tử nhỏ (khối nút mua, ô size…) → đặt giữa vùng nhìn thấy dưới header
    return y - header - (window.innerHeight - header - r.height) / 2;
  }
  if (el.id === "top") return 0;

  // Section: giữ ~55% padding trên làm khoảng thở giữa header và tiêu đề
  const pad = parseFloat(getComputedStyle(el).paddingTop) || 0;
  const breathing = el.tagName === "SECTION" ? Math.min(pad * 0.55, 48) : 24;
  return y - header - breathing + (el.tagName === "SECTION" ? pad : 0);
}

export function smoothScrollTo(target, options = {}) {
  if (typeof window === "undefined") return;
  const el = typeof target === "string" ? document.getElementById(target.replace(/^#/, "")) : target;
  if (target !== "top" && target !== "#top" && !el) return;

  if (rafId) cancelAnimationFrame(rafId);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const to = Math.max(0, Math.min(el ? targetYFor(el, options) : 0, max));
  const from = window.scrollY;
  const dist = to - from;
  if (Math.abs(dist) < 2) return;

  const duration = Math.min(1100, Math.max(750, Math.abs(dist) * 0.4));
  let start = null;

  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchmove", stop);
    window.removeEventListener("keydown", stop);
  };
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchmove", stop, { passive: true });
  window.addEventListener("keydown", stop, { passive: true });

  const step = (now) => {
    if (start === null) start = now;
    const p = Math.min((now - start) / duration, 1);
    window.scrollTo(0, from + dist * easeInOutCubic(p));
    if (p < 1) rafId = requestAnimationFrame(step);
    else stop();
  };
  rafId = requestAnimationFrame(step);
}
