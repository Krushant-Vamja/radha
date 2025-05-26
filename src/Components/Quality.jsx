import { useState, useEffect } from "react";
import italian from "../assets/italian.svg";
import pizza1 from "../assets/pizza1.svg";
import gujarati1 from "../assets/gujarati1.svg";
import south from "../assets/south.svg";
import punjabi from "../assets/punjabi.svg";
import servicebg from "../assets/servicebg.jpg";

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
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && !isAnimating) handleLeftClick();
      else if (event.key === "ArrowRight" && !isAnimating) handleRightClick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating]);

  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      if (!isAnimating) handleRightClick();
    }, 4000);
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

  const getItemStyle = (position) => {
    const isMobile = windowSize.width < 768;
    const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
    const isDesktop = windowSize.width >= 1024 && windowSize.width < 1536;
    const is2XL = windowSize.width >= 1536 && windowSize.width < 2560;
    const isAbove4K = windowSize.width >= 2560;

    if (isAbove4K) {
      console.log(
        `Screen width: ${windowSize.width}px, using 4K layout with 2560px container`
      );
    }

    const containerWidth = Math.min(windowSize.width, isAbove4K ? 2560 : 1400);
    const containerHeight = windowSize.height;

    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    const baseSize = isMobile
      ? 120
      : isTablet
      ? 160
      : isDesktop
      ? 200
      : is2XL
      ? 240
      : 280;
    const scales = {
      center: isMobile
        ? 1.2
        : isTablet
        ? 1.3
        : isDesktop
        ? 1.4
        : is2XL
        ? 1.5
        : 1.6,
      side: isMobile ? 0.8 : isTablet ? 0.9 : isDesktop ? 1 : is2XL ? 1.1 : 1.2,
      farSide: isMobile
        ? 0.6
        : isTablet
        ? 0.7
        : isDesktop
        ? 0.8
        : is2XL
        ? 0.9
        : 1,
    };

    const level1Offset = isMobile
      ? containerWidth * 0.25
      : isTablet
      ? containerWidth * 0.22
      : isDesktop
      ? containerWidth * 0.2
      : is2XL
      ? containerWidth * 0.3
      : containerWidth * 0.35;
    const level2Offset = isMobile
      ? containerWidth * 0.4
      : isTablet
      ? containerWidth * 0.35
      : isDesktop
      ? containerWidth * 0.32
      : is2XL
      ? containerWidth * 0.45
      : containerWidth * 0.5;
    const verticalOffset = isMobile
      ? 10
      : isTablet
      ? 20
      : isDesktop
      ? 30
      : is2XL
      ? 50
      : 60;

    const lgLevel1Offset = containerWidth * 0.25;
    const lgLevel2Offset = containerWidth * 0.4;
    const lgVerticalOffset = isAbove4K ? 50 : 40;

    const commonStyles = {
      zIndex: position === "center" ? 50 : position.includes("1") ? 40 : 30,
      width:
        baseSize *
        (position === "center"
          ? scales.center
          : position.includes("1")
          ? scales.side
          : scales.farSide),
      height:
        baseSize *
        (position === "center"
          ? scales.center
          : position.includes("1")
          ? scales.side
          : scales.farSide),
      transition: "all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
    };

    if (isAbove4K) {
      switch (position) {
        case "center":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.center) / 1.6,
            left: centerX - (baseSize * scales.center) / 2,
            opacity: 1,
            transform: "scale(0.75)",
          };
        case "left-1":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.side) / 3 - lgVerticalOffset / 2,
            left: centerX - baseSize * scales.side * 1.2 - lgLevel1Offset / 6,
            opacity: 0.9,
            transform: "scale(0.7)",
          };
        case "left-2":
          return {
            ...commonStyles,
            top:
              centerY -
              (baseSize * scales.farSide) / 8 +
              lgVerticalOffset * 1.8,
            left: centerX - baseSize * scales.farSide - lgLevel2Offset / 2.5,
            opacity: 0.7,
            transform: "scale(0.6)",
          };
        case "right-1":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.side) / 3 - lgVerticalOffset / 2,
            left: centerX + baseSize * scales.side * 0.1 + lgLevel1Offset / 4.5,
            opacity: 0.9,
            transform: "scale(0.7)",
          };
        case "right-2":
          return {
            ...commonStyles,
            top:
              centerY -
              (baseSize * scales.farSide) / 8 +
              lgVerticalOffset * 1.8,
            left: centerX + baseSize * scales.farSide + lgLevel2Offset / 8,
            opacity: 0.7,
            transform: "scale(0.6)",
          };
        default:
          return {};
      }
    } else if (is2XL) {
      switch (position) {
        case "center":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.center) / 1.8,
            left: centerX - (baseSize * scales.center) / 3,
            opacity: 1,
            transform: "scale(0.65)",
          };
        case "left-1":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.side) / 4 - lgVerticalOffset / 3,
            left: centerX - baseSize * scales.side - lgLevel1Offset / 8,
            opacity: 0.9,
            transform: "scale(0.6)",
          };
        case "left-2":
          return {
            ...commonStyles,
            top:
              centerY -
              (baseSize * scales.farSide) / 10 +
              lgVerticalOffset * 1.5,
            left:
              centerX - (baseSize * scales.farSide) / 2 - lgLevel2Offset / 1.8,
            opacity: 0.7,
            transform: "scale(0.5)",
          };
        case "right-1":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.side) / 4 - lgVerticalOffset / 3,
            left: centerX + lgLevel1Offset / 2.1,
            opacity: 0.9,
            transform: "scale(0.6)",
          };
        case "right-2":
          return {
            ...commonStyles,
            top:
              centerY -
              (baseSize * scales.farSide) / 10 +
              lgVerticalOffset * 1.4,
            left:
              centerX + baseSize * scales.farSide * 0.5 + lgLevel2Offset / 2.6,
            opacity: 0.7,
            transform: "scale(0.5)",
          };
        default:
          return {};
      }
    } else if (isDesktop) {
      switch (position) {
        case "center":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.center) / 1.6,
            left: centerX - (baseSize * scales.center) / 2.2,
            opacity: 1,
            transform: "scale(1)",
          };
        case "left-1":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.side) / 4 + lgVerticalOffset * 1,
            left: centerX - baseSize * scales.side - lgLevel1Offset / 1.5,
            opacity: 0.9,
            transform: "scale(1)",
          };
        case "left-2":
          return {
            ...commonStyles,
            top:
              centerY - (baseSize * scales.farSide) / 10 + lgVerticalOffset * 4,
            left:
              centerX - baseSize * scales.farSide * 1.5 - lgLevel2Offset / 1.5,
            opacity: 0.7,
            transform: "scale(1)",
          };
        case "right-1":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.side) / 4 + lgVerticalOffset,
            left: centerX + lgLevel1Offset / 1.5,
            opacity: 0.9,
            transform: "scale(1)",
          };
        case "right-2":
          return {
            ...commonStyles,
            top:
              centerY -
              (baseSize * scales.farSide) / 10 +
              lgVerticalOffset * 3.8,
            left:
              centerX + baseSize * scales.farSide * 0.5 + lgLevel2Offset / 1.5,
            opacity: 0.7,
            transform: "scale(1)",
          };
        default:
          return {};
      }
    } else {
      switch (position) {
        case "center":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.center) / 2,
            left: centerX - (baseSize * scales.center) / 2,
            opacity: 1,
            transform: "scale(1)",
          };
        case "left-1":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.side) / 5 + verticalOffset,
            left: centerX - baseSize * scales.side * 0.9 - level1Offset,
            opacity: 0.8,
            transform: "scale(1)",
          };
        case "left-2":
          return {
            ...commonStyles,
            top:
              centerY - (baseSize * scales.farSide) / 14 + verticalOffset * 8.5,
            left: centerX - baseSize * scales.farSide - 2 - level2Offset,
            opacity: 0.6,
            transform: "scale(1)",
          };
        case "right-1":
          return {
            ...commonStyles,
            top: centerY - (baseSize * scales.side) / 5 + verticalOffset,
            left: centerX - baseSize * scales.side * 0.1 + level1Offset,
            opacity: 0.8,
            transform: "scale(1)",
          };
        case "right-2":
          return {
            ...commonStyles,
            top:
              centerY - (baseSize * scales.farSide) / 14 + verticalOffset * 8.5,
            left: centerX + 2 + level2Offset,
            opacity: 0.6,
            transform: "scale(1)",
          };
        default:
          return {};
      }
    }
  };

  const centerItem = getCenterItem();

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart(touch.clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const diff = touchStart - touch.clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleRightClick();
      } else {
        handleLeftClick();
      }
    }
    setTouchStart(null);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${servicebg})` }}
        ></div>
      </div>
      <div className="absolute top-0 left-0 w-full text-center z-10 pointer-events-none px-4">
        <h1 className="mt-8 md:mt-12 lg:mt-16 xl:mt-20 text-4xl md:text-6xl lg:text-8xl xl:text-8xl font-bold text-gray-200 tracking-widest select-none">
          QUALITY IS OUR RECIPE
        </h1>
      </div>
      <div
        className="relative w-full h-screen flex justify-center items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute rounded-full overflow-hidden shadow-2xl border-4 border-white hover:shadow-3xl cursor-pointer"
            style={getItemStyle(item.position)}
            onClick={() => {
              if (item.position !== "center" && !isAnimating) {
                if (item.position.includes("right")) {
                  handleRightClick();
                } else {
                  handleLeftClick();
                }
              }
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hover:bg-opacity-10 transition-all duration-300"></div>
          </div>
        ))}
        {centerItem && (
          <div className="absolute z-40 bg-white rounded-2xl p-6 md:p-8 xl:p-10 flex flex-col justify-center items-center text-center shadow-xl border-2 border-gray-100 top-[52%] md:top-[61%] lg:top-[55%] xl:top-[55%] left-1/2 w-[60%] md:w-[30%] lg:w-[30%] xl:w-[25%] max-w-[500px] min-h-[300px] md:h-[230px] lg:h-[40%] xl:h-[280px] transform -translate-x-1/2 transition-all duration-300">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-4">
              {centerItem.name}
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 italic leading-relaxed">
              "{centerItem.description}"
            </p>
          </div>
        )}
        <div className="absolute bottom-15 md:bottom-12 lg:bottom-16 xl:bottom-20 left-3 md:left-50 lg:left-70 xl:left-[480px] right-3 md:right-50 lg:right-70 xl:right-[480px] z-50 px-4">
          <button
            onClick={handleLeftClick}
            className="absolute bottom-0 left-0 bg-[#0079bf] text-white w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 2xl:w-15 2xl:h-15"
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
              className="w-6 h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8  2xl:w-6 2xl:h-7"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleRightClick}
            className="absolute bottom-0 right-0 bg-[#0079bf] text-white w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 2xl:w-15 2xl:h-15"
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
              className="w-6 h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-6 2xl:h-7"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .absolute.rounded-full {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}</style>
    </div>
  );
}
