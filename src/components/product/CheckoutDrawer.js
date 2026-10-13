"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { isCutout, quote } from "@/lib/products";
import { formatVND } from "@/lib/utils";
import OrderForm from "@/components/order/OrderForm";

/**
 * Khung đặt hàng trượt ra ở trang chi tiết — mẫu/màu/size/số lượng đã chọn sẵn,
 * khách chỉ nhập tên, SĐT, địa chỉ là chốt đơn (form gửi về /api/order như trang chủ).
 * Desktop: trượt từ phải. Mobile: trượt từ dưới lên.
 */
export default function CheckoutDrawer({ open, onClose, product, color, size, qty }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const src = color.cutout ?? color.image;
  const price = quote(product, qty);

  return createPortal(
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 animate-[fade-in_0.25s_ease-out] bg-ink/45 backdrop-blur-[2px]"
      />

      <div className="absolute inset-x-0 bottom-0 flex max-h-[92svh] animate-[sheet-in_0.35s_cubic-bezier(0.2,0.8,0.2,1)] flex-col rounded-t-2xl bg-cream shadow-2xl sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:w-[460px] sm:animate-[drawer-in_0.35s_cubic-bezier(0.2,0.8,0.2,1)] sm:rounded-none">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.25em] text-rose uppercase">Solisst · Đặt hàng nhanh</p>
            <h2 id="checkout-title" className="mt-1 font-serif text-2xl text-plum italic">
              Xác nhận đơn hàng
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng khung đặt hàng"
            className="grid h-10 w-10 place-items-center rounded-full text-xl text-ink-soft transition hover:bg-sand hover:text-plum"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 pt-5 pb-8">
          {/* Mẫu đã chọn */}
          <div className="flex gap-4 rounded-xl bg-paper p-3">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-[radial-gradient(70%_60%_at_50%_60%,#f3e8dc_0%,#e3d1be_100%)]">
              <Image
                src={src}
                alt=""
                fill
                sizes="100px"
                className={isCutout(src) ? "object-contain object-bottom pt-1" : "object-cover object-top"}
              />
            </div>
            <div className="min-w-0 flex-1 py-0.5">
              <p className="font-serif text-lg leading-tight text-ink">{product.name}</p>
              <p className="mt-1 text-[12.5px] text-ink-soft">
                {color.label} · Size {size} · {qty} sản phẩm
              </p>
              <p className="mt-1.5 text-[13px] font-semibold text-sale">{formatVND(price.total)}</p>
              <button type="button" onClick={onClose} className="mt-1 text-[11.5px] text-rose underline underline-offset-4 hover:text-plum">
                Thay đổi lựa chọn
              </button>
            </div>
          </div>

          <div className="mt-6">
            <OrderForm compact selection={{ productId: product.id, colorId: color.id, size, qty }} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
