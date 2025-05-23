"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import italian from "../assets/italian.svg";
import pizza1 from "../assets/pizza1.svg";
import gujarati1 from "../assets/gujarati1.svg";
import south from "../assets/south.svg";
import punjabi from "../assets/punjabi.svg";
import servicebg from "../assets/servicebg.svg";

// Food data array with all the necessary information
const foodItems = [
  {
    id: 1,
    name: "Italian",
    image: italian,
    description:
      "Pasta is comfort food that brings people together around the table.",
    position: "left-2",
  },
  {
    id: 2,
    name: "Pizza",
    image: pizza1,
    description:
      "Pizza is not just food, it's a shared experience of joy and satisfaction.",
    position: "left-1",
  },
  {
    id: 3,
    name: "Gujarati",
    image: gujarati1,
    description: "Food is symbolic of love when words are inadequate.",
    position: "center",
  },
  {
    id: 4,
    name: "South Indian",
    image: south,
    description:
      "Simple flavors that tell complex stories of tradition and heritage.",
    position: "right-1",
  },
  {
    id: 5,
    name: "Punjabi",
    image: punjabi,
    description: "Bold flavors that awaken your senses and warm your soul.",
    position: "right-2",
  },
];

export default function Quality() {
  const [items, setItems] = useState(foodItems);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handleLeftClick();
      } else if (e.key === "ArrowRight") {
        handleRightClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating, items]);

  // Add auto-scrolling functionality
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      if (!isAnimating) {
        handleRightClick();
      }
    }, 3000); // Auto-scroll every 5 seconds

    return () => clearInterval(autoScrollInterval);
  }, [isAnimating]);

  const getCenterItem = () => items.find((item) => item.position === "center");

  const handleRightClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newItems = items.map((item) => {
      switch (item.position) {
        case "center":
          return { ...item, position: "left-1" };
        case "left-1":
          return { ...item, position: "left-2" };
        case "left-2":
          return { ...item, position: "right-2" };
        case "right-1":
          return { ...item, position: "center" };
        case "right-2":
          return { ...item, position: "right-1" };
        default:
          return item;
      }
    });

    setItems(newItems);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleLeftClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newItems = items.map((item) => {
      switch (item.position) {
        case "center":
          return { ...item, position: "right-1" };
        case "left-1":
          return { ...item, position: "center" };
        case "left-2":
          return { ...item, position: "left-1" };
        case "right-1":
          return { ...item, position: "right-2" };
        case "right-2":
          return { ...item, position: "left-2" };
        default:
          return item;
      }
    });

    setItems(newItems);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Responsive positioning based on screen size
  const getItemStyle = (position) => {
    const isMobile = windowSize.width < 768;
    const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

    // Calculate responsive values
    const containerWidth = Math.min(windowSize.width, 1280); // Max width of 1280px
    const containerHeight = isMobile
      ? windowSize.height * 0.7
      : windowSize.height * 0.8;

    // Center point of the container
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Scale factors based on screen size
    const centerScale = isMobile ? 1 : isTablet ? 0.9 : 1;
    const sideScale = isMobile ? 0.7 : isTablet ? 0.7 : 0.75;
    const farSideScale = isMobile ? 0.5 : isTablet ? 0.5 : 0.6;

    // Base size for the center item
    const baseSize = isMobile ? 120 : isTablet ? 220 : 250;

    // Horizontal spacing factors - adjusted for mobile
    const level1Offset = isMobile
      ? containerWidth * 0.35
      : containerWidth * (isTablet ? 0.22 : 0.25);
    const level2Offset = isMobile
      ? containerWidth * 0.6
      : containerWidth * (isTablet ? 0.32 : 0.35);

    // Vertical offset for non-center items - adjusted for mobile
    const verticalOffset = isMobile ? 30 : isTablet ? 60 : 80;

    if (isMobile) {
      // Simplified mobile layout: only show center item prominently
      switch (position) {
        case "center":
          return {
            zIndex: 50,
            width: baseSize * centerScale,
            height: baseSize * centerScale,
            top: centerY - (baseSize * centerScale) / 2,
            left: centerX - (baseSize * centerScale) / 2,
            transform: "none",
          };
        case "left-1":
          return {
            zIndex: 40,
            width: baseSize * sideScale,
            height: baseSize * sideScale,
            top: centerY - (baseSize * sideScale) / 200 - verticalOffset,
            left: centerX - (baseSize * sideScale) / 2 - level1Offset,
            transform: "none",
            opacity: 0.7,
          };
        case "right-1":
          return {
            zIndex: 40,
            width: baseSize * sideScale,
            height: baseSize * sideScale,
            top: centerY - (baseSize * sideScale) / 500 - verticalOffset,
            left: centerX - (baseSize * sideScale) / 2 + level1Offset,
            transform: "none",
            opacity: 0.6,
          };
        case "left-2":
        case "right-2":
          return {
            zIndex: 30,
            width: baseSize * farSideScale,
            height: baseSize * farSideScale,
            top: centerY - (baseSize * farSideScale) / 2 - verticalOffset * 2,
            left: centerX - (baseSize * farSideScale) / 2,
            transform: "none",
            opacity: 0.3,
            display: "none", // Hide far items on mobile for simplicity
          };
        default:
          return {};
      }
    } else {
      // Desktop and tablet layout
      switch (position) {
        case "center":
          return {
            zIndex: 50,
            width: baseSize,
            height: baseSize,
            top: centerY - baseSize / 2.5,
            left: centerX - baseSize / 2,
            transform: "none",
          };
        case "left-1":
          return {
            zIndex: 40,
            width: baseSize * sideScale,
            height: baseSize * sideScale,
            top: centerY - (baseSize * sideScale) / 2 + verticalOffset,
            left: centerX - (baseSize * sideScale) / 20 - level1Offset,
            transform: "none",
          };
        case "left-2":
          return {
            zIndex: 30,
            width: baseSize * farSideScale,
            height: baseSize * farSideScale,
            top: centerY - (baseSize * farSideScale) / 4 + verticalOffset * 2,
            left: centerX - (baseSize * farSideScale) / 30 - level2Offset,
            transform: "none",
          };
        case "right-1":
          return {
            zIndex: 40,
            width: baseSize * sideScale,
            height: baseSize * sideScale,
            top: centerY - (baseSize * sideScale) / 2 + verticalOffset,
            left: centerX - (baseSize * sideScale) / 1 + level1Offset,
            transform: "none",
          };
        case "right-2":
          return {
            zIndex: 30,
            width: baseSize * farSideScale,
            height: baseSize * farSideScale,
            top: centerY - (baseSize * farSideScale) / 5 + verticalOffset * 2,
            left: centerX - (baseSize * farSideScale) / 0.9 + level2Offset,
            transform: "none",
          };
        default:
          return {};
      }
    }
  };

  const getAnimationVariant = (position) => {
    const isMobile = windowSize.width < 768;
    if (isMobile) {
      switch (position) {
        case "center":
          return { rotate: [0, 90], scale: [1, 1.5], opacity: [0.8, 1] };
        case "left-1":
        case "right-1":
          return { rotate: [0, 10], scale: [0.7, 0.8], opacity: [0.6, 0.7] };
        case "left-2":
        case "right-2":
          return { rotate: [0, 0], scale: [0.6, 0.6], opacity: [0.3, 0.3] };
        default:
          return {};
      }
    } else {
      switch (position) {
        case "center":
          return { rotate: [0, 90], scale: [0.9, 1], opacity: [0.9, 1] };
        case "left-1":
        case "right-1":
          return { rotate: [0, 0], scale: [0.8, 0.9], opacity: [0.8, 0.9] };
        case "left-2":
        case "right-2":
          return { rotate: [0, 0], scale: [0.7, 0.8], opacity: [0.7, 0.8] };
        default:
          return {};
      }
    }
  };

  const centerItem = getCenterItem();

  // Handle swipe gestures for mobile
  const handleSwipe = (event, info) => {
    if (isAnimating) return;

    if (info.offset.x > 50) {
      handleLeftClick();
    } else if (info.offset.x < -50) {
      handleRightClick();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <div
        className="absolute inset-0 opacity-50 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${servicebg})`,
        }}
      ></div>

      <div className="absolute top-0 left-0 w-full text-center z-10 pointer-events-none px-4">
        <h1 className="hidden md:block mt-8 md:mt-15 text-3xl md:text-6xl lg:text-[100px] font-bold text-transparent bg-clip-text bg-black/20 opacity-50 tracking-widest">
          QUALITY IS OUR RECIPE
        </h1>
      </div>

      <motion.div
        className="relative w-full h-full md:max-w-7xl flex justify-center items-center mx-auto"
        onPan={handleSwipe}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute rounded-full overflow-hidden"
            style={getItemStyle(item.position)}
            animate={getAnimationVariant(item.position)}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.5,
            }}
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        ))}

        {centerItem && (
          <motion.div
            className="absolute z-40 bg-white rounded-3xl p-4 sm:p-6 md:ml-15 lg:ml-0 lg:mt-5 md:p-8 flex flex-col justify-center items-center text-center shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              width: windowSize.width < 768 ? "60%" : "250px",
              maxWidth: "350px",
              height: "auto",
              minHeight: windowSize.width < 768 ? "250px" : "270px",
              top:
                windowSize.width < 768
                  ? windowSize.height * 0.39
                  : windowSize.height * 0.5,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#101a24] mb-2 md:mb-4">
              {centerItem.name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#0d0d25] italic">
              "{centerItem.description}"
            </p>
          </motion.div>
        )}

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8 z-50 px-4">
          <button
            onClick={handleLeftClick}
            className="absolute left-5 lg:left-100 md:left-75 md:bottom-10 lg:bottom-20 bottom-90 bg-[#0079bf] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-[#006aa3] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0079bf]"
            disabled={isAnimating}
            aria-label="Previous item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleRightClick}
            className="absolute right-5 lg:bottom-20 md:right-45 md:bottom-10 lg:right-100 bottom-90 bg-[#0079bf] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-[#006aa3] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0079bf]"
            disabled={isAnimating}
            aria-label="Next item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
