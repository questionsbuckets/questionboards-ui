import DashboardShell from "@/components/DashboardShell/DashboardShell";

export default function SchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
