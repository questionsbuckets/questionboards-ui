import { Card } from "@/components/ui/card";
import WebFooter from "@/components/webiste/WebFooter";
import WebHeader from "@/components/webiste/WebHeader";
import React from "react";

export default function profileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <WebHeader />
      <main className="flex-1">
        <Card className="max-w-4xl p-6 mx-4 md:mx-auto my-8">{children}</Card>
      </main>
      <WebFooter />
    </div>
  );
}
