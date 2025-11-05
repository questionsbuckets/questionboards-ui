"use client";
import React from "react";

interface OverlayImageProps {
  image1: string;
  image2: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const OverlayImage: React.FC<OverlayImageProps> = ({
  image1,
  image2,
  width = "300px",
  height = "300px",
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Base Image */}
      <img
        src={image1}
        alt="Base"
        className="relative top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay Image */}
      <img
        src={image2}
        alt="Overlay"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
      />
    </div>
  );
};

export default OverlayImage;
