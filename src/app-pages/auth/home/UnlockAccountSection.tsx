"use client";
import UnlockAccCard from "@/components/home/UnlockAccCard";
import React from "react";

function UnlockAccountSection() {
  const cardData = [
    {
      heading: "Parents/Students",
      image: "/image/home/unlock-acc-img1.png",
      buttonText: "Create Account",
      onButtonClick: () => console.log("Free Worksheets Clicked"),
    },
    {
      heading: "Tutors",
      image: "/image/home/unlock-acc-img2.png",
      buttonText: "Create Account",
      onButtonClick: () => console.log("Membership Clicked"),
    },
    {
      heading: "Teachers",
      image: "/image/home/unlock-acc-img3.png",
      buttonText: "Create Account",
      onButtonClick: () => console.log("Homework Clicked"),
    },
  ];

  return (
    <div className="relative w-full min-h-[1050px] flex flex-col items-center justify-center  bg-white overflow-hidden">
      {/* Background Image */}
      <img
        src="/image/home/unlock-account-bg.png"
        alt="Subject Boards Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="mx-auto max-w-[1440px] px-4 w-full elative z-10 flex flex-col items-center justify-center   text-center space-y-4 sm:space-y-8 ">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
            Unlock Your <span className="text-primary"> Free Account</span> Now
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
          {cardData.map((card, index) => (
            <UnlockAccCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UnlockAccountSection;
