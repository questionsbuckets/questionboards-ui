"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { Play } from "lucide-react";

const QuestionBoardsSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full bg-white">
      <section className="py-16 flex flex-col items-center mx-auto max-w-[1440px] px-4">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
            What are <span className="text-primary">Question Boards?</span>
          </h2>
        </div>

        <div className="relative mt-10 w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-lg">
          {/* Thumbnail or Video */}
          {!isPlaying ? (
            <>
              <Image
                src="/image/home/ques-board-video.png"
                alt="Question Boards Preview"
                fill
                className="object-cover"
                priority
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button
                  size="lg"
                  className="rounded-full p-6 cursor-pointer  text-primary bg-white  hover:bg-white transition-all"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="w-10 h-10" />
                </Button>
              </div>
            </>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Question Boards Video"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>
      </section>
    </div>
  );
};
export default QuestionBoardsSection;
