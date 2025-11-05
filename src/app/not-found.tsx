"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br bg-background p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 max-w-lg text-center animate-fadeIn">
        <AlertCircle className="mx-auto mb-6 text-destructive w-16 h-16 animate-bounce" />
        <h1 className="text-7xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link href="/home" passHref>
          <Button
            variant="default"
            className="w-full bg-primary hover:bg-primary/90 cursor-pointer  text-white font-medium py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
