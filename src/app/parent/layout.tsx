import DashboardShell from "@/components/DashboardShell/DashboardShell";

export default function ParentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
