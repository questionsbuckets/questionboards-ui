import SubjectInfoCard from "@/components/home/SubjectInfoCard";
import { Button } from "@/components/ui/button";
import { FeatureItem } from "@/components/ui/common/FeatureItem";
import { ArrowRight } from "lucide-react";
import React from "react";

function SubjectBoardsSection() {
  const skills = [
    { title: "Mathematics", image: "/image/home/sub-math.png" },
    { title: "Science", image: "/image/home/sub-science.png" },
    { title: "Social", image: "/image/home/sub-social.png" },
    { title: "English", image: "/image/home/sub-english.png" },
  ];
  return (
    <div className="relative w-full min-h-[1100px] flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Background Image */}
      <img
        src="/image/home/subject-boards-bg.png"
        alt="Subject Boards Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Foreground Content */}
      <section className="relative z-10 py-16 mx-auto max-w-[1440px] px-4 ">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="max-w-[584px] mx-auto space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4  w-auto">
              {skills.map((skill) => (
                <SubjectInfoCard
                  key={skill.title}
                  title={skill.title}
                  image={skill.image}
                />
              ))}
            </div>

            <div className="flex  items-center justify-center w-full">
              <Button className="h-10 sm:h-12 w-full sm:w-auto text-base !px-6 sm:text-lg font-semibold cursor-pointer">
                View All Skills
                <ArrowRight />
              </Button>
            </div>
          </div>

          <div className="space-y-6 ">
            <div className="space-y-4">
              <div className="flex flex-wrap  items-center gap-3 sm:gap-4  text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-foreground font-sans">
                View Question Boards
                </h2>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-primary font-sans">
                by Subject.
                </h2>
              </div>
              
              <p className="text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
              </p>
            </div>

            <div className="space-y-4">
              <FeatureItem
                text="Choose from multiple boards to match your curriculum."
                delay={0}
                bg="bg-white"
              />
              <FeatureItem
                text="Access study materials tailored for your syllabus."
                delay={1}
                bg="bg-white"
              />
              <FeatureItem
                text="Track progress across different subjects and boards."
                delay={2}
                bg="bg-white"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SubjectBoardsSection;
