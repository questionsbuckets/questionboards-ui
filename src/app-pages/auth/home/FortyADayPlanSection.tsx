"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FourtyDayPlane3 from "../../../../public/icons/home/FourtyDayPlane3";
import FourtyDayPlane1 from "../../../../public/icons/home/FourtyDayPlane1";
import FourtyDayPlane2 from "../../../../public/icons/home/FourtyDayPlane2";

const steps = [
  {
    icon: <FourtyDayPlane1 />,
    title: "Choose Grade",
    desc: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: <FourtyDayPlane2 />,
    title: "Choose Subject",
    desc: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: <FourtyDayPlane3 />,
    title: "And Go",
    desc: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const FortyADayPlanSection = () => {
  return (
    <div className="w-full bg-white">
      <section className=" py-16  flex flex-col items-center mx-auto max-w-[1440px] px-4">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
            Start Your <span className="text-primary">40-a-Day</span> Plan
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {steps.map((step, idx) => (
              <div key={idx}>
                <div className="flex flex-col items-center space-y-4 ">
                  <div
                    className="bg-white   p-6    w-36    h-36    rounded-2xl    shadow-md    flex    items-center    justify-center    transition-all    duration-300
    ease-out    hover:bg-primary/10    hover:scale-[1.07]    hover:shadow-lg  "
                  >
                    {step.icon}
                  </div>

                  <h3 className="font-semibold text-2xl">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed ">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button className="h-10 sm:h-12 w-full sm:w-auto text-base !px-6 sm:text-lg font-semibold cursor-pointer">
              View All Exams
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FortyADayPlanSection;
