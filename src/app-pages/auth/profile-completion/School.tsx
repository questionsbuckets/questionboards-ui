"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/common/InputField";
import { TextareaField } from "@/components/ui/common/TextareaField";
import { Dropdown } from "@/components/ui/common/Dropdown";
import PhoneNumberInput from "@/components/ui/common/PhoneInput";
import { Upload, UserRound, X } from "lucide-react";

import {
  cityOption,
  getCountryOptions,
  getStateOptions,
} from "@/utils/country";
import { ISchoolProfile } from "@/components/interfaces/auth/profile-completion/school.interface";
import { schoolProfileSchema } from "@/components/schemas/auth/ProfileCompletionSchema";
import { DropdownOption } from "@/components/interfaces/common.interface";

function SchoolProfile() {
  const [stateOption, setStateOption] = useState<DropdownOption[]>([]);
  const [citiesOption, setCitiesOption] = useState<DropdownOption[]>([]);
  const formik = useFormik<ISchoolProfile>({
    initialValues: {
      profileImage: null,
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      phoneCountryCode: "",
      position: null,
      residentState: "",

      schoolLogo: null,
      schoolName: "",
      schoolISD: "",
      addressLine1: "",
      addressLine2: "",

      country: null,
      state: null,
      city: null,

      postalCode: "",
      schoolEmail: "",
      schoolContact: "",
      schoolPhoneCountryCode: "",
      documents: null,

      adminFirstName: "",
      adminLastName: "",
      adminEmail: "",
      adminPosition: "",
      adminContact: "",
      adminPhoneCountryCode: "",
      password: "",
      confirmPassword: "",

      board: null,
      subjects: [],
      comments: "",
    },
    validationSchema: schoolProfileSchema,
    onSubmit: (values) => {
      console.log("School Profile Submitted:", values);
      toast.success("School profile submitted successfully!");
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formik;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ISchoolProfile
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFieldValue(field, file);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Your Information
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-15 h-15 sm:w-20 sm:h-20 rounded-full border overflow-hidden relative bg-gray-100">
          {values.profileImage ? (
            <Image
              src={URL.createObjectURL(values.profileImage)}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <UserRound className="w-8 h-8" />
            </div>
          )}
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "profileImage")}
          />
          <div className="flex items-center gap-2 px-3 py-2 w-fit bg-background rounded-full border">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Upload Photo</span>
          </div>
          <p className="text-sm text-gray-500 pt-1">
            Allowed JPG or PNG. Max size of 2MB
          </p>
        </label>
      </div>
      {touched.profileImage && errors.profileImage && (
        <p className="text-red-500 text-sm mb-3">{errors.profileImage}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <InputField
          required
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName ? errors.firstName : ""}
        />
        <InputField
          required
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName ? errors.lastName : ""}
        />
        <InputField
          required
          id="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : ""}
        />

        <PhoneNumberInput
          label="Country Number"
          value={values.contactNumber}
          placeholder="Enter phone number"
          required
          error={touched.contactNumber ? errors.contactNumber : ""}
          onChange={(phone, code) => {
            setFieldValue("contactNumber", phone);
            setFieldValue("phoneCountryCode", code);
          }}
        />
      </div>
      <div className="my-4">
        <Dropdown
          label="Position"
          options={[
            { name: "Principal", code: "Principal" },
            { name: "Vice Principal", code: "Vice Principal" },
            { name: "Head of Department", code: "Head of Department" },
            { name: "Teacher", code: "Teacher" },
            { name: "Assistant Teacher", code: "Assistant Teacher" },
            { name: "Class Coordinator", code: "Class Coordinator" },
          ]}
          optionLabel="name"
          value={values.position}
          onChange={(v) => setFieldValue("position", v)}
          filter={false}
          placeholder="Choose position"
          error={
            touched.position && errors.position ? String(errors.position) : ""
          }
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Your School Information
      </h2>

      {/* Upload Photo */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-15 h-15 sm:w-20 sm:h-20 rounded-full border overflow-hidden relative bg-gray-100">
          {values.schoolLogo ? (
            <Image
              src={URL.createObjectURL(values.schoolLogo)}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <UserRound className="w-8 h-8" />
            </div>
          )}
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "schoolLogo")}
          />
          <div className="flex items-center gap-2 px-3 py-2 w-fit bg-background rounded-full border">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Upload Photo</span>
          </div>
          <p className="text-sm text-gray-500 pt-1">
            Allowed JPG or PNG. Max size of 2MB
          </p>
        </label>
      </div>
      {touched.schoolLogo && errors.schoolLogo && (
        <p className="text-red-500 text-sm mb-3">{errors.schoolLogo}</p>
      )}

      {/* School Fields */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        <InputField
          required
          id="schoolName"
          label="School Name"
          placeholder="Enter school name"
          value={values.schoolName}
          onChange={handleChange}
        />
        <InputField
          required
          id="schoolISD"
          label="School ISD"
          placeholder="Enter school ISD"
          value={values.schoolISD}
          onChange={handleChange}
        />
        <InputField
          required
          id="addressLine1"
          label="Address"
          placeholder="Enter address line 1"
          value={values.addressLine1}
          onChange={handleChange}
        />
        <InputField
          required
          id="addressLine2"
          // label="Address"
          placeholder="Enter address line 2"
          value={values.addressLine2}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <Dropdown
          label="Country"
          required
          options={getCountryOptions()}
          optionLabel="name"
          value={values.country}
          placeholder="Select country"
          onChange={(selected) => {
            if (selected) {
              setStateOption(getStateOptions(selected.code));
              setFieldValue("country", selected);
            } else {
              setFieldValue("country", null);
              setFieldValue("stateName", null);
              setFieldValue("cityName", null);
              setStateOption([]);
            }
          }}
          filter={true}
          // error={touched.country ? errors.country : ""}
          error={
            touched.country && errors.country ? String(errors.country) : ""
          }
        />

        <Dropdown
          label="State"
          required
          disabled={!values?.country?.code}
          options={stateOption}
          optionLabel="name"
          value={values.state}
          placeholder="Select state"
          onChange={(selected) => {
            if (selected && values?.country) {
              setCitiesOption(cityOption(values.country.code, selected.code));
              setFieldValue("state", selected);
            } else {
              setFieldValue("state", null);
              setFieldValue("cityName", null);
              setCitiesOption([]);
            }
          }}
          filter={true}
          error={touched.state && errors.state ? String(errors.state) : ""}
        />

        <Dropdown
          label="City"
          required
          disabled={!values?.state?.code}
          options={citiesOption}
          optionLabel="name"
          value={values.city}
          placeholder="Select city"
          onChange={(selected) => {
            if (selected) {
              setFieldValue("city", selected);
            } else {
              setFieldValue("city", null);
            }
          }}
          filter={true}
          error={touched.city && errors.city ? String(errors.city) : ""}
        />
        <InputField
          required
          id="postalCode"
          placeholder="Enter postal code"
          label="Postal Code"
          value={values.postalCode}
          onChange={handleChange}
        />

        <InputField
          required
          id="schoolEmail"
          placeholder="Enter school email"
          label="School Email"
          value={values.schoolEmail}
          onChange={handleChange}
        />
        <PhoneNumberInput
          label="School Contact"
          required
          value={values.schoolContact}
          placeholder="Enter school contact number"
          error={touched.schoolContact ? errors.schoolContact : ""}
          onChange={(phone, code) => {
            setFieldValue("schoolContact", phone);
            setFieldValue("schoolPhoneCountryCode", code);
          }}
        />
      </div>

      {/* Documents */}
      <div className="mt-4">
        <label className="block text-gray-900 font-semibold mb-2">
          Upload Documents *
        </label>
        <label className="cursor-pointer   text-md flex items-center justify-center border rounded-lg py-2 bg-background hover:bg-background/80">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.png"
            onChange={(e) => handleFileChange(e, "documents")}
          />
          <Upload className="w-4 h-4 mx-2" />
          <span className="truncate mx-3">
            {values.documents ? values.documents.name : "Upload File"}
          </span>
        </label>
        {/* Preview */}
        {values.documents && (
          <div className="mt-2 flex items-center w-full border rounded-lg bg-gray-50 px-3 py-2 relative">
            {/* Left: Thumbnail / Icon */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
              {values.documents.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(values.documents)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="w-6 h-6 text-gray-500" />
              )}
            </div>

            {/* Middle: File Name */}
            <span className="flex-1 mx-3 text-gray-700 truncate">
              {values.documents.name}
            </span>

            {/* Right: Cancel Button */}

            <Button
              variant="ghost"
              type="button"
              onClick={() => setFieldValue("documents", null)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        {touched.documents && errors.documents && (
          <p className="text-red-500 text-sm mt-1">{errors.documents}</p>
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-6">
        Contact Person (Admin)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <InputField
          required
          id="adminFirstName"
          label="First Name"
          placeholder="Enter first name"
          value={values.adminFirstName}
          onChange={handleChange}
        />
        <InputField
          required
          id="adminLastName"
          label="Last Name"
          placeholder="Enter last name"
          value={values.adminLastName}
          onChange={handleChange}
        />
        <InputField
          required
          id="adminEmail"
          label="Email"
          type="email"
          placeholder="Enter email"
          value={values.adminEmail}
          onChange={handleChange}
        />
        <InputField
          required
          id="adminPosition"
          label="Position"
          placeholder="Enter position"
          value={values.adminPosition}
          onChange={handleChange}
        />
        <PhoneNumberInput
          label="Contact"
          required
          value={values.adminContact}
          placeholder="Enter contact number"
          onChange={(phone, code) => {
            setFieldValue("adminContact", phone);
            setFieldValue("adminPhoneCountryCode", code);
          }}
        />
        <InputField
          required
          id="password"
          label="Password"
          placeholder="Enter password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <InputField
          required
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-6">
        Question Boards & Subjects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <InputField
          required
          id="adminFirstName"
          label="User Name"
          placeholder="Enter first name"
          value={values.adminFirstName}
          onChange={handleChange}
        />

        <InputField
          required
          id="adminEmail"
          label="Email"
          type="email"
          placeholder="Enter email"
          value={values.adminEmail}
          onChange={handleChange}
        />
        <InputField
          required
          id="adminEmail"
          label="Admin Email"
          type="email"
          placeholder="Enter email"
          value={values.adminEmail}
          onChange={handleChange}
        />

        <Dropdown
          label="Subject"
          options={[
            { name: "English", code: "English" },
            { name: "Math", code: "Math" },
            { name: "Science", code: "Science" },
            { name: "History", code: "History" },
            { name: "Geography", code: "Geography" },
            { name: "Art", code: "Art" },
            { name: "Music", code: "Music" },
            { name: "Physical Education", code: "Physical Education" },
          ]}
          value={values.board}
          onChange={(val) => setFieldValue("board", val)}
          placeholder="Select Subject"
        />
      </div>
      <div className=" mt-4">
        <TextareaField
          id="comments"
          label="Comments"
          className="col-span-2"
          placeholder="Enter comments"
          value={values.comments}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full mt-8">
        Publish
      </Button>
    </form>
  );
}

export default SchoolProfile;
