import { siteConfig } from "@/lib/site";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const FAQS = [
  {
    q: "Tôi có được kiểm tra hàng trước khi thanh toán không?",
    a: "Có. Solisst giao COD toàn quốc — bạn được mở hộp, xem chất liệu, đường may thoải mái rồi mới thanh toán cho shipper.",
  },
  {
    q: "Mặc không vừa thì đổi thế nào?",
    a: "Trong 7 ngày kể từ khi nhận, sản phẩm còn tag và chưa giặt sẽ được đổi size miễn phí. Bạn chỉ cần nhắn Zalo, Solisst lo phí ship đổi.",
  },
  {
    q: "Bao lâu thì tôi nhận được hàng?",
    a: "Hàng có sẵn tại kho Bắc Ninh: Hà Nội – Bắc Ninh 1–2 ngày, các tỉnh khác 2–4 ngày. Đơn đặt trước 16:00 được gửi đi trong ngày.",
  },
  {
    q: "Combo có được chọn nhiều mẫu, nhiều size khác nhau không?",
    a: "Được. Bạn ghi chú mẫu/màu/size mong muốn ở ô “Ghi chú” trong form, nhân viên sẽ gọi xác nhận lại trước khi gửi hàng.",
  },
  {
    q: "Có giao hàng ra nước ngoài không?",
    a: `Có hỗ trợ gửi quốc tế. Vui lòng nhắn Zalo ${siteConfig.contact.phoneDisplay} để được báo phí và thời gian vận chuyển theo quốc gia.`,
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-paper-texture py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading reveal="left"
              eyebrow="Hỏi đáp"
              size="md"
              title={<em>Bạn còn băn khoăn?</em>}
              description="Không tìm thấy câu trả lời? Nhắn Solisst qua Zalo — phản hồi trong vòng 5 phút."
            />
            <a
              href={siteConfig.contact.zalo}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal="up" data-reveal-delay="150"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-md border border-plum/30 px-5 text-[12px] font-semibold tracking-[0.12em] text-plum uppercase transition-colors hover:bg-plum hover:text-white"
            >
              Chat Zalo với stylist ↗
            </a>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <details key={item.q} data-reveal="right" data-reveal-delay={i * 90} className="group rounded-lg bg-white/70 px-5 ring-1 ring-ink/5 open:bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper text-plum transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pr-10 pb-5 text-[14px] leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
