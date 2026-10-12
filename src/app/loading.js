import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <main className="bg-white">
      <Container>
        <div className="flex min-h-[40vh] items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
        </div>
      </Container>
    </main>
  );
}
