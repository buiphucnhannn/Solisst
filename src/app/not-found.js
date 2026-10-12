import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="bg-white">
      <Container>
        <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
          <p className="text-sm font-semibold tracking-widest text-slate-500 uppercase">
            Lỗi 404
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Không tìm thấy trang
          </h1>
          <p className="mt-3 max-w-md text-slate-600">
            Đường dẫn bạn truy cập không tồn tại hoặc đã bị di chuyển.
          </p>
          <Button href="/" className="mt-8" variant="outline">
            ← Về trang chủ
          </Button>
        </div>
      </Container>
    </main>
  );
}
