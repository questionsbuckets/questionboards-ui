"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/common/InputField";
import { Dropdown } from "@/components/ui/common/Dropdown";
import { Loader2Icon, Upload, User, UserRound, X } from "lucide-react";
import { toast } from "sonner";

import { getCountryOptions } from "@/utils/country";
import { TextareaField } from "@/components/ui/common/TextareaField";
import { ITutorProfile } from "@/components/interfaces/auth/profile-completion/tutor.interface";
import { tutorProfileSchema } from "@/components/schemas/auth/ProfileCompletionSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { TimePicker } from "@/components/ui/common/TimePicker";
import PhoneNumberInput from "@/components/ui/common/PhoneInput";
import { MultiSelect } from "@/components/ui/common/MultiSelect";
import {
  useGetAllgrades,
  useGetSubjectById,
} from "@/hooks/queries/useGetAllgrades";
import { useAuth } from "@/hooks/custom/useAuth";
import { normalizePhoneNumber } from "@/utils/phoneNumber";
import { useAddTutorAccount } from "@/hooks/mutations/useAddTutorAccount";
import { useRouter } from "next/navigation";

function TutorProfile() {
  const { data: grades, isLoading, isError, error } = useGetAllgrades();
  const { mutateAsync: addTutorAccount, isPending } = useAddTutorAccount();
  const { user } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const formik = useFormik<ITutorProfile>({
    initialValues: {
      profileImage: null,
      aboutMe: "",
      firstName: "",
      lastName: "",
      email: "",
      // contactNumber: "",
      // phoneCountryCode: "",
      country: null,
      zipCode: "",
      qualification: "",
      yearsOfExperience: "",
      skillArea: "",
      grade: null,
      subject: null,
      hourlyRate: "",
      setDay: [
        { day: "Monday", fromTime: "", toTime: "", available: false },
        { day: "Tuesday", fromTime: "", toTime: "", available: false },
        { day: "Wednesday", fromTime: "", toTime: "", available: false },
        { day: "Thursday", fromTime: "", toTime: "", available: false },
        { day: "Friday", fromTime: "", toTime: "", available: false },
        { day: "Saturday", fromTime: "", toTime: "", available: false },
        { day: "Sunday", fromTime: "", toTime: "", available: false },
      ],

      documents: null,
    },
    validationSchema: tutorProfileSchema,
    onSubmit: async (values) => {
      // console.log("Tutor Profile:", values);
      // const { phoneCountryCode, contactNumber, ...rest } = values;
      // const code = phoneCountryCode.replace("+", "");
      // const purePhoneNumber = contactNumber.startsWith(code)
      //   ? contactNumber.slice(code.length)
      //   : contactNumber;

      const formdata = new FormData();

      formdata.append("aboutMe", values?.aboutMe);
      formdata.append("firstName", values?.firstName);
      formdata.append("lastName", values?.lastName);
      formdata.append("email", values?.email);
      // formdata.append("contactNumber", purePhoneNumber);
      // formdata.append("phoneCountryCode", phoneCountryCode);
      formdata.append("country", values?.country?.code);
      formdata.append("zipcode", values?.zipCode);
      formdata.append("qualification", values?.qualification);
      formdata.append("yearsOfExpirince", values?.yearsOfExperience);
      formdata.append("skillArea", values?.skillArea);
      formdata.append("grade", values?.grade?._id);
      formdata.append("subject", values?.subject.name);
      formdata.append("hourlyRate", values?.hourlyRate);
      values.setDay.forEach((day, index) => {
        formdata.append(`setDay[${index}][day]`, day.day);
        formdata.append(`setDay[${index}][fromTime]`, day.fromTime);
        formdata.append(`setDay[${index}][toTime]`, day.toTime);
        formdata.append(
          `setDay[${index}][available]`,
          day.available.toString()
        );
      });

      if (values?.profileImage) {
        formdata.append("tutorImage", values?.profileImage);
      }
      if (values?.documents) {
        formdata.append("uploadDocuments", values?.documents);
      }

      try {
        const res = await addTutorAccount(formdata);
        if (res?.status) {
          toast.success(res?.message || "Tutor profile Added successfully!");
          router.push("/parent");
        }
      } catch (error: any) {
        console.log("🚀 ~ TutorProfile ~ error:", error);
        toast.error(error?.response?.data?.message || "Signup failed!");
      }
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

  const selectedGradeId = values.grade?._id;
  const { data: subjectsData, isLoading: subjectsLoading } =
    useGetSubjectById(selectedGradeId);

  let subjectOptions: { name: string }[] = subjectsData?.subjects
    ? subjectsData?.subjects?.map((subject: string) => ({
        name: subject,
      }))
    : [];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ITutorProfile
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFieldValue(field, file);

    if (field === "profileImage") {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // useEffect(() => {
  //   if (user?.phoneNumber) {
  //     let number = normalizePhoneNumber(user.phoneNumber);
  //     console.log("🚀 ~ TutorProfile ~ number:", number);
  //     if (number) {
  //       // setFieldValue("contactNumber", number.mobileNumber);
  //       setFieldValue(
  //         "contactNumber",
  //         number.fullPhoneNumber.replace(/\s/g, "")
  //       );
  //       // setFieldValue("phoneCountryCode", number.countryCode);
  //     }
  //   }
  // }, [user]);

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col ">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Become a Tutor
      </h2>

      {/* Upload Profile */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-15 h-15 sm:w-20 sm:h-20 rounded-full border overflow-hidden relative bg-gray-100">
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
            onChange={(e) => handleFileChange(e, "profileImage")}
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
      {touched.profileImage && errors.profileImage && (
        <p className="text-red-500 text-sm mb-3">{errors.profileImage}</p>
      )}

      {/* About Me */}
      <TextareaField
        id="aboutMe"
        label="About Me"
        required
        placeholder="Add some details about you..."
        className="min-h-[80px]"
        value={values.aboutMe}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.aboutMe ? errors.aboutMe : ""}
      />

      {/* Personal Info */}
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

        {/* <PhoneNumberInput
          label="Contact Number"
          value={values.contactNumber}
          placeholder="Enter phone number"
          disabled={true}
          error={touched.contactNumber ? errors.contactNumber : ""}
          onChange={(phone, code) => {
            setFieldValue("contactNumber", phone);
            setFieldValue("phoneCountryCode", code);
          }}
        /> */}
        <Dropdown
          required
          label="Country"
          options={getCountryOptions()}
          value={values.country}
          optionLabel="name"
          onChange={(val) => setFieldValue("country", val)}
          placeholder="Choose Country"
          error={
            touched.country && errors.country ? String(errors.country) : ""
          }
        />
        <InputField
          required
          id="zipCode"
          label="Zip Code"
          placeholder="Enter zip code"
          type="text"
          value={values.zipCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.zipCode ? errors.zipCode : ""}
        />
      </div>

      {/* Education */}
      <h3 className="mt-8 mb-2 font-semibold text-gray-900">Your Education</h3>

      <InputField
        required
        id="qualification"
        label="Qualification"
        type="text"
        className=" mb-4"
        placeholder="Enter qualification"
        value={values.qualification}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.qualification ? errors.qualification : ""}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          required
          id="yearsOfExperience"
          label="Years of Experience"
          type="number"
          placeholder="Enter years of experience"
          value={values.yearsOfExperience}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.yearsOfExperience ? errors.yearsOfExperience : ""}
        />
        <InputField
          required
          id="skillArea"
          label="Skill Area"
          type="text"
          placeholder="Enter skill area"
          value={values.skillArea}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.skillArea ? errors.skillArea : ""}
        />
        <Dropdown
          required
          label="Grade"
          options={grades?.data || []}
          optionLabel="name"
          value={values.grade}
          onChange={(v) => setFieldValue("grade", v)}
          filter={false}
          placeholder="Choose Grade"
          error={touched.grade && errors.grade ? String(errors.grade) : ""}
        />
        <Dropdown
          required
          label="Subjects"
          options={subjectOptions || []}
          optionLabel="name"
          disabled={!values.grade}
          value={values.subject}
          onChange={(v) => setFieldValue("subject", v)}
          filter={false}
          placeholder="Choose Subject"
          error={
            touched.subject && errors.subject ? String(errors.subject) : ""
          }
        />
        {/* <MultiSelect
          className="bg-background hover:bg-background"
          // hideSelectAll={true}
          options={[
            { label: "Pre-K", value: "Pre-K" },
            { label: "Kindergarden", value: "Kindergarden" },
            { label: "Grade 1", value: "Grade 1" },
            { label: "Grade 2", value: "Grade 2" },
            { label: "Grade 3", value: "Grade 3" },
            { label: "Grade 4", value: "Grade 4" },
            { label: "Grade 5", value: "Grade 5" },
            { label: "Grade 6", value: "Grade 6" },
            { label: "Grade 7", value: "Grade 7" },
            { label: "Grade 8", value: "Grade 8" },
            { label: "Grade 9", value: "Grade 9" },
            { label: "Grade 10", value: "Grade 10" },
            { label: "Grade 11", value: "Grade 11" },
            { label: "Grade 12", value: "Grade 12" },
          ]}
          value={values.grade}
          onValueChange={(v) => setFieldValue("grade", v)}
          placeholder="Choose frameworks..."
        /> */}
      </div>

      {/* Profile Setup */}
      <h3 className="mt-8 mb-2 font-semibold text-gray-900">
        Set Up Your Profile
      </h3>
      <InputField
        required
        id="hourlyRate"
        label="Hourly Rate"
        type="number"
        placeholder="Enter hourly rate"
        value={values.hourlyRate}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.hourlyRate ? errors.hourlyRate : ""}
      />

      {/* Schedule */}

      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-gray-900">
          Set Schedule <span className="text-primary">*</span>
        </h3>
        <div className="space-y-2">
          {values.setDay.map((slot, idx) => {
            const dayErrors = errors.setDay?.[idx];
            const dayTouched = touched.setDay?.[idx];

            return (
              <div
                key={idx}
                className={`grid grid-cols-1 sm:grid-cols-3 gap-2 items-center p-2 rounded-md `}
              >
                <div className="flex items-center gap-2 bg-background py-2 px-3  rounded-md">
                  <Checkbox
                    className="bg-white"
                    id={`setDay.${idx}.available`}
                    checked={slot.available}
                    onCheckedChange={(checked: boolean) =>
                      setFieldValue(`setDay.${idx}.available`, checked)
                    }
                  />
                  <label
                    htmlFor={`setDay.${idx}.available`}
                    className="font-medium text-gray-700"
                  >
                    {slot.day}
                  </label>
                </div>
                <div>
                  <TimePicker
                    value={slot.fromTime}
                    disabled={!slot.available}
                    placeholder="From"
                    onChange={(val) =>
                      setFieldValue(`setDay.${idx}.fromTime`, val)
                    }
                    error={
                      typeof dayErrors === "object" &&
                      dayTouched?.fromTime &&
                      dayErrors.fromTime
                        ? dayErrors.fromTime
                        : ""
                    }
                  />
                </div>

                <TimePicker
                  value={slot.toTime}
                  disabled={!slot.available}
                  placeholder="To"
                  onChange={(val) => setFieldValue(`setDay.${idx}.toTime`, val)}
                  error={
                    typeof dayErrors === "object" &&
                    dayTouched?.toTime &&
                    dayErrors.toTime
                      ? dayErrors.toTime
                      : ""
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Documents */}
      <div className="mt-8">
        <label className="block    text-gray-900 font-semibold mb-2">
          Upload Documents <span className="text-primary">*</span>
        </label>
        <label className="cursor-pointer   text-md flex items-center justify-center border-2 border-dashed border-primary rounded-lg py-2 bg-background hover:bg-background/80">
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

      {/* Submit */}
      <Button
        type="submit"
        className="w-full mt-8 cursor-pointer rounded-lg"
        disabled={isPending}
      >
        {isPending && <Loader2Icon className="animate-spin" />}
        Publish
      </Button>
    </form>
  );
}

export default TutorProfile;
