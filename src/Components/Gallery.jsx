"use client";

import { useEffect, useState } from "react";
import peppers from "../assets/peppers.svg";
import gallery from "../assets/gallery.jpg";
import servicebg from "../assets/servicebg.svg";

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="gallery">
      <section className="relative w-full overflow-hidden">
        <div className="absolute opacity-50 inset-0 z-0">
          <img
            src={servicebg}
            alt="Food background"
            className="object-cover w-full h-full"
          />
        </div>

        <div
          className={`container ${
            isMobile ? "mx-auto px-4" : "mx-25 px-4"
          } py-16`}
        >
          <div
            className={`relative flex ${
              isMobile ? "flex-col items-center" : "md:flex-row md:items-center"
            } justify-center`}
          >
            {/* Left side content */}
            <div className="md:w-1/3 z-10 order-2 md:order-1 text-center md:text-left md:pr-8">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <img
                  src={peppers}
                  alt="Vegetable splash"
                  width={200}
                  height={200}
                  className="right-360 -top-15 absolute custom-float"
                />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 z-10">
                  Our Gallery
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Experience the richness of Indian vegetarian cuisine.
              </p>

              <p className="text-gray-700">
                where every plate is a masterpiece and every ingredient tells a
                story. From vibrant starters to decadent desserts, our gallery
                captures the passion, flavor, and artistry behind every creation
              </p>
            </div>

            {/* Right side single image */}
            <div className="md:w-2/3 z-10 order-1 md:order-2 mb-8 md:mb-0">
              <div className="relative h-80 md:h-[400px] md:mr-10 overflow-hidden">
                <img
                  src={gallery}
                  alt="Gallery showcase"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
  @keyframes float-diagonal {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0px, 10px);
    }
  }

  .custom-float {
    animation: float-diagonal 3s ease-in-out infinite;
  }
`}
        </style>
      </section>
    </section>
  );
}
