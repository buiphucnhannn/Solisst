import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ScriptNote, SilkDrape } from "@/components/ui/Decor";

export default function NotFound() {
  return (
    <main className="bg-paper-texture relative overflow-hidden">
      <SilkDrape className="absolute -top-10 -right-16 h-[380px] w-[360px] opacity-80" />
      <Container className="relative">
        <div className="flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-rose uppercase">Lỗi 404</p>
          <h1 className="mt-4 font-serif text-5xl text-plum italic sm:text-6xl">Không tìm thấy trang</h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Đường dẫn bạn truy cập không tồn tại hoặc đã bị di chuyển. Cùng quay lại khám phá bộ sưu tập nhé.
          </p>
          <Button href="/" className="mt-9" arrow>
            Về trang chủ
          </Button>
          <ScriptNote lines={["See you", "again"]} className="mt-10 -rotate-6 text-4xl" />
        </div>
      </Container>
    </main>
  );
}
