"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroSlides from "@/data/hero-slides.json";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[480px] md:h-[600px] overflow-hidden">
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={idx === 0}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-80`} />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg animate-slide-up">
                <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                  {slide.badge}
                </span>
                <p className="text-blue-300 font-semibold text-sm mb-2 uppercase tracking-widest">
                  {slide.subtitle}
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-all hover:scale-105 shadow-lg shadow-black/20"
                >
                  {slide.buttonText}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/90 transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/90 transition-all"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all rounded-full ${
              i === current ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
