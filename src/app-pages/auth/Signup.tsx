"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/common/InputField";
import Image from "next/image";
import React from "react";
import { useFormik } from "formik";
import GoogleIcon from "../../../public/icons/GoogleIcon";
import Link from "next/link";
import PhoneNumberInput from "@/components/ui/common/PhoneInput";
import { useAppDispatch } from "@/store/store";
import { QuoteCarousel } from "@/components/auth/QuoteCarousel";
import AuthWrappert from "@/components/auth/AuthWrappert";
import { ISignup } from "@/components/interfaces/auth/auth.interface";
import { SignupSchema } from "@/components/schemas/auth/AuthSchema";
import { useSignup } from "@/hooks/mutations/useSignup";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookie";

function SignupPage() {
  const { mutateAsync: signup, isPending } = useSignup();
  const router = useRouter();
  const formik = useFormik<ISignup>({
    initialValues: {
      phoneNumber: "",
      phoneCountryCode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const { phoneCountryCode, phoneNumber, ...rest } = values;
      const code = phoneCountryCode.replace("+", "");
      const purePhoneNumber = phoneNumber.startsWith(code)
        ? phoneNumber.slice(code.length)
        : phoneNumber;

      let payload = {
        phoneNumber: `${phoneCountryCode}${purePhoneNumber}`,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      setCookie("phoneNumber", payload.phoneNumber , { expires: 1 });
      try {
        await signup(payload);
        toast.success("Signup successful!", {
          description: "Please check your number to verify your account",
        });
        router.push("/auth/verify-number");
      } catch (error: any) {
        console.log("🚀 ~ SignupPage ~ error:", error);
        toast.error(error?.response?.data?.message || "Signup failed!");
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
            Welcome Back!
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              login
            </Link>
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

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter Password"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : ""}
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
              Login
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

            <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
              <span className="border-b w-full "></span>
              <span>or</span>
              <span className="border-b w-full "></span>
            </div>

            <button
              type="button"
              className="flex items-center cursor-pointer justify-center border border-bacjkground rounded-full py-2 hover:bg-gray-50 transition"
            >
              <GoogleIcon />
              <span className="ml-2 text-lg font-semibold">
                Continue with Google
              </span>
            </button>
          </form>
        </div>

        {/* Right Section (Image + Quote) */}
        <div className="hidden md:flex w-1/2 bg-gray-100 relative items-center justify-center">
          <Image
            src="/image/auth-signup.png"
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

export default SignupPage;
