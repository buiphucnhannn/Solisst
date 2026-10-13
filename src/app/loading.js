export default function Loading() {
  return (
    <main className="bg-paper-texture">
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20">
        <p className="font-serif text-4xl text-plum italic">Solisst</p>
        <div className="h-px w-32 overflow-hidden bg-plum/15">
          <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] bg-plum" />
        </div>
        <style>{`@keyframes loading{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
      </div>
    </main>
  );
}
