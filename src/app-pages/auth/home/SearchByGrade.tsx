"use client";

import GradeSubjectCard from "@/components/home/GradeSubjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const gradeData = [
  {
    grade: "Pre-K",
    color: "#10A0B6",
    lightColor: "#DBF1F4",
    description:
      "Fun foundational activities for early learners. Build curiosity through play and exploration.",
    skills: [
      { name: "Math", count: 170 },
      { name: "Language arts", count: 119 },
      { name: "Science", count: 119 },
      { name: "Colors & Shapes", count: 98 },
    ],
  },
  {
    grade: "Kindergarten",
    color: "#0FA37F", // teal tone
    lightColor: "#D8F5EE",
    description:
      "Interactive worksheets for reading, counting, and simple problem-solving skills.",
    skills: [
      { name: "Math", count: 150 },
      { name: "Language arts", count: 130 },
      { name: "Science", count: 90 },
      { name: "Art", count: 80 },
    ],
  },
  {
    grade: "Grade 1",
    color: "#E5A300", // warm yellow tone
    lightColor: "#FFF6D5",
    description:
      "Strengthen reading, writing, and early math concepts through creative exercises.",
    skills: [
      { name: "Math", count: 170 },
      { name: "Language arts", count: 140 },
      { name: "Science", count: 120 },
      { name: "Social Studies", count: 100 },
    ],
  },
  {
    grade: "Grade 2",
    color: "#0FA37F",
    lightColor: "#D8F5EE",
    description:
      "Develop problem-solving and comprehension skills with engaging topics and activities.",
    skills: [
      { name: "Math", count: 180 },
      { name: "Language arts", count: 150 },
      { name: "Science", count: 130 },
      { name: "Social Studies", count: 110 },
    ],
  },
  {
    grade: "Grade 3",
    color: "#E5A300",
    lightColor: "#FFF6D5",
    description:
      "Advance reading fluency, multiplication, and discovery of scientific concepts.",
    skills: [
      { name: "Math", count: 190 },
      { name: "Reading", count: 160 },
      { name: "Science", count: 140 },
      { name: "Geography", count: 120 },
    ],
  },
  {
    grade: "Grade 4",
    color: "#A6C80C",
    lightColor: "#F3F9D8",
    description:
      "Enhance analytical thinking with fractions, grammar, and environmental science topics.",
    skills: [
      { name: "Math", count: 200 },
      { name: "Language arts", count: 150 },
      { name: "Science", count: 160 },
      { name: "History", count: 130 },
    ],
  },
  {
    grade: "Grade 5",
    color: "#16A34A",
    lightColor: "#DCFCE7",
    description:
      "Practice advanced problem-solving, essay writing, and critical thinking skills.",
    skills: [
      { name: "Math", count: 210 },
      { name: "Language arts", count: 180 },
      { name: "Science", count: 170 },
      { name: "Civics", count: 120 },
    ],
  },
  {
    grade: "Grade 6",
    color: "#0EA5E9",
    lightColor: "#E0F2FE",
    description:
      "Bridge elementary to middle school with advanced math and structured writing tasks.",
    skills: [
      { name: "Math", count: 230 },
      { name: "Reading", count: 190 },
      { name: "Science", count: 180 },
      { name: "Geography", count: 140 },
    ],
  },
  {
    grade: "Grade 7",
    color: "#6366F1",
    lightColor: "#E0E7FF",
    description:
      "Build mastery in ratios, exponents, grammar, and life sciences through detailed lessons.",
    skills: [
      { name: "Math", count: 240 },
      { name: "Language arts", count: 200 },
      { name: "Science", count: 190 },
      { name: "History", count: 150 },
    ],
  },
  {
    grade: "Grade 8",
    color: "#9333EA",
    lightColor: "#F3E8FF",
    description:
      "Prepare for high school with algebra, essay writing, and research-based science topics.",
    skills: [
      { name: "Math", count: 250 },
      { name: "Language arts", count: 210 },
      { name: "Science", count: 200 },
      { name: "Civics", count: 160 },
    ],
  },
  {
    grade: "Grade 9",
    color: "#EC4899",
    lightColor: "#FCE7F3",
    description:
      "High school foundational courses: algebra, literature, and biology essentials.",
    skills: [
      { name: "Algebra", count: 260 },
      { name: "English", count: 220 },
      { name: "Biology", count: 200 },
      { name: "History", count: 180 },
    ],
  },
  {
    grade: "Grade 10",
    color: "#F43F5E",
    lightColor: "#FFE4E6",
    description:
      "Deepen conceptual learning in geometry, chemistry, and world literature.",
    skills: [
      { name: "Geometry", count: 270 },
      { name: "Chemistry", count: 210 },
      { name: "English", count: 230 },
      { name: "Geography", count: 170 },
    ],
  },
  {
    grade: "Grade 11",
    color: "#8B5CF6",
    lightColor: "#EDE9FE",
    description:
      "Get college-ready with calculus, physics, and advanced writing exercises.",
    skills: [
      { name: "Calculus", count: 280 },
      { name: "Physics", count: 250 },
      { name: "English", count: 240 },
      { name: "Economics", count: 190 },
    ],
  },
  {
    grade: "Grade 12",
    color: "#3B82F6",
    lightColor: "#DBEAFE",
    description:
      "Final preparation for graduation and higher education. Master core academic disciplines.",
    skills: [
      { name: "Mathematics", count: 290 },
      { name: "Physics", count: 260 },
      { name: "Chemistry", count: 240 },
      { name: "English Literature", count: 210 },
    ],
  },
];

const SearchByGrade = () => {
  return (
    <div className="w-full bg-white">
      <section className=" py-16  flex flex-col items-center mx-auto max-w-[1440px] px-4">
        {/* Title */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-10 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-foreground font-sans">
            Search
          </h2>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-primary font-sans">
            by Grade
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
          {gradeData.map((grade, index) => (
            <GradeSubjectCard
              key={index}
              grade={grade.grade}
              color={grade.color}
              lightColor={grade.lightColor}
              description={grade.description}
              skills={grade.skills}
            />
          ))}
        </div>

       
        {/* <div className="flex justify-center mt-10 w-full">
          <Button className="h-10 sm:h-12 w-full sm:w-auto text-base !px-6 sm:text-lg font-semibold cursor-pointer">
            View all Grades
            <ArrowRight className="ml-2" />
          </Button>
        </div> */}
      </section>
    </div>
  );
};

export default SearchByGrade;
