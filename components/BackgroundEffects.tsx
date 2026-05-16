export function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="snow-grid absolute inset-0 opacity-60" />
      <div className="absolute left-0 top-28 h-px w-full opacity-60 scan-line" />
      <div className="absolute bottom-24 left-0 h-px w-full opacity-40 scan-line" />
      <div className="absolute -left-32 top-1/4 h-96 w-[28rem] rotate-12 bg-snow-purple/[0.18] blur-3xl [clip-path:polygon(8%_22%,82%_0,100%_58%,30%_100%)]" />
      <div className="absolute -right-28 top-12 h-[34rem] w-[30rem] -rotate-12 bg-snow-lilac/[0.14] blur-3xl [clip-path:polygon(20%_0,100%_18%,76%_100%,0_72%)]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-[32rem] bg-snow-deep/70 blur-3xl [clip-path:polygon(0_34%,70%_0,100%_100%,18%_82%)]" />
    </div>
  );
}
