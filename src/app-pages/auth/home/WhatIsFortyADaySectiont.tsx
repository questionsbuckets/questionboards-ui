import { Button } from "@/components/ui/button";
import { Triangle, Video } from "lucide-react";
import React from "react";

function WhatIsFortyADaySectiont() {
  return (
    <div className="relative w-full min-h-[850px] flex flex-col items-center justify-center   bg-white overflow-hidden ">
      {/* Background Image */}
      <img
        src="/image/home/what-40-day-plane.png"
        alt="Question Boards"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center   text-center py-32px-4 w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
          What is 40-a-Day
        </h1>
        <p className="text-sm sm:text-base mb-6 text-white/70">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the{" "}
        </p>
          <Button className="bg-foreground rounded-full !px-6 py-6 cursor-pointer"> <Triangle className="rotate-90" /> Watch Video</Button>
      </div>
    </div>
  );
}

export default WhatIsFortyADaySectiont;
