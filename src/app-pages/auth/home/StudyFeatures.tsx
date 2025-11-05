import { Button } from "@/components/ui/button";
import { FeatureItem } from "@/components/ui/common/FeatureItem";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function StudyFeatures() {
  return (
    <div className="w-full bg-white">
      <section className=" py-16  mx-auto max-w-[1440px] px-4 space-y-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 ">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ">
                See where <span className="text-primary"> you stand</span> !!
              </h2>

              <p className="text-lg">
                40 practice questions a days will eventually pay.
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
                Grade
                <ArrowRight />
              </Button>
              <Button className="h-10 sm:h-12 w-full sm:w-auto text-base !px-6 sm:text-lg font-semibold cursor-pointer">
                Subject
                <ArrowRight />
              </Button>
              <Button className="h-10 sm:h-12 w-full sm:w-auto text-base !px-6 sm:text-lg font-semibold cursor-pointer bg-foreground text-white hover:bg-foreground">
                Start Exam
                <ArrowRight />
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/image/home/feature1.png"
              alt="Benefit 1"
              width={600}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
      {/* SECTION 2 — Image Left, Text Right */}
      <section className="py-16 mx-auto max-w-[1440px] px-4 space-y-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Image Left */}
          <div className="flex justify-center order-1 lg:order-none">
            <Image
              src="/image/home/feature2.png"
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
                Homework <span className="text-primary">(40-a-day)</span>
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
                text="Track progress over time with detailed analytics."
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

export default StudyFeatures;
