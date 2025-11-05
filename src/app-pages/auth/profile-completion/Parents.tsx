"use client";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/common/InputField";
import PhoneNumberInput from "@/components/ui/common/PhoneInput";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { Dropdown } from "@/components/ui/common/Dropdown";
import {
  cityOption,
  getCountryOptions,
  getStateOptions,
} from "@/utils/country";
import { ParentProfileFormValues } from "@/components/interfaces/auth/profile-completion/parents.interface";
import { DropdownOption } from "@/components/interfaces/common.interface";
import { parentProfileSchema } from "@/components/schemas/auth/ProfileCompletionSchema";
import { Loader2Icon, Upload, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useAddParentsAccount } from "@/hooks/mutations/useAddParentsAccount";
import { useRouter } from "next/navigation";
function ParentsProfile() {
  const { mutateAsync: addParentsAccount, isPending } = useAddParentsAccount();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const [stateOption, setStateOption] = useState<DropdownOption[]>([]);
  const formik = useFormik<ParentProfileFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryName: null,
      stateName: null,
      parentImage: null,
    },
    validationSchema: parentProfileSchema,
    onSubmit: async (values) => {

      const formdata = new FormData();
      formdata.append("firstName", values?.firstName);
      formdata.append("lastName", values?.lastName);
      formdata.append("email", values?.email);
      if (values?.parentImage) {
        formdata.append("parentImage", values?.parentImage);
      }
      if (values?.countryName) {
        formdata.append("country", values?.countryName?.code);
      }
      if (values?.stateName) {
        formdata.append("state", values?.stateName?.code);
      }

      try {
        const res = await addParentsAccount(formdata);
        toast.success(res.message || "Parents profile Added successfully!");
        router.push("/parent");
      } catch (error: any) {
        console.log("🚀 ~ ParentsProfile ~ error:", error);
        toast.error(error?.response?.data?.message || "Parents profile Added failed!");
      }
    },
  });
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ParentProfileFormValues
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFieldValue(field, file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Information
        </h2>

        {/* Upload Profile */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-15 h-15 sm:w-22 sm:h-22 rounded-full border overflow-hidden relative bg-gray-100">
            {previewUrl ? (
              <Image
                src={previewUrl}
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
              onChange={(e) => handleFileChange(e, "parentImage")}
            />
            <div className="flex items-center gap-2 px-3 py-2 w-fit bg-background rounded-full border">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Upload Profile</span>
            </div>
            <p className="text-sm text-gray-500 pt-1">
              Allowed JPG or PNG. Max size of 2MB
            </p>
          </label>
        </div>
        {touched.parentImage && errors.parentImage && (
          <p className="text-red-500 text-sm mb-3">{errors.parentImage}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
        <InputField
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Enter first name"
          required
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && errors.firstName ? errors.firstName : ""}
        />
        <InputField
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          required
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && errors.lastName ? errors.lastName : ""}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email ? errors.email : ""}
        />

        <Dropdown
          label="Country"
          required
          options={getCountryOptions()}
          optionLabel="name"
          value={values.countryName}
          placeholder="Select country"
          onChange={(selected) => {
            if (selected) {
              setStateOption(getStateOptions(selected.code));
              setFieldValue("countryName", selected);
            } else {
              setFieldValue("countryName", null);
              setFieldValue("stateName", null);
              setFieldValue("cityName", null);
              setStateOption([]);
            }
          }}
          filter={true}
          // error={touched.countryName ? errors.countryName : ""}
          error={
            touched.countryName && errors.countryName
              ? String(errors.countryName)
              : ""
          }
        />

        <Dropdown
          label="State"
          required
          disabled={!values?.countryName?.code}
          options={stateOption}
          optionLabel="name"
          value={values.stateName}
          placeholder="Select state"
          onChange={(selected) => {
            if (selected && values?.countryName) {
              setFieldValue("stateName", selected);
            } else {
              setFieldValue("stateName", null);
            }
          }}
          filter={true}
          error={
            touched.stateName && errors.stateName
              ? String(errors.stateName)
              : ""
          }
        />
      </div>
      <Button
        type="submit"
        className="rounded-lg cursor-pointer"
        disabled={isPending}
      >
        {isPending && <Loader2Icon className="animate-spin" />}
        Create Account
      </Button>
    </form>
  );
}

export default ParentsProfile;
