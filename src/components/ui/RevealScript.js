/**
 * Hiệu ứng xuất hiện khi cuộn — cho mọi phần tử có [data-reveal="<kiểu>"] trên mọi trang.
 *
 * - Hai chiều: cuộn tới thì hiện, ra khỏi màn hình thì ẩn lại → lướt lên hay xuống đều có hiệu ứng.
 * - Dùng Web Animations API (không đổi class/attribute của DOM) nên KHÔNG gây lệch hydration React.
 * - Chạy bằng <script> inline ở cuối <body>: ẩn phần tử trước lần vẽ đầu tiên (không nháy),
 *   MutationObserver bắt các phần tử stream tới sau / khi chuyển trang.
 * - Độ trễ: data-reveal-delay="120" (ms) hoặc style={{ "--reveal-delay": "120ms" }}.
 *
 * Máy bật "giảm chuyển động" → mọi kiểu chỉ còn hiện dần (fade), không di chuyển.
 * Các kiểu: up · down · left · right · zoom · pop · blur · rise · tilt-left · tilt-right · flip · curtain · fade
 */
function revealRuntime() {
  if (window.__solisstReveal) return;
  window.__solisstReveal = true;
  if (!("animate" in Element.prototype)) return;
  // Máy bật "giảm chuyển động" (vd. Windows tắt Animation effects): vẫn hiện dần, nhưng không bay/xoay
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  // [keyframe xuất phát, thời lượng ms, keyframe đích tường minh (chỉ khi cần)]
  const V = {
    up: [{ opacity: 0, transform: "translateY(36px)" }, 900],
    down: [{ opacity: 0, transform: "translateY(-30px)" }, 850],
    left: [{ opacity: 0, transform: "translateX(-56px)" }, 1000],
    right: [{ opacity: 0, transform: "translateX(56px)" }, 1000],
    zoom: [{ opacity: 0, transform: "scale(0.9)" }, 950],
    pop: [{ opacity: 0, transform: "translateY(24px) scale(0.86)" }, 850],
    blur: [{ opacity: 0, transform: "translateY(26px)", filter: "blur(10px)" }, 1100],
    rise: [{ opacity: 0, transform: "translateY(70px) scale(0.96)" }, 1200],
    "tilt-left": [{ opacity: 0, transform: "translateY(48px) rotate(-3deg)" }, 1000],
    "tilt-right": [{ opacity: 0, transform: "translateY(48px) rotate(3deg)" }, 1000],
    flip: [{ opacity: 0, transform: "perspective(900px) rotateX(22deg) translateY(28px)", transformOrigin: "50% 0%" }, 1000],
    curtain: [{ opacity: 0.4, clipPath: "inset(0 100% 0 0)" }, 1300, { opacity: 1, clipPath: "inset(0 0% 0 0)" }],
    fade: [{ opacity: 0 }, 1000],
  };

  const items = new Map(); // el → { anim, shown }

  function delayOf(el) {
    const attr = el.getAttribute("data-reveal-delay");
    if (attr) return parseFloat(attr) || 0;
    const v = el.style.getPropertyValue("--reveal-delay");
    return v ? parseFloat(v) || 0 : 0;
  }

  // Gỡ mọi animation reveal đang gắn trên phần tử (tránh chồng nhiều animation)
  function clear(el) {
    el.getAnimations().forEach((a) => a.id === "reveal" && a.cancel());
  }

  function hide(el) {
    clear(el);
    const def = reduced ? [{ opacity: 0 }, 600] : V[el.getAttribute("data-reveal")] || V.up;
    const frames = def[2] ? [def[0], def[2]] : [def[0]];
    const anim = el.animate(frames, { duration: def[1], easing: EASE, fill: "both", delay: delayOf(el) });
    anim.id = "reveal";
    anim.pause();
    anim.currentTime = 0;
    anim.onfinish = () => {
      // Xong thì gỡ animation → phần tử trở về style gốc (hover, transform của chính nó vẫn chạy bình thường)
      const it = items.get(el);
      if (it && it.shown) {
        clear(el);
        it.anim = null;
      }
    };
    return anim;
  }

  function register(el) {
    if (items.has(el)) return;
    items.set(el, { anim: hide(el), shown: false });
  }

  function check() {
    const vh = window.innerHeight;
    const enter = Math.min(80, vh * 0.08);
    items.forEach((it, el) => {
      if (!el.isConnected) {
        items.delete(el);
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return; // đang ẩn (display:none)
      const inView = r.top < vh - enter && r.bottom > enter;
      const outOfView = r.top > vh || r.bottom < 0;
      if (inView && !it.shown) {
        it.shown = true;
        if (!it.anim) it.anim = hide(el);
        it.anim.play();
      } else if (outOfView && it.shown) {
        // Ra khỏi màn hình → ẩn lại để lần sau cuộn tới (lên hay xuống) lại xuất hiện
        it.shown = false;
        it.anim = hide(el);
      }
    });
  }

  let ticking = false;
  function schedule() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      check();
    });
  }

  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.hasAttribute("data-reveal")) register(root);
    root.querySelectorAll("[data-reveal]").forEach(register);
  }

  scan(document.body);
  check();
  new MutationObserver((muts) => {
    for (const m of muts) m.addedNodes.forEach(scan);
    schedule();
  }).observe(document.body, { childList: true, subtree: true });
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("load", schedule);
}

export default function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: `(${revealRuntime.toString()})()` }} />;
}
