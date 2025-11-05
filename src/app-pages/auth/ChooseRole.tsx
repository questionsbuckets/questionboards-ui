"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";
import { QuoteCarousel } from "@/components/auth/QuoteCarousel";
import AuthWrappert from "@/components/auth/AuthWrappert";
import { useChooseRole } from "@/hooks/mutations/useChooseRole";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
const roles = [
  { id: "parent", label: "Parent", icon: "/image/auth-parents.png" },
  { id: "student", label: "Student", icon: "/image/auth-student.png" },
  { id: "tutor", label: "Tutor", icon: "/image/auth-tutor.png" },
  { id: "school", label: "School", icon: "/image/auth-school.png" },
];

function ChooseRole() {
  const router = useRouter();
  const { mutateAsync: chooseUserRole, isPending } = useChooseRole();
  const [selectedRole, setSelectedRole] = useState<string>("");

  async function handleRole(roleId: string) {
    if (!roleId) {
      toast.error("Please select a role");
      return;
    }
    try {
      await chooseUserRole(roleId);
      toast.success("Role selected successfully!");
      router.push(`/auth/profile-completion/${roleId}`);
    } catch (error: any) {
      console.log("🚀 ~ ChooseRolePage ~ error:", error);
      toast.error(error?.response?.data?.message || "Role selection failed!");
    }
  }

  return (
    <AuthWrappert>
      <div className="flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg bg-white h-[calc(100vh-20vh)]">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col ">
          <div className="mb-5 flex justify-center gap-3">
            <Image src="/image/logo.png" alt="logo" width={40} height={40} />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Question Boards
              </h2>
              <p className="text-sm text-gray-500">
                Practice • Analyze • Improve
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-center">
            Be a part of Question Boards
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {/* Form */}
          <div className="flex flex-col space-y-4 sm:space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`
                    flex flex-col items-center justify-center gap-3 p-8 rounded-2xl cursor-pointer transition-all
                    bg-background/60 hover:bg-primary/50 border border-transparent hover:border-primary/30
                    ${
                      selectedRole === role.id
                        ? "border-primary bg-primary/50"
                        : ""
                    }
                  `}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white shadow-sm">
                    <Image
                      src={role.icon}
                      alt={role.label}
                      width={50}
                      height={50}
                    />
                  </div>
                  <span className="font-medium text-gray-800">
                    {role.label}
                  </span>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="rounded-full cursor-pointer"
              disabled={isPending}
              onClick={() => {
                handleRole(selectedRole);
              }}
            >
              {isPending && <Loader2Icon className="animate-spin" />}
              Next
            </Button>

            <p className="text-base  text-center">
              By signing in, I accept Question Board’s <br />
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Right Section (Image + Quote) */}
        <div className="hidden md:flex w-1/2 bg-gray-100 relative items-center justify-center">
          <Image
            src="/image/auth-login.png"
            alt="Students"
            fill
            className="object-cover"
            priority
          />
          <QuoteCarousel />
        </div>
      </div>
    </AuthWrappert>
  );
}

export default ChooseRole;
