import AppShell from "@/components/layout/app-shell";
import QuizRouteGuard from "@/components/auth/quiz-route-guard";
import BrandHeader from "@/components/layout/brand-header";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuizRouteGuard>
      <AppShell>
        <div className="flex flex-col min-h-[100dvh] md:min-h-[600px] bg-cream">
          <BrandHeader />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </AppShell>
    </QuizRouteGuard>
  );
}