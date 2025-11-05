"use client";
import React from "react";
import OurMissionIcon3 from "../../../../public/icons/home/OurMissionIcon3";
import OurMissionIcon2 from "../../../../public/icons/home/OurMissionIcon2";
import OurMissionIcon1 from "../../../../public/icons/home/OurMissionIcon1";

const missionItems = [
  { icon: <OurMissionIcon1 />, label: "Parents" },
  { icon: <OurMissionIcon2 />, label: "Students" },
  { icon: <OurMissionIcon3 />, label: "Teachers" },
  { icon: <OurMissionIcon3 />, label: "Tutors" },
];
function OurMissionSection() {
  return (
    <div className="w-full bg-white">
      <section className=" py-10  mx-auto max-w-[1440px] px-4 ">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
          Our <span className="text-primary"> Mission</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {missionItems.map((it, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl h-65 p-6 flex flex-col items-center justify-between shadow-background shadow-md transition-all duration-300 hover:scale-[1.02] overflow-hidden" 
            >
              <div className="flex flex-col items-center">
                <div className="w-36 h-36 bg-background rounded-full flex justify-center items-center ">
                  <div>{it.icon}</div>
                </div>
              </div>
              <div className="text-center text-lg font-semibold">{it.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default OurMissionSection;
