"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  imageSrc: string;
  description: string;
  stars: number; // 1-5
  name: string;
  designation: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  imageSrc,
  description,
  stars,
  name,
  designation,
}) => {
  return (
    <Card className="rounded-2xl shadow-lg transition-all duration-200">
      <CardContent className="flex p-2 md:p-6 h-50 md:h-58">
        {/* Left: Image */}
        <div className="flex-shrink-0 w-24 md:w-32 h-full">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Right: Text */}
        <div className="flex flex-col justify-between ml-4 md:ml-6 flex-1">
          {/* Description */}
          <p className="text-xs md:text-sm text-gray-700 font-normal">
            {description}
          </p>

          {/* Stars */}
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${i < stars ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>

          {/* Name & Designation */}
          <div className="mt-2">
            <p className="text-sm font-normal text-gray-900">{name}</p>
            <p className="text-xs font-normal text-gray-500">{designation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
