"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const quotes = [
  "“Question Boards is one of the most comprehensive databases of questions, based on actual exams.”",
  "“Practice daily and track your improvement with our performance dashboard.”",
  "“Join thousands of learners improving their exam readiness every day.”",
];

export function QuoteCarousel() {
  const [current, setCurrent] = React.useState(0);

  // ✅ Keep a stable autoplay plugin reference
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false, // don't reset on manual actions
      stopOnMouseEnter: false,  // we’ll control hover manually
    })
  );

  const handleMouseEnter = React.useCallback(() => {
    plugin.current.stop(); // pause autoplay
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    plugin.current.play(); // resume from current slide
  }, []);

  return (
    <div
      className="absolute bottom-8 bg-foreground bg-opacity-70 text-white px-6 py-4 rounded-lg max-w-sm w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        setApi={(api) => {
          if (!api) return;
          api.on("select", () => setCurrent(api.selectedScrollSnap()));
        }}
      >
        <CarouselContent>
          {quotes.map((quote, index) => (
            <CarouselItem key={index}>
              <p className="text-sm leading-relaxed text-center">{quote}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-3 space-x-1">
        {quotes.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              current === index ? "bg-green-500" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
