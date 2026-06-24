type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-[100dvh] bg-[#151311] md:flex md:items-center md:justify-center relative overflow-hidden">
      {/* Visual background ambient glow on desktop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,130,58,0.06),transparent_70%)] pointer-events-none hidden md:block" />

      {/* Main card/phone container */}
      <div
        className="relative min-h-[100dvh] w-full max-w-md mx-auto md:min-h-[780px] md:my-8 md:rounded-[32px] md:border md:border-border md:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] md:overflow-hidden bg-[#151311] flex flex-col"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(21, 19, 17, 0.88), rgba(21, 19, 17, 0.94)), url(/assets/mobile-hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}