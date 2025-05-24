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
    }, 3000); // Auto-scroll every 3 seconds

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
    const isMobile = windowSize.width < 640; // sm breakpoint
    const isTablet = windowSize.width >= 640 && windowSize.width < 1024; // sm to lg
    const isLargeScreen = windowSize.width >= 1280; // xl and above

    // Calculate responsive values
    const containerWidth = Math.min(windowSize.width, 1280);
    const containerHeight = isMobile
      ? windowSize.height * 0.6
      : isTablet
      ? windowSize.height * 0.7
      : windowSize.height * 0.8;

    // Center point of the container
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Scale factors based on screen size
    const centerScale = isMobile ? 0.9 : isTablet ? 0.95 : 1;
    const sideScale = isMobile ? 0.6 : isTablet ? 0.65 : 0.75;
    const farSideScale = isMobile ? 0.4 : isTablet ? 0.45 : 0.6;

    // Base size for the center item
    const baseSize = isMobile
      ? 200
      : isTablet
      ? 180
      : isLargeScreen
      ? 250
      : 250;

    // Horizontal spacing factors
    const level1Offset = isMobile
      ? containerWidth * 0.3
      : isTablet
      ? containerWidth * 0.25
      : containerWidth * 0.3;
    const level2Offset = isMobile
      ? containerWidth * 0.5
      : isTablet
      ? containerWidth * 0.35
      : containerWidth * 0.4;

    // Vertical offset for non-center items
    const verticalOffset = isMobile ? 20 : isTablet ? 40 : 60;

    if (isMobile) {
      switch (position) {
        case "center":
          return {
            zIndex: 50,
            width: baseSize * centerScale,
            height: baseSize * centerScale,
            top: centerY - (baseSize * centerScale) / 100,
            left: centerX - (baseSize * centerScale) / 0.8 + level1Offset,
            transform: "translate(0, 0)",
            opacity: 1,
          };
        case "left-1":
          return {
            zIndex: 40,
            width: baseSize * sideScale,
            height: baseSize * sideScale,
            top: centerY - (baseSize * sideScale) / 100 + verticalOffset * 4,
            left: centerX - (baseSize * sideScale) / 1.2 - level1Offset,
            transform: "translate(0, 0)",
            opacity: 1,
          };
        case "right-1":
          return {
            zIndex: 40,
            width: baseSize * sideScale,
            height: baseSize * sideScale,
            top: centerY - (baseSize * sideScale) / 100 + verticalOffset * 4,
            left: centerX - (baseSize * sideScale) / 2 + level1Offset,
            transform: "translate(0, 0)",
            opacity: 1,
          };
        case "left-2":
        case "right-2":
          return {
            zIndex: 30,
            width: baseSize * farSideScale,
            height: baseSize * farSideScale,
            top: centerY - (baseSize * farSideScale) / 10 + verticalOffset * 9,
            left:
              position === "left-2"
                ? centerX - (baseSize * farSideScale) / 1 - level2Offset
                : centerX - (baseSize * farSideScale) / 2 + level2Offset,
            transform: "translate(0, 0)",
            opacity: 0.3,
            display: "none", // Hide far items on mobile
          };
        default:
          return {};
      }
    } else {
      switch (position) {
        case "center":
          return {
            zIndex: 50,
            width: baseSize * centerScale,
            height: baseSize * centerScale,
            top: centerY - (baseSize * centerScale) / 3,
            left: centerX - (baseSize * centerScale) / 2.5,
            transform: "translate(0, 0)",
            opacity: 1,
          };
        case "left-1":
          return {
            zIndex: 40,
            width: baseSize * sideScale,
            height: baseSize * sideScale,
            top: centerY - (baseSize * sideScale) / 4 + verticalOffset,
            left: centerX - (baseSize * sideScale) / 1000 - level1Offset / 1.2,
            transform: "translate(0, 0)",
            opacity: 1,
          };
        case "left-2":
          return {
            zIndex: 30,
            width: baseSize * farSideScale,
            height: baseSize * farSideScale,
            top: centerY - (baseSize * farSideScale) / 10 + verticalOffset * 2,
            left:
              centerX - (baseSize * farSideScale) / 800 - level2Offset / 1.2,
            transform: "translate(0, 0)",
            opacity: 1,
          };
        case "right-1":
          return {
            zIndex: 40,
            width: baseSize * sideScale,
            height: baseSize * sideScale,
            top: centerY - (baseSize * sideScale) / 4 + verticalOffset,
            left: centerX - (baseSize * sideScale) / 0.9 + level1Offset,
            transform: "translate(0, 0)",
            opacity: 1,
          };
        case "right-2":
          return {
            zIndex: 30,
            width: baseSize * farSideScale,
            height: baseSize * farSideScale,
            top: centerY - (baseSize * farSideScale) / 10 + verticalOffset * 2,
            left: centerX - (baseSize * farSideScale) / 0.8 + level2Offset,
            transform: "translate(0, 0)",
            opacity: 1,
          };
        default:
          return {};
      }
    }
  };

  // Responsive animation variants
  const getAnimationVariant = (position) => {
    const isMobile = windowSize.width < 640;
    const isTablet = windowSize.width >= 640 && windowSize.width < 1024;

    if (isMobile) {
      switch (position) {
        case "center":
          return { scale: [0.9, 1], opacity: [1, 1], rotate: 0 };
        case "left-1":
        case "right-1":
          return { scale: [0.7, 0.7], opacity: [0.7, 0.7], rotate: 0 };
        case "left-2":
        case "right-2":
          return { scale: [0.4, 0.4], opacity: [0.3, 0.3], rotate: 0 };
        default:
          return {};
      }
    } else if (isTablet) {
      switch (position) {
        case "center":
          return { scale: [0.95, 1], opacity: [0.9, 1], rotate: 0 };
        case "left-1":
        case "right-1":
          return { scale: [0.65, 0.75], opacity: [0.8, 0.9], rotate: 0 };
        case "left-2":
        case "right-2":
          return { scale: [0.45, 0.55], opacity: [0.7, 0.8], rotate: 0 };
        default:
          return {};
      }
    } else {
      switch (position) {
        case "center":
          return { scale: [0.9, 1], opacity: [1, 1], rotate: 0 };
        case "left-1":
        case "right-1":
          return { scale: [0.8, 0.8], opacity: [0.9, 0.9], rotate: 0 };
        case "left-2":
        case "right-2":
          return { scale: [0.7, 0.7], opacity: [0.8, 0.8], rotate: 0 };
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
        className="absolute inset-0 opacity-50 z-0 bg-cover bg-center bg-no-repeat sm:opacity-60 md:opacity-70 lg:opacity-80 xl:opacity-90 2xl:opacity-100"
        style={{
          backgroundImage: `url(${servicebg || "/placeholder.svg"})`,
        }}
      ></div>

      <div className="absolute top-0 left-0 w-full text-center z-10 pointer-events-none px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <h1 className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[100px] font-bold text-transparent bg-clip-text bg-black/20 opacity-50 tracking-widest sm:tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.2em] xl:tracking-[0.25em] 2xl:tracking-[0.3em]">
          QUALITY IS OUR RECIPE
        </h1>
      </div>

      <motion.div
        className="relative w-full h-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex justify-center items-center sm:items-start md:items-center lg:items-end xl:items-center 2xl:items-center"
        onPan={handleSwipe}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute rounded-full overflow-hidden shadow-md sm:shadow-lg md:shadow-xl lg:shadow-2xl xl:shadow-3xl 2xl:shadow-4xl z-10 sm:z-20 md:z-30 lg:z-40 xl:z-50 2xl:z-60"
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
              className="w-full h-full object-cover rounded-full sm:object-contain md:object-cover lg:object-contain xl:object-cover 2xl:object-contain"
            />
          </motion.div>
        ))}

        {centerItem && (
          <motion.div
            className="absolute z-40 bg-white rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12 
    flex flex-col justify-center items-center text-center shadow-lg sm:shadow-xl md:shadow-2xl 
    lg:shadow-3xl xl:shadow-4xl 2xl:shadow-5xl 
    top-[70%] md:top-[45%] lg:top-[50%] xl:top-[55%] 2xl:top-[60%] 
    left-1/2 md:left-[30%] lg:left-[35%] xl:left-[40%] 2xl:left-[45%]
    w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]
    max-w-[400px] min-h-[300px] md:min-h-[340px] lg:min-h-[360px] xl:min-h-[380px] 2xl:min-h-[400px]
    transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-[#101a24] mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8">
              {centerItem.name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-[#0d0d25] italic px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-8">
              "{centerItem.description}"
            </p>
          </motion.div>
        )}

        <div className="absolute bottom-10 sm:bottom-10 md:bottom-8 lg:bottom-10 xl:bottom-12 2xl:bottom-16 left-0 right-0 flex justify-between sm:justify-center md:justify-between lg:justify-center xl:justify-between 2xl:justify-center sm:space-x-16 md:space-x-20 lg:space-x-24 xl:space-x-28 2xl:space-x-32 z-50 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <button
            onClick={handleLeftClick}
            className="absolute bottom-60 sm:bottom-10 md:bottom-12 lg:bottom-10 xl:bottom-8 2xl:bottom-6 left-2 sm:left-4 md:left-6 lg:left-8 xl:left-10 2xl:left-12 bg-[#0079bf] text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18 rounded-full flex items-center justify-center hover:bg-[#006aa3] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0079bf] z-50"
            disabled={isAnimating}
            aria-label="Previous item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleRightClick}
            className="absolute bottom-60 sm:bottom-10 md:bottom-12 lg:bottom-10 xl:bottom-8 2xl:bottom-6 right-2 sm:right-4 md:right-6 lg:right-8 xl:right-10 2xl:right-12 bg-[#0079bf] text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18 rounded-full flex items-center justify-center hover:bg-[#006aa3] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0079bf] z-50"
            disabled={isAnimating}
            aria-label="Next item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes float-diagonal {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5px, 5px);
          }
        }

        .custom-float {
          animation: float-diagonal 3s ease-in-out infinite;
        }

        @media (max-width: 639px) {
          .absolute.rounded-full {
            transition: all 0.5s ease-in-out;
          }
        }

        @media (min-width: 640px) and (max-width: 767px) {
          .absolute.rounded-full {
            transition: all 0.5s ease-in-out;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .absolute.rounded-full {
            transition: all 0.5s ease-in-out;
          }
        }

        @media (min-width: 1024px) {
          .absolute.rounded-full {
            transition: all 0.5s ease-in-out;
          }
        }
      `}</style>
    </div>
  );
}
