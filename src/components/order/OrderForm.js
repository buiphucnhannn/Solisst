"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMBOS, PRODUCTS, getProduct, productGallery, productUrl, quote } from "@/lib/products";
import { ORDER_SELECT_EVENT } from "@/lib/order-bus";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { track } from "@/lib/track";
import { siteConfig } from "@/lib/site";
import { cn, formatVND } from "@/lib/utils";
import Countdown from "@/components/ui/Countdown";
import { Icon } from "@/components/ui/Decor";
import SizeTable from "./SizeTable";

const PHONE_VN = /^0\d{9}$/;
const PHONE_INTL = /^\+\d{8,15}$/;
const MAX_QTY = COMBOS[COMBOS.length - 1].qty;

function normalizePhone(v) {
  return v.replace(/[\s.\-()]/g, "");
}

function validate(form) {
  const errors = {};
  if (!form.size) errors.size = "Vui lòng chọn size";
  if (form.name.trim().length < 2) errors.name = "Vui lòng nhập họ tên";
  const phone = normalizePhone(form.phone);
  if (!PHONE_VN.test(phone) && !PHONE_INTL.test(phone)) errors.phone = "Số điện thoại chưa đúng";
  if (form.address.trim().length < 10) errors.address = "Vui lòng nhập địa chỉ chi tiết";
  return errors;
}

/** Lấy UTM / click id từ URL quảng cáo để biết đơn đến từ chiến dịch nào. */
function readSource() {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ttclid", "fbclid"];
  return Object.fromEntries(keys.filter((k) => params.get(k)).map((k) => [k, params.get(k)]));
}

const EMPTY = { name: "", phone: "", address: "", note: "", website: "" };

const TRUST = [
  { icon: "cash", label: "Thanh toán khi nhận hàng" },
  { icon: "swap", label: "Đổi size trong 7 ngày" },
  { icon: "truck", label: "Giao hàng toàn quốc" },
];

/**
 * compact + selection: chỉ hiện phần "Thông tin nhận hàng" với mẫu/màu/size/số lượng đã chọn sẵn
 * (dùng trong khung đặt hàng trượt ra ở trang chi tiết sản phẩm).
 */
export default function OrderForm({ initialProductId, selection, compact = false, products = PRODUCTS }) {
  const initial = getProduct(selection?.productId ?? initialProductId) ?? products[0];
  const [productId, setProductId] = useState(initial.id);
  const [colorId, setColorId] = useState(selection?.colorId ?? initial.colors[0].id);
  const [size, setSize] = useState(selection?.size ?? "");
  const [qty, setQty] = useState(selection?.qty ?? 1);
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [orderCode, setOrderCode] = useState("");
  const startedRef = useRef(false);
  const rootRef = useRef(null);

  const product = getProduct(productId);
  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const price = quote(product, qty);

  function pickProduct(id, nextColorId, nextSize) {
    const p = getProduct(id);
    if (!p) return;
    setProductId(p.id);
    setColorId(p.colors.some((c) => c.id === nextColorId) ? nextColorId : p.colors[0].id);
    setSize((s) => {
      const want = nextSize ?? s;
      if (p.sizes.some((x) => x.id === want)) return want;
      return p.sizes.length === 1 ? p.sizes[0].id : "";
    });
    track("ViewContent", { id: p.id, name: p.name, value: p.salePrice });
  }

  // Nhận lựa chọn từ các nút "Chọn mẫu" / "Chọn combo" ở các section khác
  useEffect(() => {
    function onSelect(e) {
      const { productId: pid, colorId: cid, size: sz, qty: q } = e.detail ?? {};
      if (pid) pickProduct(pid, cid, sz);
      if (q) setQty(q);
    }
    window.addEventListener(ORDER_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(ORDER_SELECT_EVENT, onSelect);
  }, []);

  function onStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("InitiateCheckout", { id: product.id, name: product.name, qty, value: price.total });
  }

  function setField(key, value) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const nextErrors = validate({ ...fields, size });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = rootRef.current?.querySelector(`[data-field="${Object.keys(nextErrors)[0]}"]`);
      if (first) smoothScrollTo(first, { align: "center" });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          colorId: color.id,
          size,
          qty,
          ...fields,
          phone: normalizePhone(fields.phone),
          source: readSource(),
          page: window.location.href,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Gửi đơn thất bại");

      track("Purchase", { id: product.id, name: product.name, qty, value: data.total ?? price.total });
      setOrderCode(data.orderCode);
      setStatus("success");
      if (rootRef.current && !compact) smoothScrollTo(rootRef.current);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={rootRef}
        className={cn(
          "text-center",
          compact ? "py-6" : "mx-auto max-w-xl rounded-xl bg-white/80 p-8 shadow-[0_30px_60px_-35px_rgba(42,30,27,0.5)] ring-1 ring-ink/5 sm:p-12",
        )}
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-plum text-2xl text-white">✓</div>
        <h3 className="mt-6 font-serif text-3xl text-plum italic">Cảm ơn {fields.name.trim().split(" ").pop()}!</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          Đơn hàng <span className="font-semibold text-ink">{orderCode}</span> đã được ghi nhận.
          <br />
          Solisst sẽ gọi xác nhận tới số <span className="font-semibold text-ink">{fields.phone}</span> trong ít phút.
        </p>
        <div className="mx-auto mt-8 flex max-w-sm items-center gap-4 rounded-lg bg-paper p-4 text-left text-sm">
          <Image src={color.image} alt="" width={300} height={300} sizes="96px" className="h-16 w-14 rounded-md object-cover object-top" />
          <div>
            <p className="font-semibold text-ink">
              {product.name} · {color.label} · Size {size}
            </p>
            <p className="mt-1 text-ink-soft">
              {qty} sản phẩm — Thu khi nhận: <span className="font-semibold text-sale">{formatVND(price.total)}</span>
            </p>
          </div>
        </div>
        <a
          href={siteConfig.contact.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-11 items-center rounded-md border border-plum/30 px-6 text-[12px] font-semibold tracking-[0.12em] text-plum uppercase hover:bg-plum hover:text-white"
        >
          Nhắn Zalo để được ưu tiên giao ↗
        </a>
      </div>
    );
  }

  const nextCombo = COMBOS.find((c) => c.qty === qty + 1);

  // ===== Form thông tin =====
  const formEl = (
    <form
      data-reveal={compact ? undefined : "right"}
      data-reveal-delay={compact ? undefined : 150}
      onSubmit={onSubmit}
      onFocusCapture={onStart}
      noValidate
      className={cn(
        "relative self-start",
        !compact && "rounded-xl bg-white/85 p-5 shadow-[0_30px_70px_-40px_rgba(42,30,27,0.55)] ring-1 ring-ink/5 backdrop-blur sm:p-7",
      )}
    >
      <p className="text-[15px] font-semibold text-ink">Thông tin nhận hàng</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Họ và tên" required error={errors.name} field="name">
          <input
            autoComplete="name"
            value={fields.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Nguyễn Thị Lan"
            className={inputCls(errors.name)}
          />
        </Field>
        <Field label="Số điện thoại" required error={errors.phone} field="phone">
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="0904 221 887"
            className={inputCls(errors.phone)}
          />
        </Field>
        <Field label="Địa chỉ nhận hàng" required error={errors.address} field="address" className="sm:col-span-2">
          <input
            autoComplete="street-address"
            value={fields.address}
            onChange={(e) => setField("address", e.target.value)}
            placeholder="Số nhà, tên đường, quận/huyện, tỉnh/thành phố"
            className={inputCls(errors.address)}
          />
        </Field>
        <Field label="Ghi chú" className="sm:col-span-2">
          <input
            value={fields.note}
            onChange={(e) => setField("note", e.target.value)}
            placeholder="VD: combo 2 lấy 1 size M + 1 size L"
            className={inputCls()}
          />
        </Field>
        {/* Honeypot chống bot — người thật không thấy */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          name="website"
          value={fields.website}
          onChange={(e) => setField("website", e.target.value)}
          className="absolute h-0 w-0 opacity-0"
        />
      </div>

      {/* Tóm tắt tiền */}
      <dl className="mt-6 space-y-2 rounded-lg bg-paper px-4 py-4 text-[13px] text-ink-soft">
        <div className="flex justify-between gap-3">
          <dt className="min-w-0 truncate">
            {product.name} · {color.label}
            {size ? ` · ${size}` : ""} × {qty}
          </dt>
          <dd className="shrink-0">{formatVND(price.subtotal)}</dd>
        </div>
        {price.discount ? (
          <div className="flex justify-between text-plum">
            <dt>Ưu đãi combo {qty} (-{price.combo.discount * 100}%)</dt>
            <dd>-{formatVND(price.discount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between">
          <dt>Phí giao hàng</dt>
          <dd className={price.shipping ? "" : "font-medium text-plum"}>{price.shipping ? formatVND(price.shipping) : "Miễn phí"}</dd>
        </div>
        <div className="flex items-end justify-between border-t border-ink/10 pt-3">
          <dt className="font-semibold text-ink">Tổng thanh toán</dt>
          <dd className="font-serif text-2xl font-semibold text-sale">{formatVND(price.total)}</dd>
        </div>
      </dl>

      {status === "error" ? (
        <p className="mt-4 rounded-md bg-sale/10 px-4 py-3 text-sm text-sale" role="alert">
          Chưa gửi được đơn. Vui lòng thử lại hoặc nhắn Zalo{" "}
          <a href={siteConfig.contact.zalo} className="font-semibold underline">
            {siteConfig.contact.phoneDisplay}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-5 flex h-13 w-full items-center justify-center gap-2.5 rounded-md bg-plum text-[14px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_14px_30px_-12px_rgba(123,30,46,0.8)] transition hover:bg-plum-dark active:scale-[0.99] disabled:opacity-70"
      >
        {status === "submitting" ? "Đang gửi đơn…" : "Đặt hàng ngay"}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-ink-soft">
        <Icon name="clock" className="h-3.5 w-3.5 text-sale" />
        Giá flash sale còn <Countdown className="font-semibold text-sale" />
      </p>

      <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-ink/10 pt-4">
        {TRUST.map((t) => (
          <li key={t.label} className="flex items-center gap-1.5 text-[11.5px] text-ink-soft">
            <Icon name={t.icon} className="h-4 w-4 text-plum" />
            {t.label}
          </li>
        ))}
      </ul>
    </form>
  );

  if (compact) return <div ref={rootRef}>{formEl}</div>;

  return (
    <div ref={rootRef} className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
      {/* ===== Sản phẩm ===== */}
      <div
        data-reveal="left"
        className="grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[64px_minmax(0,1fr)_minmax(0,1fr)] md:gap-5"
      >
        {/* Thumbnails — chọn mẫu */}
        <div
          role="radiogroup"
          aria-label="Chọn mẫu"
          className="no-scrollbar order-2 -mx-1 flex gap-2.5 overflow-x-auto px-1 py-1 sm:col-span-2 md:order-none md:col-span-1 md:mx-0 md:flex-col md:overflow-visible md:px-0"
        >
          {products.map((p) => {
            const active = p.id === productId;
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={p.name}
                title={p.name}
                onClick={() => pickProduct(p.id)}
                className={cn(
                  "relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-sand transition",
                  active ? "ring-2 ring-plum ring-offset-2 ring-offset-cream" : "opacity-70 ring-1 ring-ink/10 hover:opacity-100",
                )}
              >
                <Image src={p.colors[0].cutout ?? p.colors[0].image} alt="" fill sizes="110px" className="object-cover object-top" />
              </button>
            );
          })}
        </div>

        {/* Ảnh lớn */}
        {/* Váy có bản tách nền → đứng trên nền be loang; đồ bộ → ảnh chụp bo góc mềm, không viền */}
        <div
          className={cn(
            "relative aspect-[4/5] sm:aspect-auto sm:min-h-[420px]",
            color.cutout
              ? "bg-[radial-gradient(58%_52%_at_50%_58%,#eadccd_0%,rgba(234,220,205,0.55)_55%,transparent_78%)]"
              : "overflow-hidden rounded-2xl",
          )}
        >
          <Image
            key={color.cutout ?? color.image}
            src={color.cutout ?? color.image}
            alt={`${product.name} — ${color.label}`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
            className={
              color.cutout
                ? "object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_86%,transparent)]"
                : "object-cover object-top"
            }
          />
          <span className="absolute top-3 left-3 rounded-sm bg-plum px-2 py-1 text-[10px] font-semibold tracking-wider text-white uppercase">
            {product.tag}
          </span>
          {/* Nhãn kính mờ góc ảnh → trang chi tiết (thêm ảnh, mô tả, chất liệu) */}
          {!compact ? (
            <Link
              href={productUrl(product, color.id)}
              className="group absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-cream/85 px-3 py-1.5 text-[11.5px] font-medium text-plum shadow-sm ring-1 ring-plum/10 backdrop-blur transition hover:bg-plum hover:text-white"
            >
              <Icon name="sparkle" className="h-3.5 w-3.5" />
              Xem {productGallery(product).length} ảnh
            </Link>
          ) : null}
        </div>

        {/* Thông tin + lựa chọn */}
        <div className="order-3 flex flex-col sm:order-none">
          <h3 className="font-serif text-2xl leading-tight text-ink">{product.name}</h3>
          <p className="mt-1 text-[13px] text-ink-soft/70">{product.subtitle}</p>
          {!compact ? (
            <Link
              href={productUrl(product, color.id)}
              className="group mt-2 inline-flex w-fit items-center gap-1.5 text-[12.5px] font-medium text-plum underline decoration-plum/30 underline-offset-4 transition hover:decoration-plum"
            >
              Xem chi tiết sản phẩm
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ) : null}
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-serif text-[1.7rem] font-semibold text-sale">{formatVND(product.salePrice)}</span>
            <span className="text-sm text-ink-soft/50 line-through">{formatVND(product.price)}</span>
          </div>

          {/* Màu */}
          <div className="mt-5">
            <p className="text-[12px] font-medium text-ink">
              Màu: <span className="font-normal text-ink-soft">{color.label}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Chọn màu">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={c.id === color.id}
                  aria-label={c.label}
                  title={c.label}
                  onClick={() => setColorId(c.id)}
                  className={cn(
                    "h-7 w-7 rounded-full ring-offset-2 ring-offset-cream transition",
                    c.id === color.id ? "ring-2 ring-plum" : "ring-1 ring-ink/15",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-5" data-field="size">
            <p className="text-[12px] font-medium text-ink">Size</p>
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Chọn size">
              {product.sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={s.id === size}
                  title={s.hint}
                  onClick={() => {
                    setSize(s.id);
                    setErrors((e) => ({ ...e, size: undefined }));
                  }}
                  className={cn(
                    "h-9 min-w-11 rounded-sm border px-3 text-[13px] transition",
                    s.id === size ? "border-plum bg-plum text-white" : "border-ink/15 bg-white/60 hover:border-plum/50",
                    errors.size && "border-sale/60",
                  )}
                >
                  {s.id}
                </button>
              ))}
            </div>
            {errors.size ? <p className="mt-1.5 text-xs font-medium text-sale">{errors.size}</p> : null}
            <details className="group mt-2">
              <summary className="cursor-pointer list-none text-[11.5px] text-rose underline underline-offset-4 [&::-webkit-details-marker]:hidden">
                Bảng size
              </summary>
              <SizeTable collection={product.collection} />
            </details>
          </div>

          {/* Số lượng / combo */}
          <div className="mt-5">
            <p className="text-[12px] font-medium text-ink">Số lượng</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="inline-flex h-10 items-center rounded-sm border border-ink/15 bg-white/60">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  disabled={qty <= 1}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-full w-10 place-items-center text-lg text-ink-soft disabled:opacity-30"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  disabled={qty >= MAX_QTY}
                  onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                  className="grid h-full w-10 place-items-center text-lg text-ink-soft disabled:opacity-30"
                >
                  +
                </button>
              </div>
              <span className={cn("text-[11.5px] leading-tight", price.discount ? "font-semibold text-plum" : "text-ink-soft/70")}>
                {price.combo.perk}
              </span>
            </div>
            {nextCombo ? (
              <button
                type="button"
                onClick={() => setQty(nextCombo.qty)}
                className="mt-2.5 text-left text-[11.5px] text-ink-soft hover:text-plum"
              >
                🎁 Thêm {nextCombo.qty - qty} sản phẩm để{" "}
                <span className="font-semibold text-plum">{nextCombo.perk.toLowerCase()}</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {formEl}
    </div>
  );
}

function Field({ label, required, error, field, className, children }) {
  return (
    <label data-field={field} className={cn("block", className)}>
      <span className="mb-1.5 block text-[12px] text-ink-soft">
        {label} {required ? <span className="text-sale">*</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs font-medium text-sale">{error}</span> : null}
    </label>
  );
}

function inputCls(error) {
  return cn(
    "h-11 w-full rounded-md border bg-white px-3.5 text-[14px] text-ink placeholder:text-ink/30 transition outline-none focus:border-plum focus:ring-2 focus:ring-plum/10",
    error ? "border-sale/70" : "border-ink/15",
  );
}
