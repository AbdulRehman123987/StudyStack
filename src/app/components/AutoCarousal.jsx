"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function AutoCarousel() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2500, // 2.5 seconds delay between slides
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const items = ["/aboutBanner.jpg", "/aboutBanner2.jpg", "/banner.jpg"];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        loop: true, // 🔁 Enables infinite looping
      }}
    >
      <CarouselContent>
        {items.map((src, index) => (
          <CarouselItem key={index} className="w-full">
            <Card className="w-full h-[370px] p-0">
              <CardContent className="w-full h-full p-0">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-1000"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
