"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGetUserProfile } from "@/hooks/queries/useGetUserProfile";

export function Header() {
  const router = useRouter();
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://avatar.vercel.sh/john",
  });

  const { data: userDetails } = useGetUserProfile();

  const handleLogout = () => {
    // your logout logic
    console.log("Logging out...");
    // router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex  h-16 items-center justify-between border-b border-border bg-white px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
