"use client";
import { MainLoader } from "@/components/ui/common/MainLoader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/home`);
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return <MainLoader />;
}
