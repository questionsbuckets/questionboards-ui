"use client";

import React from "react";

interface CardProps {
  title: string;
  image: string;
}

const SubjectInfoCard: React.FC<CardProps> = ({ title, image }) => {
  return (
    <div className="flex flex-col items-center justify-center w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>
      <p className="text-foreground font-medium text-base sm:text-lg">
        {title}
      </p>
    </div>
  );
};

export default SubjectInfoCard;
