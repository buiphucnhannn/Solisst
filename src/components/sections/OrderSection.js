import Link from "next/link";
import { ORDER_ANCHOR } from "@/lib/order-bus";
import { HOT_PRODUCTS, collectionItems } from "@/lib/products";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import OrderForm from "@/components/order/OrderForm";
import { FlowerSprig, Icon } from "@/components/ui/Decor";

/**
 * Trang chủ: khu chốt đơn nhanh chỉ với các mẫu hot (theo brief "chốt đơn 1 chạm").
 * Muốn xem đủ mẫu → trang Bộ sưu tập, mỗi sản phẩm có trang chi tiết & khung đặt hàng riêng.
 */
export default function OrderSection() {
  return (
    <section id={ORDER_ANCHOR} className="bg-paper-texture relative overflow-hidden py-16 sm:py-20">
      <FlowerSprig data-reveal="fade" data-reveal-delay="300" className="absolute -top-6 -right-10 hidden h-80 w-60 opacity-90 xl:block" />
      <FlowerSprig data-reveal="fade" data-reveal-delay="300" className="absolute -bottom-16 -left-16 hidden h-72 w-52 rotate-[200deg] opacity-60 xl:block" />
      <Container className="relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading reveal="down"
            eyebrow={`Top ${HOT_PRODUCTS.length} mẫu bán chạy tuần này`}
            size="md"
            title={
              <>
                <em>Đặt nhanh mẫu hot</em> — chốt đơn trong 30 giây
              </>
            }
            description="Chọn mẫu, size, số lượng rồi điền thông tin nhận hàng. Không cần tài khoản, không cần chuyển khoản trước — Solisst gọi xác nhận trong ít phút."
          />
          <Link data-reveal="right" data-reveal-delay="200"
            href="/bo-suu-tap"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-md border border-plum/25 bg-cream/70 px-4 py-2.5 text-[12.5px] font-medium text-plum transition hover:bg-plum hover:text-white lg:self-auto"
          >
            Xem đủ {collectionItems().length} thiết kế trong Bộ sưu tập
            <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-10">
          <OrderForm products={HOT_PRODUCTS} />
        </div>
      </Container>
    </section>
  );
}
