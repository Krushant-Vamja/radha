"use client";

import { useEffect, useRef, useState } from "react";
import servicebg from "../assets/servicebg.svg";
import s1 from "../assets/s1.svg";
import s2 from "../assets/s2.svg";
import s3 from "../assets/s3.svg";
import s4 from "../assets/s4.svg";
import leftleaf from "../assets/leftleaf.svg";
import rightleaf from "../assets/rightleaf.svg";

const Services = () => {
  const leafLeftRef = useRef(null);
  const leafRightRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const animateLeaf = (ref, direction) => {
      if (!ref.current) return;

      let frame = 0;

      const animate = () => {
        frame += 0.05;

        const floatY = Math.sin(frame) * 5;
        const floatX = Math.cos(frame) * 2;
        const rotation = direction === "left" ? floatY : -floatY;

        ref.current.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${rotation}deg)`;
        requestAnimationFrame(animate);
      };

      animate();
    };

    animateLeaf(leafLeftRef, "left");
    animateLeaf(leafRightRef, "right");

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && window.innerWidth < 768) {
      const scrollWidth = scrollContainer.scrollWidth / 2;
      const scroll = () => {
        if (scrollContainer.scrollLeft >= scrollWidth) {
          scrollContainer.scrollLeft -= scrollWidth;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      };

      scrollIntervalRef.current = setInterval(scroll, 20);

      const handleScroll = () => {
        if (scrollContainer.scrollLeft >= scrollWidth) {
          scrollContainer.scrollLeft -= scrollWidth;
        }
      };

      const handleTouchStart = () => {
        clearInterval(scrollIntervalRef.current);
      };

      const handleTouchEnd = () => {
        scrollIntervalRef.current = setInterval(scroll, 20);
      };

      scrollContainer.addEventListener("scroll", handleScroll);
      scrollContainer.addEventListener("touchstart", handleTouchStart);
      scrollContainer.addEventListener("touchend", handleTouchEnd);

      return () => {
        clearInterval(scrollIntervalRef.current);
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer.removeEventListener("touchstart", handleTouchStart);
        scrollContainer.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  const services = [
    {
      id: 1,
      title: "Corporate Events",
      backgroundText: "EVENT",
      description:
        "Professional catering solutions for business meetings, conferences, and corporate gatherings.",
      image: s1,
    },
    {
      id: 2,
      title: "Weddings & Celebrations",
      backgroundText: "SPECIAL",
      description:
        "Exquisite catering services for weddings, anniversaries, and special celebrations.",
      image: s2,
    },
    {
      id: 3,
      title: "Social Events",
      backgroundText: "SOCIAL",
      description:
        "Perfect catering solutions for social gatherings, parties, and community events.",
      image: s3,
    },
    {
      id: 4,
      title: "Custom Menus",
      backgroundText: "MENUS",
      description:
        "Personalized menu planning and customization to match your specific requirements.",
      image: s4,
    },
  ];

  const clonedServices = [...services, ...services];
  const displayServices = isMobile ? clonedServices : services;

  return (
    <section id="service">
      <div className="relative py-16 px-4 overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-50 z-0"
          style={{
            backgroundImage: `url(${servicebg})`,
            backgroundRepeat: "repeat-x",
          }}
        />

        {/* Left leaf decoration */}
        <div
          ref={leafLeftRef}
          className="hidden md:block absolute -left-10 top-1/4 w-20 h-20 md:w-40 md:h-40 z-10 pointer-events-none custom-float"
        >
          <img
            src={leftleaf}
            alt="Decorative leaf left"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right leaf decoration */}
        <div
          ref={leafRightRef}
          className="hidden md:block absolute -right-15 top-0 w-20 h-20 md:w-48 md:h-48 z-10 pointer-events-none custom-float"
        >
          <img
            src={rightleaf}
            alt="Decorative leaf right"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="container mx-auto relative z-20">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 italic mb-1">
              "Fresh Ideas, Fresh Ingredients, Unforgettable Events."
            </p>
            <p className="text-gray-600 italic">
              "Taste the Difference. Celebrate the Moment."
            </p>
          </div>

          {/* Services cards */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex md:grid overflow-x-auto scrollbar-hide grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-4 sm:p-10"
            >
              {displayServices.map((service, index) => (
                <div
                  key={`${service.id}-${index}`}
                  className="relative min-w-[75%] sm:min-w-0 group overflow-hidden p-4 transition-all duration-300"
                >
                  <div className="absolute items-center justify-center top-5.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-bold bg-gradient-to-b from-black to-white bg-clip-text text-transparent opacity-20 z-0 select-none">
                    {service.backgroundText}
                  </div>

                  <div className="relative z-10 flex justify-center transform transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`object-contain ${
                        service.id === 2
                          ? "md:h-34 w-38 md:p-2 pt-2"
                          : "h-34 sm:h-34 w-auto"
                      }`}
                    />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 relative z-10 text-center">
                    <span className="bg-clip-text text-transparent bg-black">
                      {service.title}
                    </span>
                  </h3>

                  <p className="text-[#333333] text-sm relative z-10 text-center">
                    {service.description}
                  </p>
                </div>
              ))}
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

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default Services;
