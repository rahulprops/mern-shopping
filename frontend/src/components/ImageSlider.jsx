import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  {
    id: 1,
    src: "/slider/slide1.jpg",
    alt: "New arrivals",
    caption: "Shop the latest trends",
  },
  {
    id: 2,
    src: "/slider/slide2.jpg",
    alt: "Summer Collection",
    caption: "Up to 50% Off!",
  },
  {
    id: 3,
    src: "/slider/slide3.jpg",
    alt: "Gadgets",
    caption: "Smart tech for smart people",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gray-200">
      {images.map((img, index) => (
        <div
          key={img.id}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-6 bg-black/50 text-white px-4 py-2 rounded-md text-xl font-semibold">
            {img.caption}
          </div>
        </div>
      ))}

      {/* Prev / Next Controls */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
