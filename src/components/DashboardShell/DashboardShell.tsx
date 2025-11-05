import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./Header";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="w-full h-dvh">
          <Header />
          <div className="flex flex-1 flex-col p-4 h-[calc(100vh-64px)] w-full">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
