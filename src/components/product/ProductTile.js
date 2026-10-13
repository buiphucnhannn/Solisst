import Link from "next/link";
import Image from "next/image";
import { categoryLabel, discountPercent, isCutout } from "@/lib/products";
import { cn, formatVND } from "@/lib/utils";

// Nền "studio" be loang cho ảnh đã tách nền — không mép, không viền
const STAGE = "bg-[radial-gradient(70%_60%_at_50%_60%,#f3e8dc_0%,#eadccd_60%,#e3d1be_100%)]";

/** Ảnh trong thẻ: bản tách nền đứng trên nền be, ảnh chụp thì phủ kín thẻ. */
function TileImage({ src, alt, sizes, eager = false, className }) {
  const cut = isCutout(src);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : undefined}
      quality={eager ? 85 : undefined}
      className={cn(
        cut
          ? "object-contain object-bottom px-[8%] pt-[6%] [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
          : "object-cover object-top",
        className,
      )}
    />
  );
}

/**
 * Thẻ sản phẩm cho trang Bộ sưu tập & mục "Có thể bạn cũng thích".
 * Rê chuột: đổi sang ảnh thứ hai (nếu có) và hiện nút "Xem chi tiết".
 */
export default function ProductTile({
  item,
  eager = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
  ...rest
}) {
  const { product, color, href, cover, hover } = item;
  const multi = product.colors.length > 1;

  return (
    <Link {...rest} href={href} className="group block">
      <div className={cn("relative aspect-[3/4] overflow-hidden rounded-xl", STAGE)}>
        <TileImage
          src={cover}
          alt={`${product.name} — ${color.label}`}
          sizes={sizes}
          eager={eager}
          className={cn("transition duration-700 ease-out", hover ? "group-hover:opacity-0" : "group-hover:scale-[1.04]")}
        />
        {hover ? (
          <TileImage
            src={hover}
            alt=""
            sizes={sizes}
            className="scale-[1.03] opacity-0 transition duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
        ) : null}

        <span className="absolute top-3 left-3 rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-plum uppercase backdrop-blur">
          {product.tag}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-sale px-2 py-0.5 text-[11px] font-bold text-white">
          -{discountPercent(product)}%
        </span>

        <span className="absolute inset-x-3 bottom-3 flex h-10 translate-y-2 items-center justify-center gap-2 rounded-md bg-plum text-[11px] font-semibold tracking-[0.14em] text-white uppercase opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Xem chi tiết <span aria-hidden="true">→</span>
        </span>
      </div>

      <div className="mt-4 px-0.5">
        <p className="text-[10.5px] font-semibold tracking-[0.22em] text-rose uppercase">{categoryLabel(product.collection)}</p>
        <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink transition-colors group-hover:text-plum sm:text-xl">
          {product.name}
          {multi ? <span className="text-ink-soft/70"> · {color.label}</span> : null}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold text-sale">{formatVND(product.salePrice)}</span>
          <span className="text-xs text-ink-soft/50 line-through">{formatVND(product.price)}</span>
        </div>
        {multi ? (
          <div className="mt-2.5 flex items-center gap-1.5" aria-label={`${product.colors.length} hoạ tiết`}>
            {product.colors.map((c) => (
              <span
                key={c.id}
                title={c.label}
                className={cn(
                  "h-3.5 w-3.5 rounded-full ring-offset-1 ring-offset-cream",
                  c.id === color.id ? "ring-1 ring-plum" : "ring-1 ring-ink/10",
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
