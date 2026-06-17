type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-[100dvh] bg-cream md:flex md:items-center md:justify-center">
      {/* Mobile: full-screen | Desktop: centered card with visual depth */}
      <div className="min-h-[100dvh] w-full max-w-md mx-auto md:min-h-0 md:my-8 md:rounded-3xl md:border md:border-border md:shadow-lg md:overflow-hidden">
        {children}
      </div>
    </div>
  );
}