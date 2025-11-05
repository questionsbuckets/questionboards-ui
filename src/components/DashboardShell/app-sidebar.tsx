"use client";
import * as React from "react";
import { ChevronRight, GalleryVerticalEnd } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

// This is sample data.
const roleMenus = {
  admin: [
    { title: "Dashboard", url: "/admin" },
    {
      title: "Manage User Roles",
      url: "/admin/manage-user-roles",
    },
    {
      title: "Manage Question Boards",
      url: "/admin/manage-question-boards",
    },
    { title: "40-a-Day", url: "/admin/admin-40-a-day" },
    { title: "QB Settings", url: "/admin/qb-settings" },
    { title: "Manage Reviews", url: "/admin/manage-reviews" },
    {
      title: "Manage Subscriptions",
      url: "/admin/manage-subscriptions",
    },
    { title: "Your Profile", url: "/admin/profile" },
    {
      title: "Change Password",
      url: "/admin/change-password",
    },
    { title: "Support", url: "/admin/support" },
  ],
  student: [
    { title: "Your Profile", url: "#" },
    { title: "Change Password", url: "#" },
    { title: "Your Subscriptions", url: "#" },
    { title: "Account Settings", url: "#" },
    { title: "40-a-Day Plan", url: "#" },
    { title: "Support", url: "#" },
  ],
  tutor: [
    { title: "Your Profile", url: "#" },
    { title: "Change Password", url: "#" },
    { title: "Your Subscriptions", url: "#" },
    { title: "Account Settings", url: "#" },
    { title: "Tutor Assignments", url: "#" },
    { title: "Calendar", url: "#" },
    { title: "Support", url: "#" },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // ✅ Get current route

  const currentRole: "student" | "tutor" | "admin" = "admin";
  const menuItems = roleMenus[currentRole];
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent pointer-events-none"
            >
              <div>
                <div>
                  <Image
                    src="/image/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold">Question Boards</span>
                  <span className="">Practice • Analyze • Improve</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Divider Line */}
      <div className="h-[1px] w-full bg-background "></div>
      {/* Main menu */}

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = pathname === item.url;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`justify-between rounded-md text-sm font-medium px-4 py-5 transition-all duration-300 ease-in-out transform
                   ${
                     isActive
                       ? "bg-foreground text-white hover:bg-foreground hover:text-white scale-[1.02]"
                       : "hover:bg-[#f3f4f6] hover:text-foreground text-gray-700 hover:scale-[1.02]"
                   }`}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center justify-between w-full"
                    >
                      <span className="font-bold">{item.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
