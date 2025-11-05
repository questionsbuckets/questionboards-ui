import DashboardShell from "@/components/DashboardShell/DashboardShell";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
