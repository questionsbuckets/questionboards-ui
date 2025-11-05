import DashboardShell from "@/components/DashboardShell/DashboardShell";

export default function TutorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
