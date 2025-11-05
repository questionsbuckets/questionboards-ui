"use client";

import React from "react";
import FeatureCard from "@/components/home/FeatureCard";

const FreeWorksheet = () => {
  const cards = [
    {
      heading: "Free Worksheets",
      image: "/image/home/free-worksheet.png",
      buttonText: "Browse Worksheets",
      bottomText: "Learn more",
    },
    {
      heading: "Membership",
      image: "/image/home/membership.png",
      buttonText: "Shop Now",
      bottomText: "Learn more",
    },
    {
      heading: "Homework",
      image: "/image/home/homework.png",
      buttonText: "Explore",
      bottomText: "Learn more",
    },
  ];

  return (
    <div className="w-full bg-white">
      <section className="py-16 flex flex-col items-center mx-auto max-w-[1440px] px-4">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
            Free <span className="text-primary">Worksheets</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {cards.map((card, index) => (
            <FeatureCard
              key={index}
              heading={card.heading}
              image={card.image}
              buttonText={card.buttonText}
              bottomText={card.bottomText}
              onButtonClick={() => console.log(`${card.heading} clicked`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FreeWorksheet;
