import WebFooter from "@/components/webiste/WebFooter";
import WebHeader from "@/components/webiste/WebHeader";
import React from "react";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <WebHeader />
      <main className="flex-1">{children}</main>
      <WebFooter />
    </div>
  );
}
