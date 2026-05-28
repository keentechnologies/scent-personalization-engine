import AppShell from "@/components/layout/app-shell";
import QuizRouteGuard from "@/components/auth/quiz-route-guard";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuizRouteGuard>
      <AppShell>
        {children}
      </AppShell>
    </QuizRouteGuard>
  );
}