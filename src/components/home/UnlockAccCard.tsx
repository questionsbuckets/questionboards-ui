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
import Image from "next/image";

interface CardProps {
  heading?: string;
  image?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  bottomText?: string;
}

const UnlockAccCard: React.FC<CardProps> = ({
  heading,
  image,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Card className="flex flex-col items-center justify-between !bg-white transition-all duration-300 hover:scale-[1.02] overflow-hidden" >
      <CardContent className="flex flex-col items-center text-center p-4 space-y-4 ">
        {/* Heading */}
        {heading && (
          <CardHeader className="p-0 flex flex-col items-center justify-center">
            <CardTitle className="font-semibold text-2xl text-center whitespace-nowrap overflow-hidden text-ellipsis">
              {heading}
            </CardTitle>
          </CardHeader>
        )}

        {image && (
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-gray-50 shadow-md">
            <Image
              src={image}
              alt={heading || "image"}
              fill
              sizes="(max-width: 768px) 160px, 192px"
              priority
              quality={100}
              className="object-cover"
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
      </CardContent>
    </Card>
  );
};

export default UnlockAccCard;
