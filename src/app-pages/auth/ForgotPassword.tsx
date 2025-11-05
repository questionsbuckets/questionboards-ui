"use client";

import { Button } from "@/components/ui/button";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import PhoneNumberInput from "@/components/ui/common/PhoneInput";
import { phoneNumberRules } from "@/utils/common";
import { useRouter } from "next/navigation";
import { useForgetPassword } from "@/hooks/mutations/useForgetPassword";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { setCookie } from "@/utils/cookie";
import AuthWrappert from "@/components/auth/AuthWrappert";
const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Please enter phone number")
    .test("is-valid-length", "Enter a valid phone number", function (value) {
      const { phoneCountryCode } = this.parent;
      if (!value || !phoneCountryCode) return false;
      // Remove + if present
      const code = phoneCountryCode.replace("+", "");
      // Remove the leading country code from value
      const numberOnly = value.startsWith(code)
        ? value.slice(code.length)
        : value;
      // Remove any non-numeric chars
      const digitsOnly = numberOnly.replace(/\D/g, "");

      const expectedLength = phoneNumberRules[code];
      return expectedLength ? digitsOnly.length === expectedLength : true;
    }),
});

function ForgotPassword() {
  const { mutateAsync: forgotPassword, isPending } = useForgetPassword();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      phoneCountryCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Signup form data:", values);
      const { phoneCountryCode, phoneNumber, ...rest } = values;
      const code = phoneCountryCode.replace("+", "");
      const purePhoneNumber = phoneNumber.startsWith(code)
        ? phoneNumber.slice(code.length)
        : phoneNumber;

      let payload = `${phoneCountryCode}${purePhoneNumber}`;
      setCookie("phoneNumber", payload, { expires: 1 });
      try {
        await forgotPassword(payload);
        toast.success("OTP sent successfully please verify your number!");
        router.push("/auth/verify-number?from=forgot");
      } catch (error: any) {
        console.log("🚀 ~ forget password:", error);
        toast.error(
          error?.response?.data?.message || "forgot password failed try again !"
        );
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
            Forgot Your Password?
          </h2>
          <p className="text-md  mb-6 text-center">
            No worries! Just enter your phone number below, and we'll send you a
            link to reset your password.
          </p>

          {/* Form */}
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <PhoneNumberInput
              label="Phone Number"
              value={values.phoneNumber}
              required
              error={touched.phoneNumber ? errors.phoneNumber : ""}
              onChange={(phone, code) => {
                setFieldValue("phoneNumber", phone);
                setFieldValue("phoneCountryCode", code);
              }}
            />

            <Button
              type="submit"
              className="rounded-full cursor-pointer"
              disabled={isPending}
            >
              {isPending && <Loader2Icon className="animate-spin" />}
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
      </AuthWrappert>
  );
}

export default ForgotPassword;
