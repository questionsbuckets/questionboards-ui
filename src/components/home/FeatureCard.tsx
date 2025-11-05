"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface CardProps {
  heading?: string;
  image?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  bottomText?: string;
}

const FeatureCard: React.FC<CardProps> = ({
  heading,
  image,
  buttonText,
  onButtonClick,
  bottomText,
}) => {
  return (
    <Card className="flex flex-col items-center justify-between bg-white rounded-2xl shadow-lg   transition-all duration-300 hover:scale-[1.02] overflow-hidden p-4 h-full text-center border border-gray-100">
      {/* Content */}
      <CardContent className="flex flex-col items-center text-center p-4 space-y-4 ">
        {/* Heading */}
        {heading && (
          <CardHeader className="p-0 flex flex-col items-center justify-center">
            <CardTitle className="font-semibold text-2xl text-center whitespace-nowrap overflow-hidden text-ellipsis">
              {heading}
            </CardTitle>
          </CardHeader>
        )}

        {/* Image */}
        {image && (
            <div className="relative w-48 h-48  rounded-full bg-background">
              <img
                src={image}
                alt={heading}
                className="absolute left-1/2 top-1/2 w-20 h-20 md:w-48 md:h-48 object-contain transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>
        )}

        {/* Button */}
        {buttonText && (
          <Button
            onClick={onButtonClick}
            className="bg-foreground h-auto sm:h-12 sm:px-6 sm:w-[300px] hover:bg-foreground mt-4 cursor-pointer  text-white w-full flex items-center justify-center"
          >
            {buttonText}
            <ArrowRight className="text-primary" />
          </Button>
        )}

        {/* Bottom Text */}
        {bottomText && (
          <Button
            variant="ghost"
            onClick={onButtonClick}
            className=" flex items-center justify-center"
          >
            <span>{bottomText}</span>
            <ArrowRight />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
