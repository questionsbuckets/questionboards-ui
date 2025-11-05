"use client";

import { Check } from "lucide-react";
import React from "react";

interface FeatureItemProps {
  text: string;
  delay?: number; // kept for prop consistency, though unused now
  icon?: React.ReactNode;
  className?: string;
  iconBgClass?: string;
  textClass?: string;
  bg?: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
  text,
  icon = <Check className="text-primary h-6 w-6" />,
  className = "",
  iconBgClass = "bg-white shadow-custom-blue",
  textClass = "text-gray-700",
  bg = "bg-background",
}) => {


  return (
    <div className={`mb-4 flex items-center space-x-3 ${className}`}>
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full p-1 ${iconBgClass} ${bg}`}
        >
        {icon}
      </div>
      <p className={textClass}>{text}</p>
    </div>
  );
};
