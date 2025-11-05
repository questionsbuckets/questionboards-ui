import DashboardShell from "@/components/DashboardShell/DashboardShell";

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <DashboardShell>{children}</DashboardShell>
  );
}
