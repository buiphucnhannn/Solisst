import { cn } from "@/lib/utils";

/**
 * Bộ hoạ tiết trang trí theo mẫu thiết kế — vẽ bằng SVG/CSS,
 * không cần thêm ảnh, nhẹ và sắc nét ở mọi độ phân giải.
 */

/** Chữ viết tay kèm trái tim nét mảnh: "Your Style / Your Story ♡" */
export function ScriptNote({ lines, className, heart = true, ...rest }) {
  return (
    <p
      {...rest}
      aria-hidden="true"
      className={cn("pointer-events-none font-script leading-[0.95] text-rose/80 select-none", className)}
    >
      {lines.map((line, i) => (
        <span key={line} className="block" style={{ paddingLeft: `${i * 0.9}em` }}>
          {line}
        </span>
      ))}
      {heart ? (
        <svg viewBox="0 0 40 36" className="mt-1 ml-[1.6em] inline-block h-[0.55em] w-[0.6em]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M20 33C8 24 3 17 3 11a8 8 0 0 1 17-3 8 8 0 0 1 17 3c0 6-5 13-17 22Z" />
        </svg>
      ) : null}
    </p>
  );
}

/** Dải voan lụa bay nhẹ — đặt absolute ở góc section */
export function SilkDrape({ className, flip = false, ...rest }) {
  return (
    <svg
      {...rest}
      aria-hidden="true"
      viewBox="0 0 400 420"
      className={cn("pointer-events-none animate-sway", flip && "-scale-x-100", className)}
    >
      <defs>
        <linearGradient id="silk-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e6d6" stopOpacity="0" />
          <stop offset="0.45" stopColor="#ecd2bb" stopOpacity="0.85" />
          <stop offset="1" stopColor="#d9b597" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="silk-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7ef" stopOpacity="0.9" />
          <stop offset="1" stopColor="#e3c3a6" stopOpacity="0" />
        </linearGradient>
        <filter id="silk-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <g filter="url(#silk-blur)">
        <path d="M380 10C300 60 330 140 250 190S120 250 150 330s-60 90-140 80c90-40 70-100 40-150S90 150 180 120 300 80 380 10Z" fill="url(#silk-a)" />
        <path d="M390 60c-60 40-40 110-110 150S170 260 190 330c-40-60-10-120 50-150s90-60 150-120Z" fill="url(#silk-b)" />
      </g>
    </svg>
  );
}

/** Tấm lụa satin nâu với các nếp gấp — thay cho ảnh vải */
export function SatinPanel({ className, children, ...rest }) {
  return (
    <div {...rest} className={cn("relative overflow-hidden bg-[#4a2716]", className)}>
      <svg aria-hidden="true" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="satin-base" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b1c0e" />
            <stop offset="0.45" stopColor="#7a4426" />
            <stop offset="1" stopColor="#2e150a" />
          </linearGradient>
          <filter id="satin-hi" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="satin-sh" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <rect width="600" height="500" fill="url(#satin-base)" />
        {/* Bóng nếp gấp */}
        <g filter="url(#satin-sh)" fill="none" strokeLinecap="round" stroke="#1f0d05">
          <path d="M-40 60C120 140 200 20 330 110S520 250 660 170" strokeWidth="60" opacity="0.55" />
          <path d="M-40 250C90 330 230 190 350 290S540 420 660 350" strokeWidth="70" opacity="0.6" />
          <path d="M-40 430C120 500 260 380 380 470S560 560 660 520" strokeWidth="60" opacity="0.5" />
        </g>
        {/* Ánh bóng lụa */}
        <g filter="url(#satin-hi)" fill="none" strokeLinecap="round">
          <path d="M-40 150C110 230 210 100 340 190S530 320 660 250" stroke="#f1c9a5" strokeWidth="26" opacity="0.75" />
          <path d="M-40 175C110 255 210 125 340 215S530 345 660 275" stroke="#c98d63" strokeWidth="30" opacity="0.5" />
          <path d="M-40 345C110 420 240 290 360 380S550 500 660 440" stroke="#f6d6b8" strokeWidth="20" opacity="0.7" />
          <path d="M-40 365C110 440 240 310 360 400S550 520 660 460" stroke="#b67a52" strokeWidth="28" opacity="0.45" />
          <path d="M-40 20C120 90 210 -10 330 40S520 140 660 90" stroke="#e6b590" strokeWidth="18" opacity="0.55" />
          <path d="M240 -20C210 120 300 200 270 330S230 470 260 540" stroke="#f3d2b3" strokeWidth="10" opacity="0.4" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(75%_65%_at_40%_45%,transparent,rgba(25,10,4,0.5))]" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Cành hoa trắng kem — trang trí cạnh form đặt hàng / banner cuối */
export function FlowerSprig({ className, ...rest }) {
  const blossoms = [
    [70, 70, 1],
    [140, 40, 0.8],
    [120, 130, 0.9],
    [40, 160, 0.7],
    [190, 110, 0.65],
  ];
  return (
    <svg {...rest} aria-hidden="true" viewBox="0 0 240 320" className={cn("pointer-events-none", className)}>
      <path d="M200 320C170 250 150 200 120 140M120 140C100 110 80 90 70 70M120 140c20-30 25-60 20-100M150 200c-40-10-80 0-110-40M160 230c10-40 20-90 30-120" stroke="#b79a7c" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      {blossoms.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="0" cy="-16" rx="13" ry="18" transform={`rotate(${r})`} fill="#fbf3ea" stroke="#ead6c1" strokeWidth="1.2" />
          ))}
          <circle r="5" fill="#e3c08f" />
        </g>
      ))}
    </svg>
  );
}

/** Ngôi sao 4 cánh nét mảnh — điểm xuyết tối giản cho khoảng trống */
export function Sparkle({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("pointer-events-none", className)} fill="currentColor">
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

/** Vầng "mặt trời" (Sol-isst) — vòng tròn sáng mờ + vòng chỉ mảnh, đặt sau người mẫu */
export function SunHalo({ className, ...rest }) {
  return (
    <div {...rest} aria-hidden="true" className={cn("pointer-events-none aspect-square rounded-full", className)}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),rgba(255,248,240,0.45)_55%,transparent)]" />
      <div className="absolute inset-[6%] rounded-full border border-white/80" />
      <div className="absolute inset-[-4%] rounded-full border border-rose/15" />
    </div>
  );
}

const ICONS = {
  scissors: <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.1 7.9 20 20M8.1 16.1 20 4" />,
  fabric: <path d="M4 5c3-2 5 2 8 0s5-2 8 0v14c-3-2-5 2-8 0s-5-2-8 0V5Z" />,
  truck: <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  swap: <path d="M4 9h13l-3-3M20 15H7l3 3" />,
  chat: <path d="M4 5h16v11H9l-5 4V5Zm4 5h.01M12 10h.01M16 10h.01" />,
  cash: <path d="M3 7h18v10H3zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 10v4M18 10v4" />,
  shield: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  sparkle: <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2" />,
};

/** Icon nét mảnh dùng chung */
export function Icon({ name, className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  );
}
