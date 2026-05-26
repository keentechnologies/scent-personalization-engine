type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto min-h-screen w-full max-w-md bg-white">
        {children}
      </div>
    </div>
  );
}