import * as Yup from "yup";
import { phoneNumberRules } from "@/utils/common";

// ------------------- parent -------------------

export const parentProfileSchema = Yup.object({
  parentImage: Yup.mixed()
    .required("Please upload a profile photo")
    .test("fileSize", "File size must be less than 2MB", (value) => {
      const file = value as File;
      return !file || file.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      const file = value as File;
      return (
        !file ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        )
      );
    }),
  firstName: Yup.string()
    .required("Please enter first name")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),

  lastName: Yup.string()
    .required("Please enter last name")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),

  email: Yup.string()
    .trim()
    .required("Please enter email")
    .email("Please enter a valid email address"),


  countryName: Yup.object({
    name: Yup.string().required("Please select a country"),
  })
    .nullable()
    .required("Please select a country"),

  stateName: Yup.object({
    name: Yup.string().required("Please select a state"),
  })
    .nullable()
    .required("Please select a state"),

});

// ------------------- student -------------------

export const studentProfileSchema = Yup.object({
  childrenImage: Yup.mixed()
  .required("Please upload a profile photo")
  .test("fileSize", "File size must be less than 2MB", (value) => {
    const file = value as File;
    return !file || file.size <= 2 * 1024 * 1024;
  })
  .test("fileType", "Only image files are allowed", (value) => {
    const file = value as File;
    return (
      !file ||
      ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      )
    );
  }),

  childrenName: Yup.object({
    name: Yup.string().required("Please select a Child Name"),
  })
    .nullable()
    .required("Please select a Child Name"),

  realtionship: Yup.object({
    name: Yup.string().required("Please select a Relationship"),
  })
    .nullable()
    .required("Please select a Relationship"),

  grade: Yup.object({
    name: Yup.string().required("Please select a Grade"),
  })
    .nullable()
    .required("Please select a Grade"),
});

// ------------------- tutor -------------------

export const tutorProfileSchema = Yup.object({
  profileImage: Yup.mixed()
    // .required("Please upload a profile photo")
    .nullable()
    .optional()
    .test("fileSize", "File size must be less than 2MB", (value) => {
      const file = value as File;
      return !file || file.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      const file = value as File;
      return (
        !file ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        )
      );
    }),
  aboutMe: Yup.string().trim().required("Please enter a short bio"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  // contactNumber: Yup.string()
  //   .required("Please enter contact number")
    
  //   .test("is-valid-length", "Enter a valid contact number", function (value) {
  //     const { phoneCountryCode } = this.parent;
  //     if (!value || !phoneCountryCode) return false;
  //     // Remove + if present
  //     const code = phoneCountryCode.replace("+", "");
  //     // Remove the leading country code from value
  //     const numberOnly = value.startsWith(code)
  //       ? value.slice(code.length)
  //       : value;
  //     // Remove any non-numeric chars
  //     const digitsOnly = numberOnly.replace(/\D/g, "");

  //     const expectedLength = phoneNumberRules[code];
  //     return expectedLength ? digitsOnly.length === expectedLength : true;
  //   }),
  country: Yup.object().nullable().required("Please select a country"),
  zipCode: Yup.string().required("Zip code is required"),
  qualification: Yup.string().required("Qualification is required"),
  yearsOfExperience: Yup.string().required("Please enter experience"),
  skillArea: Yup.string().required("Skill area is required"),
  grade: Yup.object().nullable().required("Please select grade"),
  subject: Yup.object().nullable().required("Please select subject"),
  hourlyRate: Yup.string().required("Please enter hourly rate"),
  setDay: Yup.array()
    .of(
      Yup.object({
        day: Yup.string().required(),
        fromTime: Yup.string().when("available", {
          is: true,
          then: (schema) => schema.required("Start time required"),
        }),
        toTime: Yup.string().when("available", {
          is: true,
          then: (schema) => schema.required("End time required"),
        }),
        available: Yup.boolean().required(),
      })
    )
    .min(1),

  documents: Yup.mixed().nullable().optional()
});

// ------------------- school -------------------
export const schoolProfileSchema = Yup.object({
  profileImage: Yup.mixed()
    .required("Please upload your profile photo")
    .test("fileSize", "File size must be under 2MB", (value) => {
      const file = value as File;
      return !file || file.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      const file = value as File;
      return (
        !file ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        )
      );
    }),

  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contactNumber: Yup.string()
    .required("Please enter your contact number")
    .test("is-valid-length", "Enter a valid contact number", function (value) {
      const { phoneCountryCode } = this.parent;
      if (!value || !phoneCountryCode) return false;
      const code = phoneCountryCode.replace("+", "");
      const digitsOnly = value.replace(/\D/g, "");
      const expectedLength = phoneNumberRules[code];
      return expectedLength ? digitsOnly.length === expectedLength : true;
    }),

  residentState: Yup.string().required("Please enter your resident state"),

  schoolLogo: Yup.mixed()
    .required("Please upload your school logo")
    .test("fileSize", "File size must be under 2MB", (value) => {
      const file = value as File;
      return !file || file.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      const file = value as File;
      return (
        !file ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        )
      );
    }),

  schoolName: Yup.string().required("School name is required"),
  schoolISD: Yup.string().required("School ISD is required"),
  addressLine1: Yup.string().required("Address line 1 is required"),
  addressLine2: Yup.string().required("Address line 2 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.object().nullable().required("Country is required"),

  schoolEmail: Yup.string()
    .email("Invalid school email")
    .required("School email is required"),
  schoolContact: Yup.string().required("School contact is required"),
  documents: Yup.mixed().nullable().required("Please upload document"),

  adminFirstName: Yup.string().required("First name is required"),
  adminLastName: Yup.string().required("Last name is required"),
  adminEmail: Yup.string()
    .email("Invalid admin email")
    .required("Email is required"),
  adminPosition: Yup.string().required("Position is required"),
  adminContact: Yup.string().required("Contact number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),

  board: Yup.object().nullable().required("Please select board"),
  subjects: Yup.array()
    .of(Yup.object())
    .min(1, "Please select at least one subject"),
  comments: Yup.string().trim(),
});
