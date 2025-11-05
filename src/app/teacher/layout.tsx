import DashboardShell from "@/components/DashboardShell/DashboardShell";

export default function TeachersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
