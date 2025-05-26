"use client";

import { useEffect, useState, useRef } from "react";
import onion from "../assets/onion.svg";
import testleaf from "../assets/testleaf.svg";
import tomato from "../assets/tomato.svg";
import tomato2 from "../assets/tomato2.svg";
import coma1 from "../assets/coma1.svg";
import coma2 from "../assets/coma2.svg";
import p4 from "../assets/p4.svg";
import p6 from "../assets/p6.svg";
import p7 from "../assets/p7.svg";

const testimonials = [
  {
    id: 1,
    name: "Mehul Bhalala",
    title: "Corporate Event Manager",
    image: p4,
    rating: 5,
    text: "We hired Radha Cateres for our family event, and it was an amazing experience! The food was absolutely delicious—every dish was fresh, flavorful, and beautifully presented. The soup, biryani and desserts were a big hit among our guests. The service was top-notch, with friendly and professional staff ensuring everything was well-organized. Highly recommend them for any event!",
  },
  {
    id: 2,
    name: "ramesh dhanani",
    title: "Wedding Planner",
    image: p6,
    rating: 5,
    text: "I have hired Radha Cateres for 2 days marriage function food of my beloved daughter and every food were very delicious and tasty, my family members and our invited guests enjoyed a lots of all foods",
  },
  {
    id: 3,
    name: "RDevani",
    title: "Restaurant Owner",
    image: p7,
    rating: 5,
    text: "Excellent job done by the management team with personal watch by the owners. It happens to use their services on recent marriage function at Mansarovar party loans.",
  },
  {
    id: 4,
    name: "priyank kothiya",
    title: "Corporate Event Manager",
    image: p4,
    rating: 5,
    text: "Best Food Quality, highly reliable, and top-notch management with an experienced team🙏. Highly recommended.",
  },
  {
    id: 5,
    name: "Rikunj Moradia",
    title: "Wedding Planner",
    image: p4,
    rating: 5,
    text: "With utmost food quality consciousness, They are Trustworthy, Hardworking and Through Professional Caterer of all I have been encountered with. You can trust their Quality, Price and Timely Delivery - Without thinking twice. I am so happy today with your services and food quality. Thank you Radha Caterers",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  // Create an array with the original testimonials plus a clone of the first one
  const extendedTestimonials = [
    ...testimonials,
    { ...testimonials[0], id: "clone-1" },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const autoScroll = () => {
      if (isTransitioning) return;

      setActiveIndex((prevIndex) => {
        // If we're at the last slide (which is the clone of the first)
        if (prevIndex >= testimonials.length) {
          // We'll let it animate to the clone
          return 0;
        }
        return prevIndex + 1;
      });
    };

    intervalRef.current = setInterval(autoScroll, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTransitioning, testimonials.length]);

  // Handle the transition end
  useEffect(() => {
    const handleTransitionEnd = () => {
      // If we've just animated to the cloned first slide (which is at the end)
      if (activeIndex === testimonials.length) {
        setIsTransitioning(true);
        // Disable transition temporarily
        if (sliderRef.current) {
          sliderRef.current.style.transition = "none";
        }
        // Jump back to the real first slide
        setActiveIndex(0);

        // Re-enable transition after the jump
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = "transform 500ms ease-in-out";
            setIsTransitioning(false);
          }
        }, 50);
      } else {
        setIsTransitioning(false);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        slider.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [activeIndex, testimonials.length]);

  // Handle manual navigation
  const goToSlide = (index) => {
    if (isTransitioning) return;
    setActiveIndex(index);

    // Reset timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (!isTransitioning) {
          setActiveIndex((prevIndex) => {
            if (prevIndex >= testimonials.length) {
              return 0;
            }
            return prevIndex + 1;
          });
        }
      }, 5000);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 py-16 px-4">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="hidden md:block md:text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-black/5 to-transparent  select-none absolute top-23 -right-100 w-full">
          TESTIMONIALS
        </h1>
      </div>

      {/* Decorative elements - top left */}
      <div className="absolute -top-20 -left-15 w-60 h-60 overflow-hidden">
        <img
          src={onion}
          alt="Decorative leaves"
          className="w-full h-full object-contain custom-float"
        />
      </div>

      {/* Decorative elements - top right */}
      <div className="absolute -top-20 -right-10 w-60 h-60 overflow-hidden">
        <img
          src={tomato}
          alt="Decorative tomato"
          className="w-full h-full object-contain custom-float"
        />
      </div>

      {/* Decorative elements - bottom left */}
      <div className="absolute bottom-130 left-150 w-50 h-50 overflow-hidden">
        <img
          src={testleaf}
          alt="Decorative onion"
          className="w-full h-full object-contain custom-float"
        />
      </div>

      {/* Decorative elements - bottom right */}
      <div className="absolute -bottom-17 -right-17 w-60 h-60 overflow-hidden">
        <img
          src={tomato2}
          alt="Decorative vegetables"
          className="w-full h-full object-contain custom-float"
        />
      </div>

      {/* Testimonial slider */}
      <div className="relative max-w-3xl mx-auto">
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {extendedTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 flex flex-col items-center px-4 my-15"
              >
                <div className="flex items-center justify-center mb-4 relative">
                  {/* Left quote */}
                  <div className="absolute -left-20 top-25 -translate-y-1/2">
                    <img
                      src={coma2}
                      alt="left quote"
                      className="w-10 h-10 custom-float"
                    />
                  </div>

                  {/* User image */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right quote */}
                  <div className="absolute -right-20 bottom-15 -translate-y-1/2">
                    <img
                      src={coma1}
                      alt="right quote"
                      className="w-10 h-10 custom-float"
                    />
                  </div>
                </div>

                {/* User info */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                {/* <p className="text-gray-600 mb-2">{testimonial.title}</p> */}

                {/* Google rating */}
                <div className="flex items-center mb-4">
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="24px"
                      height="24px"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        className={
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      ></path>
                    </svg>
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-center text-gray-700 max-w-lg mt-4">
                  {testimonial.text}
                </p>
              </div>
            ))}
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
    </div>
  );
}
