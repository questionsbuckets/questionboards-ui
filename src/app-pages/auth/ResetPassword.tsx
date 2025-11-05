"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/common/InputField";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useResetPassword } from "@/hooks/mutations/useResetPassword";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { getCookie, removeCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import AuthWrappert from "@/components/auth/AuthWrappert";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required("Please enter password")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .matches(/^\S*$/, "Password cannot contain spaces"),

  confirmPassword: Yup.string()
    .required("Please enter Confirm-Password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

function ResetPassword() {
  const router = useRouter();
  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = getCookie("forgetJWT");
        if (!token) {
          toast.error("Token not found , please login again");
          return;
        }
        let payload = {
          token,
          ...values,
        };
        const res = await resetPassword(payload);
        toast.success(res?.message || "Password reset successfully!");
        removeCookie("forgetJWT");
        router.push("/auth/login");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Reset password failed!");
        console.log("🚀 ~ ResetPassword ~ error:", error);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = formik;
  return (
    <AuthWrappert>
      <div className="flex w-full max-w-xl rounded-2xl overflow-hidden shadow-lg bg-white h-[calc(100vh-20vh)]">
        <div className="w-full  p-8 md:p-12 flex flex-col ">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            New Password
          </h2>
          <p className="text-md  mb-6 text-center">Enter new password below.</p>

          {/* Form */}
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <InputField
              id="newPassword"
              label="New password"
              type="password"
              placeholder="Enter New Password"
              required
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.newPassword && errors.newPassword
                  ? errors.newPassword
                  : ""
              }
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              required
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
            />

            <Button
              type="submit"
              className="rounded-full cursor-pointer"
              disabled={isPending}
            >
              {isPending && <Loader2Icon className="animate-spin" />}
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </AuthWrappert>
  );
}

export default ResetPassword;
