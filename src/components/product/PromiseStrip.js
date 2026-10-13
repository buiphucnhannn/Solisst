import Container from "@/components/ui/Container";
import { Icon } from "@/components/ui/Decor";

const ITEMS = [
  { icon: "cash", title: "Thanh toán khi nhận", desc: "Kiểm tra hàng rồi mới trả tiền" },
  { icon: "truck", title: "Freeship combo 2+", desc: "Giao toàn quốc 2–4 ngày" },
  { icon: "swap", title: "Đổi size 7 ngày", desc: "Solisst chịu phí ship đổi" },
  { icon: "chat", title: "Stylist tư vấn", desc: "Chọn size theo số đo của bạn" },
];

/** Dải cam kết dịch vụ — dùng ở trang Bộ sưu tập & Chi tiết sản phẩm. */
export default function PromiseStrip() {
  return (
    <section className="bg-paper-texture py-10 sm:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <li key={it.title} data-reveal="pop" data-reveal-delay={i * 100} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-plum">
                <Icon name={it.icon} />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-ink">{it.title}</p>
                <p className="mt-0.5 text-[12.5px] text-ink-soft/75">{it.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
