"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Paulo Hubert",
    role: "New York, USA",
    image: "/image/home/testimonial.png",
    rating: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised..",
  },
  {
    name: "Ava Johnson",
    role: "London, UK",
    image: "/image/home/testimonial.png",
    rating: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised..",
  },
  {
    name: "David Smith",
    role: "California, USA",
    image: "/image/home/testimonial.png",
    rating: 4,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised..",
  },
];

export const OurTestimonials = () => {
  return (
    <section className="py-20 bg-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
          Happy & <span className="text-primary"> Satisfied</span>Faces
        </h2>

        {/* Carousel */}
        <Carousel className="relative w-full max-w-3xl mx-auto mt-10">
          <CarouselContent>
            {testimonials.map((t, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <Card className="w-full  mx-auto bg-white  shadow-lg shadow-background rounded-2xl">
                  <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4">
                    {/* Image */}
                    <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 flex-shrink-0">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={300}
                        height={300}
                        className="rounded-xl object-cover w-full h-full shadow-md"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="text-left flex flex-col justify-center max-w-xl">
                      <Quote className="h-6 w-6 text-primary opacity-80 mb-3" />
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                        {t.text}
                      </p>

                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      <p className="font-semibold text-primary text-sm sm:text-base">
                        {t.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {t.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 ">
            <CarouselPrevious className="hover:bg-background cursor-pqointer" />
            <CarouselNext className="hover:bg-background cursor-pqointer" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default OurTestimonials;
