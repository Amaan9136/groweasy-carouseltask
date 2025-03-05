"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const images = [
  "/carousel_imgs/1.jpg",
  "/carousel_imgs/2.jpg",
  "/carousel_imgs/3.jpg",
  "/carousel_imgs/4.jpg",
  "/carousel_imgs/5.jpg",
  "/carousel_imgs/6.jpg",
  "/carousel_imgs/7.jpg",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const imageContainerRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const startAutoPlay = () => {
    intervalRef.current = setInterval(nextSlide, 3000);
  };

  const stopAutoPlay = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isPlaying]);

  useEffect(() => {
    gsap.fromTo(
      imageContainerRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, [currentIndex]);

  return (
    <div className="relative flex flex-col items-center justify-center p-3 bg-white text-black w-full h-screen">
      <div className="relative flex items-center justify-center w-full max-w-6xl h-[80vh] overflow-hidden">
        <img
          src={images[(currentIndex - 1 + images.length) % images.length]}
          alt="prev"
          className="w-1/3 h-[75vh] object-cover rounded-lg scale-90 opacity-80 transition-transform duration-1000 ease-in-out transform translate-x-[-10%]"
        />
        
        <img
          ref={imageContainerRef}
          src={images[currentIndex]}
          alt="current"
          className="w-1/2 h-[80vh] object-cover rounded-lg scale-100 shadow-lg"
        />
        
        <img
          src={images[(currentIndex + 1) % images.length]}
          alt="next"
          className="w-1/3 h-[75vh] object-cover rounded-lg scale-90 opacity-80 transition-transform duration-1000 ease-in-out transform translate-x-[10%]"
        />
      </div>

      <div className="flex gap-2 mt-6">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-8 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>

      <div className="flex mt-4 space-x-6">
        <button onClick={prevSlide} className="p-4 bg-black rounded-full text-white hover:bg-gray-800">
          <IoIosArrowBack size={28} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 bg-black rounded-full text-white hover:bg-gray-800"
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={nextSlide} className="p-4 bg-black rounded-full text-white hover:bg-gray-800">
          <IoIosArrowForward size={28} />
        </button>
      </div>
    </div>
  );
}