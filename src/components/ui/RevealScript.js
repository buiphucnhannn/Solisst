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
 * Các kiểu: up · down · left · right · zoom · pop · blur (hiện dịu) · rise · tilt-left · tilt-right · flip · curtain · fade
 */
function revealRuntime() {
  if (window.__solisstReveal) return;
  window.__solisstReveal = true;
  if (!("animate" in Element.prototype)) return;
  // Máy bật "giảm chuyển động" (vd. Windows tắt Animation effects): vẫn hiện dần, nhưng không bay/xoay
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // easeOutQuart: vào nhanh, dừng rất êm — cảm giác "trôi" chứ không "bật"
  const EASE = "cubic-bezier(0.25, 1, 0.5, 1)";
  // Chỉ dùng opacity + transform (+ clip-path cho "curtain") — đều chạy trên GPU, không vẽ lại trang.
  // y: độ lệch dọc (đảo chiều khi phần tử đi vào từ mép trên lúc cuộn lên).
  const V = {
    up: { y: 24, d: 750 },
    down: { y: -18, d: 700 },
    left: { x: -32, d: 800 },
    right: { x: 32, d: 800 },
    zoom: { s: 0.96, d: 800 },
    pop: { y: 14, s: 0.97, d: 700 },
    blur: { y: 18, d: 900 }, // "hiện dịu": chậm hơn, quãng ngắn (không dùng filter blur vì rất nặng)
    rise: { y: 36, d: 950 },
    "tilt-left": { y: 26, r: -1.2, d: 850 },
    "tilt-right": { y: 26, r: 1.2, d: 850 },
    flip: { y: 16, rx: 8, d: 850 },
    curtain: { clip: true, d: 1000 },
    fade: { d: 700 },
  };

  const items = new Map(); // el → { anim, shown }

  function delayOf(el) {
    const attr = el.getAttribute("data-reveal-delay");
    const v = attr || el.style.getPropertyValue("--reveal-delay");
    // Rút gọn độ trễ (tối đa 450ms) để các phần tử không hiện lác đác
    return Math.min(450, (parseFloat(v) || 0) * 0.7);
  }

  function fromFrame(def, fromTop) {
    if (reduced) return { opacity: 0 };
    if (def.clip) return { opacity: 0.6, clipPath: "inset(0 100% 0 0)" };
    const y = (def.y || 0) * (fromTop ? -1 : 1);
    const t = [];
    if (def.rx) t.push("perspective(1000px) rotateX(" + (fromTop ? -def.rx : def.rx) + "deg)");
    if (def.x || y) t.push("translate3d(" + (def.x || 0) + "px," + y + "px,0)");
    if (def.r) t.push("rotate(" + def.r + "deg)");
    if (def.s) t.push("scale(" + def.s + ")");
    return t.length ? { opacity: 0, transform: t.join(" ") } : { opacity: 0 };
  }

  function clear(el) {
    el.getAnimations().forEach((a) => a.id === "reveal" && a.cancel());
  }

  function hide(el, fromTop) {
    clear(el);
    const def = V[el.getAttribute("data-reveal")] || V.up;
    const from = fromFrame(def, fromTop);
    // offset: 0 bắt buộc — 1 keyframe đơn lẻ bị trình duyệt hiểu là điểm KẾT THÚC (gây mờ đi rồi hiện lại)
    const start = { ...from, offset: 0 };
    const frames = def.clip && !reduced ? [start, { opacity: 1, clipPath: "inset(0 0% 0 0)" }] : [start];
    // Cuộn lên (vào từ mép trên) thì hiện ngay, không chờ độ trễ
    const anim = el.animate(frames, {
      duration: reduced ? 500 : def.d,
      easing: EASE,
      fill: "both",
      delay: fromTop ? 0 : delayOf(el),
    });
    anim.id = "reveal";
    anim.pause();
    anim.currentTime = 0;
    anim.onfinish = () => {
      // Xong thì gỡ animation → phần tử trở về style gốc (hover, transform riêng vẫn hoạt động bình thường)
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
    items.set(el, { anim: hide(el, false), shown: false, fromTop: false });
  }

  function check() {
    const vh = window.innerHeight;
    const enter = Math.min(60, vh * 0.06);
    const gap = 80; // vùng đệm: phải ra hẳn khỏi màn hình mới ẩn lại → không nháy ở mép
    items.forEach((it, el) => {
      if (!el.isConnected) {
        items.delete(el);
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return; // đang ẩn (display:none)
      if (!it.shown) {
        // Lúc còn ẩn, ghi nhớ phần tử đang nằm phía trên hay phía dưới màn hình
        if (r.bottom < 0) it.fromTop = true;
        else if (r.top > vh) it.fromTop = false;
      }
      const inView = r.top < vh - enter && r.bottom > enter;
      const outOfView = r.top > vh + gap || r.bottom < -gap;
      if (inView && !it.shown) {
        it.shown = true;
        // Hướng xuất hiện theo chiều cuộn: cuộn xuống → trồi lên; cuộn lên → buông xuống
        if (!it.anim || it.anim.__fromTop !== it.fromTop) {
          it.anim = hide(el, it.fromTop);
          it.anim.__fromTop = it.fromTop;
        }
        it.anim.play();
      } else if (outOfView && it.shown) {
        // Ra hẳn khỏi màn hình → ẩn lại để lần sau cuộn tới (lên hay xuống) lại xuất hiện
        it.shown = false;
        it.fromTop = r.bottom < 0;
        it.anim = hide(el, it.fromTop);
        it.anim.__fromTop = it.fromTop;
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
