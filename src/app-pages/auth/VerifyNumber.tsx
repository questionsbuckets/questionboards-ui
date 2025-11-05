"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyNumber } from "@/hooks/mutations/useVerifyNumber";
import { getCookie, setCookie } from "@/utils/cookie";
import { toast } from "sonner";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import AuthWrappert from "@/components/auth/AuthWrappert";
const validationSchema = Yup.object({
  otp: Yup.string()
    .required("Please enter the OTP")
    .matches(/^\d{4}$/, "OTP must be 4 digits"),
});

function VerifyNumber() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const { mutateAsync: verifyNumber, isPending } = useVerifyNumber();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting OTP ➜", values);
      let phoneNumber = getCookie("phoneNumber");
      if (!phoneNumber) {
        toast.error("Phone number not found , please login again");
        return;
      }

      let payload = {
        code: values.otp,
        phoneNumber,
      };
      try {
        const res = await verifyNumber(payload);
        toast.success("Verification successful!");
        if (res.status) {
          if (from && from === "forgot" && res?.data) {
            setCookie("forgetJWT", res.data);
            router.push("/auth/reset-password");
            return;
          }
          router.push("/auth/login");
        }
      } catch (error: any) {
        console.error("Error verifying OTP:", error);
        toast.error(error?.response?.data?.message || "Verification failed!");
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
            Enter Verification Code
          </h2>
          <p className="text-md  mb-6 text-center">
            We have sent an OTP to your registered phone number.
          </p>
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {/* ✅ OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                value={values.otp}
                onChange={(val) => setFieldValue("otp", val)}
                className="bg-background"
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="
                       mx-2
                      size-12              
                      flex items-center justify-center
                      rounded-lg          
                      border border-gray-300
                      bg-background         
                      text-xl font-semibold text-foreground
                     focus:border-primary focus:ring-2 focus:ring-primary/30
                     outline-none transition-all"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {touched.otp && errors.otp && (
              <p className="text-red-500 text-sm text-center">{errors.otp}</p>
            )}

            <Button
              type="submit"
              className="rounded-full cursor-pointer"
              disabled={isPending}
            >
              {isPending && <Loader2Icon className="animate-spin" />}
              Verify
            </Button>
            <p
              className="text-sm  mb-6 text-center"
              onClick={() => {
                // resend otp api call
              }}
            >
              Don’t receive the OTP? ?{" "}
              <span className="text-primary font-semibold cursor-pointer hover:underline">
                Resend OTP
              </span>
            </p>
          </form>
        </div>
      </div>
    </AuthWrappert>
  );
}

export default VerifyNumber;
