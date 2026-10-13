import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Ảnh người mẫu đã tách nền, đặt thẳng lên nền trang (không khung, không viền):
 * quầng sáng mờ phía sau + bóng đổ mềm dưới chân để hoà vào không gian.
 *
 * ratio      tỉ lệ ảnh "rộng/cao" — giữ khung đúng hình để bóng đổ nằm đúng chân
 * fadeBottom mờ dần chân ảnh (dùng khi ảnh gốc bị cắt ngang thân váy)
 */
export default function Cutout({
  src,
  alt,
  ratio,
  sizes,
  eager = false,
  glow = true,
  shadow = true,
  fadeBottom = false,
  className,
  ...rest
}) {
  // Chỉ thêm "relative" khi nơi dùng chưa tự định vị (absolute/fixed) — tránh 2 class position đè nhau
  const positioned = /\b(absolute|fixed)\b/.test(className ?? "");

  return (
    <div className={cn(!positioned && "relative", className)} style={ratio ? { aspectRatio: ratio } : undefined} {...rest}>
      {glow ? (
        <div aria-hidden="true" className="absolute inset-x-[-18%] top-[8%] bottom-[4%] rounded-full bg-white/50 blur-3xl" />
      ) : null}
      {shadow ? (
        <div aria-hidden="true" className="absolute bottom-0 left-1/2 h-[3.5%] w-[72%] -translate-x-1/2 rounded-[50%] bg-[#5a3a28]/30 blur-lg" />
      ) : null}
      {/* Không dùng chung mask (mờ chân) với drop-shadow — Chrome sẽ vẽ ra khung chữ nhật mờ quanh ảnh */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        quality={eager ? 85 : undefined}
        fetchPriority={eager ? "high" : undefined}
        className={cn(
          "object-contain object-bottom",
          fadeBottom
            ? "[mask-image:linear-gradient(to_bottom,#000_82%,transparent)]"
            : "drop-shadow-[0_18px_30px_rgba(70,40,25,0.18)]",
        )}
      />
    </div>
  );
}
