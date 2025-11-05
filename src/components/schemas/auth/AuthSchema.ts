import * as Yup from "yup";
import { phoneNumberRules } from "@/utils/common";



// ------------- Login -----------------
export const LoginSchema = Yup.object({
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
  password: Yup.string()
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
});






// ------------- Signup -----------------
export const SignupSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Please enter phone number")
    .test("is-valid-length", "Enter a valid phone number", function (value) {
      const { phoneCountryCode } = this.parent;
      if (!value || !phoneCountryCode) return false;
      const code = phoneCountryCode.replace("+", "");
      const numberOnly = value.startsWith(code)
        ? value.slice(code.length)
        : value;
      const digitsOnly = numberOnly.replace(/\D/g, "");

      const expectedLength = phoneNumberRules[code];
      return expectedLength ? digitsOnly.length === expectedLength : true;
    }),
  password: Yup.string()
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
    .oneOf([Yup.ref("password")], "Passwords must match"),
});