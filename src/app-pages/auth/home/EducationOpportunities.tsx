import SubjectInfoCard from "@/components/home/SubjectInfoCard";
import { Button } from "@/components/ui/button";
import { FeatureItem } from "@/components/ui/common/FeatureItem";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function EducationOpportunities() {
  const skills = [
    { title: "Mathematics", image: "/image/home/book.png" },
    { title: "Science", image: "/image/home/book.png" },
    { title: "Social", image: "/image/home/book.png" },
    { title: "English", image: "/image/home/book.png" },
  ];

  return (
    <div className="w-full bg-white">
      <section className=" py-16  mx-auto max-w-[1440px] px-4 space-y-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 ">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ">
                Become <span className="text-primary"> a tutor</span>
              </h2>
              <p className="text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
              </p>
            </div>

            <div className="space-y-4">
              <FeatureItem
                text="Lorem Ipsum is simply dummy text of the printing and typesetting"
                delay={0}
                bg="!bg-background"
              />
              <FeatureItem
                text="Lorem Ipsum is simply dummy text of the printing and typesetting"
                delay={1}
                bg="!bg-background"
              />
              <FeatureItem
                text="text ever since the 1500s, when an unknown printer took a galley of "
                delay={2}
                bg="!bg-background"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto">
              <Button className="h-10 sm:h-12 w-full sm:w-auto text-base !px-6 sm:text-lg font-semibold cursor-pointer">
                Learn More
                <ArrowRight />
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/image/home/becomeATutor.png"
              alt="Benefit 1"
              width={600}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section className="py-16 mx-auto max-w-[1440px] px-4 space-y-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="max-w-[584px] mx-auto space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4  w-auto">
              {skills.map((skill, idx) => (
                <div
                  className="flex flex-col items-center justify-center w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-2xl shadow-background shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden "
                  key={idx}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3 bg-background rounded-full">
                    <img
                      src={skill.image}
                      alt={skill.title}
                      className={`w-full h-full object-contain ${
                        idx === 0 || idx === 3 ? "rotate-320" : ""
                      }`}
                    />
                  </div>
                  <p className="text-foreground font-medium text-base sm:text-lg">
                    {skill.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Text Right */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ">
                Search by <span className="text-primary"> Exams</span>
              </h2>
              <p className="text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
              </p>
            </div>

            <div className="space-y-4">
              <FeatureItem
                text="Lorem Ipsum is simply dummy text of the printing and typesetting."
                delay={0}
                bg="!bg-background"
              />
              <FeatureItem
                text="industry. Lorem Ipsum has been the industry's standard dummy."
                delay={1}
                bg="!bg-background"
              />
              <FeatureItem
                text="text ever since the 1500s, when an unknown printer took a galley of ."
                delay={2}
                bg="!bg-background"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto">
              <Button className="h-10 sm:h-12 w-full sm:w-auto text-base !px-6 sm:text-lg font-semibold cursor-pointer">
                View All Exams
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="py-16 mx-auto max-w-[1440px] px-4 space-y-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Image Left */}
          <div className="flex justify-center order-1 lg:order-none">
            <Image
              src="/image/home/edu-opp-membership.png"
              alt="Benefit 2"
              width={600}
              height={400}
              className="object-contain"
              priority
            />
          </div>

          {/* Text Right */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ">
                Membership <span className="text-primary"> benefits</span>
              </h2>
              <p className="text-lg">
                40 practice questions a days will eventually pay.
              </p>
            </div>

            <div className="space-y-4">
              <FeatureItem
                text="Practice real exam-style questions to improve accuracy."
                delay={0}
                bg="!bg-background"
              />
              <FeatureItem
                text="Get instant feedback and understand your strengths."
                delay={1}
                bg="!bg-background"
              />
              <FeatureItem
                text="text ever since the 1500s, when an unknown printer took a galley of ."
                delay={2}
                bg="!bg-background"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto">
              <Button className="h-10 sm:h-12 w-full sm:w-auto text-base !px-6 sm:text-lg font-semibold cursor-pointer">
                Learn More
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EducationOpportunities;
