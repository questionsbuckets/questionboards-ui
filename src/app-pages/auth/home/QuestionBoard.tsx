"use client";

import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/common/Dropdown";

import {
  useGetAllgrades,
  useGetSubjectById,
} from "@/hooks/queries/useGetAllgrades";
import { useFormik } from "formik";
import { ArrowRight, Search } from "lucide-react";
import React from "react";

const QuestionBoard = () => {
  // const { data: grades, isLoading, isError, error } = useGetAllgrades();
  const formik = useFormik({
    initialValues: {
      grade: null,
      subject: null,
    },
    onSubmit: (values) => {
      console.log("Submitting student ➜", values);
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
  // const selectedGradeId = values.grade?._id;
  // const { data: subjectsData, isLoading: subjectsLoading } =
  //   useGetSubjectById(selectedGradeId);

  // let subjectOptions: { name: string }[] = subjectsData?.subjects
  //   ? subjectsData?.subjects?.map((subject: string) => ({
  //       name: subject,
  //     }))
  //   : [];

  const grades = [
    { _id: "68ef750a9ddbbbf949f27982", name: "Grade 1" },
    { _id: "68ef750a9ddbbbf949f27983", name: "Grade 2" },
    { _id: "68ef750a9ddbbbf949f27984", name: "Grade 3" },
    { _id: "68ef750a9ddbbbf949f27985", name: "Grade 4" },
    { _id: "68ef750a9ddbbbf949f27986", name: "Grade 5" },
    { _id: "68ef750a9ddbbbf949f27987", name: "Grade 6" },
    { _id: "68ef750a9ddbbbf949f27988", name: "Grade 7" },
    { _id: "68ef750a9ddbbbf949f27989", name: "Grade 8" },
  ];

  const subjects = [
    { _id: "subj001", name: "Beginning Arithmetic" },
    { _id: "subj002", name: "Algebra Basics" },
    { _id: "subj003", name: "Geometry Fundamentals" },
    { _id: "subj004", name: "Trigonometry" },
    { _id: "subj005", name: "Physics Principles" },
    { _id: "subj006", name: "Chemistry Basics" },
    { _id: "subj007", name: "Biology" },
    { _id: "subj008", name: "English Grammar" },
    { _id: "subj009", name: "Computer Science" },
  ];

  return (
    <div className="relative w-full min-h-[700px] flex flex-col items-center   bg-white overflow-hidden ">
      {/* Background Image */}
      <img
        src="/image/home/question-filter-bg.png"
        alt="Question Boards"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center  mt-16 sm:mt-20 text-center space-y-4 sm:space-y-8 px-4 w-full max-w-4xl">
        {/* Title */}
        <div className="flex gap-4">
          <span className=" text-4xl md:text-[80px] sm:text-5xl font-bold tracking-wide font-sans">
            Question
          </span>
          <span className="text-primary text-4xl md:text-[80px] sm:text-5xl font-bold tracking-wide font-sans">
            Boards
          </span>
        </div>
        <p className="font-bold text-2xl">What gets measured, gets improved!</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex border-0 sm:border-[10px] sm:border-primary/40 flex-col sm:flex-row gap-2 sm:gap-0 items-stretch justify-center rounded-md sm:rounded-md overflow-hidden shadow-lg"
        >
          <Dropdown
            options={grades || []}
            optionLabel="name"
            className="bg-white rounded-md h-10 sm:h-12 sm:rounded-none sm:rounded-l-md hover:bg-white "
            value={values.grade}
            onChange={(v) => setFieldValue("grade", v)}
            filter={true}
            placeholder="Search by Grade"
            error={touched.grade && errors.grade ? String(errors.grade) : ""}
          />
          <Dropdown
            options={subjects || []}
            optionLabel="name"
            className="bg-white rounded-md h-10 sm:h-12 sm:rounded-none hover:bg-white "
            value={values.subject}
            onChange={(v) => setFieldValue("subject", v)}
            filter={true}
            placeholder="Search by Subject"
            error={
              touched.subject && errors.subject ? String(errors.subject) : ""
            }
          />

          {/* Search Button */}
          <Button className="bg-black rounded-none rounded-r-md h-10  sm:h-12   hover:bg-black cursor-pointer ">
            <Search className="w-5 h-5 text-primary" /> Search
          </Button>
        </form>
        <p className="text-[#262727]  text-lg text-center">
          Question Boards is one of the most comprehensive databased of
          Questions, based on actual exams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto justify-center">
          <Button className="h-10 sm:h-12 w-full sm:w-56 text-base sm:text-lg font-semibold cursor-pointer">
            Start Free Trial
            <ArrowRight />
          </Button>

          <Button className="h-10 sm:h-12 w-full sm:w-56 text-base sm:text-lg font-semibold bg-white text-primary hover:bg-white hover:text-primary cursor-pointer">
            Get To Know Us
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-white"></div> */}
    </div>
  );
};

export default QuestionBoard;
