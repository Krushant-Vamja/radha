"use client";

import { useEffect, useRef, useState } from "react";
import bookEventBg from "../assets/bookeventbg.jpg";
import bell from "../assets/bell.png";
import broccoli from "../assets/broccoli.png";
import roll from "../assets/roll.png";
import glass from "../assets/glass.png";
import leaf1 from "../assets/leaf1.svg";
import star from "../assets/star.svg";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import { X, ChevronDown } from "lucide-react";

const Community = () => {
  const slideContainerRef = useRef(null);
  const communitySliderRef = useRef(null);
  const cardScrollContainerRef = useRef(null); // Ref for communityCards scroll container
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  const [isTouching, setIsTouching] = useState(false);
  const animationFrameRef = useRef(null);

  // Hindu community slides
  const hinduCommunitySlides = [
    { image: c1, id: 1 },
    { image: c2, id: 2 },
    { image: c3, id: 3 },
  ];

  // Regular community content slides
  const regularCommunitySlides = [
    {
      id: 1,
      image: c1,
      title: "General Community",
      description:
        "Traditional vegetarian cuisine following Hindu dietary principles.",
      items: [
        "Pure vegetarian options",
        "Festival special menus",
        "Traditional thalis",
        "Customized prasad items",
      ],
      bgColor: "#0079BF",
      headerText: "HINDU COMM",
    },
    {
      id: 2,
      image: c2,
      title: "Vegetarian Delights",
      description:
        "Exquisite plant-based cuisine for health-conscious individuals.",
      items: [
        "Organic ingredients",
        "Seasonal specialties",
        "Nutritionally balanced",
        "Innovative recipes",
      ],
      bgColor: "#0079BF",
      headerText: "GENERAL COMM",
    },
    {
      id: 3,
      image: c3,
      title: "Global Flavors",
      description: "Professional catering solutions for business events.",
      items: [
        "Business lunch options",
        "Conference packages",
        "Team celebration menus",
        "Bulk ordering available",
      ],
      bgColor: "#0079BF",
      headerText: "CORPORATE COMM",
    },
  ];

  // Community cards data
  const communityCards = [
    {
      name: "Jain Community",
      icon: "⭐",
      items: [
        "No Onion No Garlic",
        "Jain Thali",
        "Jain Farsan",
        "Without tuber",
      ],
    },
    {
      name: "Swaminarayan",
      icon: "⭐",
      items: [
        "No Onion No Garlic",
        "Satvik Bhojan",
        "Fasting Specials",
        "Farsan Items",
      ],
    },
    {
      name: "Vaishnav",
      icon: "⭐",
      items: ["56 Bhog", "Festival Meals", "Fasting Specials", "Special Thali"],
    },
    {
      name: "Brahmin",
      icon: "⭐",
      items: [
        "Satvik Thali",
        "Prasad Items",
        "Festival Specials",
        "Puja Items",
      ],
    },
  ];

  const [slides, setSlides] = useState([...hinduCommunitySlides]);
  const [communitySlides, setCommunitySlides] = useState([
    ...regularCommunitySlides,
    ...regularCommunitySlides,
  ]);

  // Animation for the circular text
  useEffect(() => {
    const rotationElements = document.querySelectorAll(".circular-text");
    if (!rotationElements.length) return;

    let position = 0;
    const speed = 0.2;
    let lastTimestamp = 0;

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (delta > 0) {
        position += speed * (delta / 16);
      }

      rotationElements.forEach((element) => {
        element.style.transform = `rotate(${position}deg)`;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Infinite loop animation for hindu community slides
  useEffect(() => {
    const slideContainer = slideContainerRef.current;
    if (!slideContainer) return;

    setSlides([...hinduCommunitySlides, ...hinduCommunitySlides]);

    let animationId;
    let position = 0;
    const speed = 0.5;
    let lastTimestamp = 0;
    let slideWidth = 0;

    const resetPositionIfNeeded = () => {
      if (position >= slideWidth * hinduCommunitySlides.length) {
        position = 0;
        slideContainer.style.transition = "none";
        slideContainer.style.transform = `translateX(0px)`;
        slideContainer.offsetHeight;
        slideContainer.style.transition = "transform 500ms linear";
      }
    };

    const animate = (timestamp) => {
      const slides = slideContainer.querySelectorAll(".hindu-slide");
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;
      }

      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (delta > 0) {
        position += speed * (delta / 16);
      }

      slideContainer.style.transform = `translateX(-${position}px)`;
      resetPositionIfNeeded();

      animationId = requestAnimationFrame(animate);
    };

    slideContainer.style.transition = "transform 500ms linear";
    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      const slides = slideContainer.querySelectorAll(".hindu-slide");
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;
        if (position >= slideWidth * hinduCommunitySlides.length) {
          position = 0;
          slideContainer.style.transform = `translateX(0px)`;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Smooth infinite scroll for community slides
  useEffect(() => {
    const sliderContainer = communitySliderRef.current;
    if (!sliderContainer) return;

    let animationId;
    let position = 0;
    const speed = 0.5;
    let lastTimestamp = 0;
    let slideWidth = 0;
    const slideCount = regularCommunitySlides.length;

    const resetPositionIfNeeded = () => {
      if (position >= slideWidth * slideCount) {
        position = 0;
        sliderContainer.style.transition = "none";
        sliderContainer.style.transform = `translateX(0px)`;
        sliderContainer.offsetHeight;
        sliderContainer.style.transition = "transform 1000ms linear";
      }
    };

    const animate = (timestamp) => {
      const slides = sliderContainer.querySelectorAll(".community-slide");
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;
      }

      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (delta > 0) {
        position += speed * (delta / 16);
      }

      sliderContainer.style.transform = `translateX(-${position}px)`;
      resetPositionIfNeeded();

      animationId = requestAnimationFrame(animate);
    };

    sliderContainer.style.transition = "transform 1000ms linear";
    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      const slides = sliderContainer.querySelectorAll(".community-slide");
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;
        if (position >= slideWidth * slideCount) {
          position = 0;
          sliderContainer.style.transform = `translateX(0px)`;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Auto-scroll for communityCards on mobile
  useEffect(() => {
    if (!isMobile || isTouching) return;

    const scrollContainer = cardScrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 2; // Half because of cloned items
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 1; // Adjust speed as needed
      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0;
        scrollContainer.scrollLeft = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, isTouching]);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle popup visibility
  useEffect(() => {
    if (isPopupOpen) {
      setPopupVisible(true);
      setTimeout(() => setAnimatePopup(true), 0);
    } else {
      setAnimatePopup(false);
      setTimeout(() => setPopupVisible(false), 500);
    }
  }, [isPopupOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTouchStart = () => {
    setIsTouching(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  // Event types
  const eventTypes = ["Wedding", "Corporate Event", "Birthday Party", "Other"];

  // Handle event type selection
  const handleEventTypeSelect = (type) => {
    setEventType(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Top section with wavy border background image */}
      <div className="relative">
        <div className="w-full h-[400px] sm:h-[500px] md:h-[625px] xl:w-[1200px] 2xl:w-[2560px] bg-cover bg-center flex items-center justify-center text-center my-4">
          <img
            src={bookEventBg}
            alt=""
            className="absolute top-0 left-0 h-[400px] sm:h-[500px] md:h-[625px] 2xl:w-[2560px] xl:h-full object-cover lg:object-contain"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <img
                src={bell || "/placeholder.svg"}
                alt="Catering Icon"
                className="w-40 h-40 custom-float"
                style={{
                  filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.7))",
                }}
              />
            </div>
            <h2 className="text-white text-3xl font-bold mb-6 tracking-wider text-center">
              BOOK CATERING NOW
            </h2>
            <button
              className="bg-[#0079bf] hover:bg-blue-700 text-white px-6 py-2 rounded [border-top-left-radius:20px] [border-top-right-radius:5px] [border-bottom-left-radius:5px] [border-bottom-right-radius:20px] transition-colors"
              onClick={() => setIsPopupOpen(true)}
            >
              Book your Event
            </button>
          </div>
        </div>
      </div>

      {/* Community Special section */}
      <div className="md:mx-20 mx-5 py-12 relative">
        <img
          src={broccoli || "/placeholder.svg"}
          alt="Broccoli"
          className="hidden md:block absolute left-60 bottom-94 w-24 md:w-32 opacity-90 transform rotate-180 custom-float"
          style={{ zIndex: 10 }}
        />
        <img
          src={roll || "/placeholder.svg"}
          alt="Roll"
          className="hidden md:block absolute left-330 bottom-80 w-24 md:w-32 opacity-90"
        />
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Community Special
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Specialized catering services respecting community traditions and
            customs.
          </p>
        </div>
        <div
          ref={cardScrollContainerRef}
          className={`relative ${
            isMobile
              ? "flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          }`}
          style={
            isMobile ? { scrollBehavior: "smooth", whiteSpace: "nowrap" } : {}
          }
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          {/* Original Cards */}
          {communityCards.map((card, index) => (
            <div
              key={`original-${index}`}
              className={`relative rounded-lg shadow-sm overflow-hidden z-10 ${
                isMobile
                  ? "inline-block snap-center mx-2 w-64 flex-shrink-0 m-2"
                  : ""
              }`}
            >
              <div className="relative z-10 flex flex-col items-center justify-center text-center bg-white bg-opacity-90 p-4 rounded-lg">
                <div className="mb-4">
                  <span className="text-orange-400">
                    <img
                      src={star}
                      alt="Star"
                      className="h-auto w-10 md:w-15"
                    />
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-4">{card.name}</h3>
                <ul className="space-y-2">
                  {card.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-center text-gray-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {/* Cloned Cards for Seamless Loop (Mobile Only) */}
          {isMobile &&
            communityCards.map((card, index) => (
              <div
                key={`clone-${index}`}
                className="relative rounded-lg shadow-sm overflow-hidden z-10 inline-block snap-center mx-2 w-64 flex-shrink-0"
              >
                <div className="relative z-10 flex flex-col items-center justify-center text-center bg-white bg-opacity-90 p-4 rounded-lg">
                  <div className="mb-4">
                    <span className="text-orange-400">
                      <img
                        src={star}
                        alt="Star"
                        className="h-auto w-10 md:w-15"
                      />
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-4">{card.name}</h3>
                  <ul className="space-y-2">
                    {card.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-center text-gray-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          <img
            src={glass || "/placeholder.svg"}
            alt="Juice"
            className="hidden md:block absolute left-310 top-18 w-32 md:w-70"
          />
        </div>
      </div>

      {/* Regular Community section */}
      <div className="w-full mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Regular Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Serving diverse communities with customized catering experiences.
          </p>
        </div>

        {/* Horizontal scrolling community slides */}
        <div className="w-full overflow-hidden">
          <div className="relative">
            <div
              ref={communitySliderRef}
              className="flex"
              style={{ willChange: "transform" }}
            >
              {communitySlides.map((slide, index) => (
                <div
                  key={`community-slide-${slide.id}-${index}`}
                  className="community-slide flex-shrink-0 w-full flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-1/2">
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={`${slide.title} illustration`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="w-full md:w-1/2 flex flex-col h-full justify-center relative md:pl-5 lg:pl-10 2xl:pl-20 px-6 py-16 overflow-hidden"
                    style={{ backgroundColor: slide.bgColor }}
                  >
                    <div className="absolute top-0 text-[100px] md:text-[50px] xl:text-[90px] 2xl:text-[140px] font-bold text-white opacity-10 select-none whitespace-nowrap hidden md:block">
                      {slide.headerText}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      {slide.title}
                    </h2>
                    <p className="text-white mb-6">{slide.description}</p>
                    <ul className="space-y-4 text-white">
                      {slide.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="absolute bottom-0 right-0 w-30 h-30 md:w-25 md:h-25">
                      <div className="w-full h-full relative">
                        <div
                          className="w-full h-full absolute inset-0 circular-text"
                          style={{ willChange: "transform" }}
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path
                              id={`circular-path-${index}`}
                              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                              fill="transparent"
                            />
                            <text
                              width="100%"
                              className="text-white font-semibold"
                              style={{ fontSize: "12px", letterSpacing: "2px" }}
                            >
                              <textPath
                                xlinkHref={`#circular-path-${index}`}
                                startOffset="0%"
                              >
                                INSPIRATION IN EVERY BITES • INSPIRATION IN
                                EVERY BITES •
                              </textPath>
                            </text>
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={leaf1 || "/placeholder.svg"}
                            alt="Leaf"
                            className="w-20 h-20 md:w-15 md:h-15 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roll image with low opacity */}
      <img
        src="/roll-food.png"
        alt="Roll"
        className="absolute -bottom-10 -left-10 w-40 opacity-20 rotate-12"
      />

      {/* Popup Overlay */}
      {(isPopupOpen || popupVisible) && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsPopupOpen(false);
            }
          }}
        >
          <button
            className={`hidden md:block absolute top-[300px] left-254 bg-[#0079bf] text-white p-4 rounded-l-md hover:bg-[#0079bf]/90 transition-all duration-500 ease-in-out z-[60] ${
              animatePopup
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
            onClick={() => setIsPopupOpen(false)}
          >
            <X size={24} />
          </button>
          <div
            className={`w-full h-100dvh max-w-md bg-white rounded-l-3xl shadow-xl transform transition-all duration-500 ease-in-out ${
              animatePopup
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            } relative`}
          >
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors z-[60] md:hidden"
              onClick={() => setIsPopupOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="p-8 pt-12">
              <h2 className="text-3xl font-bold text-center text-[#101a24] mb-1">
                Get in Touch
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Get in Touch with Us
              </p>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-500 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 rounded-[20px] bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#0079bf]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded-[20px] bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#0079bf]"
                  />
                </div>
                <div className="relative" ref={dropdownRef}>
                  <label
                    htmlFor="eventType"
                    className="block text-sm font-medium text-gray-500 mb-1"
                  >
                    Event Type
                  </label>
                  <div
                    className="w-full p-3 rounded-[20px] bg-[#E0E0E0] flex justify-between items-center cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span
                      className={eventType ? "text-gray-900" : "text-gray-500"}
                    >
                      {eventType || "Select event type"}
                    </span>
                    <ChevronDown size={20} className="text-gray-500" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 rounded-[20px] bg-[#E0E0E0] shadow-lg">
                      <div
                        className="p-3 cursor-pointer flex items-center"
                        onClick={() => handleEventTypeSelect("Wedding")}
                      >
                        Wedding
                        <div className="ml-2 w-4 h-4 rounded-[20px] bg-[#E0E0E0]"></div>
                      </div>
                      <div
                        className="p-3 cursor-pointer"
                        onClick={() => handleEventTypeSelect("Corporate Event")}
                      >
                        Corporate Event
                      </div>
                      <div
                        className="p-3 cursor-pointer"
                        onClick={() => handleEventTypeSelect("Birthday Party")}
                      >
                        Birthday Party
                      </div>
                      <div
                        className="p-3 cursor-pointer"
                        onClick={() => handleEventTypeSelect("Other")}
                      >
                        Other
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-500 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 rounded-[20px] bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#0079bf] resize-none"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full py-3 bg-[#0079bf] text-white font-medium rounded-[20px] hover:bg-[#0079bf]/90 transition-colors uppercase tracking-wide"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
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
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Community;
