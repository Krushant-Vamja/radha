"use client";

import { useEffect, useRef, useState } from "react";
import bookEventBg from "../assets/bookeventbg.svg"; // adjust path as needed
import bell from "../assets/bell.svg"; // adjust path as needed
import broccoli from "../assets/broccoli.svg"; // adjust path as needed
import roll from "../assets/roll.svg"; // adjust path as needed
import glass from "../assets/glass.svg"; // adjust path as needed
import leaf1 from "../assets/leaf1.svg"; // adjust path as needed
import star from "../assets/star.svg"; // adjust path as needed
import c1 from "../assets/c1.svg"; // adjust path as needed
import c2 from "../assets/c2.jpg"; // adjust path as needed
import c3 from "../assets/c3.jpg"; // adjust path as needed
import { X, ChevronDown } from "lucide-react";

const Community = () => {
  const slideContainerRef = useRef(null);
  const communitySliderRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);

  // Hindu community slides - This was missing in the original code
  const hinduCommunitySlides = [
    {
      image: c1,
      id: 1,
    },
    {
      image: c2,
      id: 2,
    },
    {
      image: c3,
      id: 3,
    },
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
      // rightSpacing: "right-10", // ✅ Custom spacing class
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
      // rightSpacing: "-right-20", // ✅ Tailwind spacing class
    },

    {
      id: 3,
      image: c3, // Using the same image, replace with different one if needed
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
      // rightSpacing: "right-10", // ✅ Custom spacing class
    },
  ];

  const [slides, setSlides] = useState([...hinduCommunitySlides]);
  const [communitySlides, setCommunitySlides] = useState([
    ...regularCommunitySlides,
    ...regularCommunitySlides,
  ]);

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

  // Animation for the circular text (right to left)
  useEffect(() => {
    const rotationElements = document.querySelectorAll(".circular-text");
    if (!rotationElements.length) return;

    let position = 0;
    const speed = 0.2; // Reduced speed for smoother animation
    let lastTimestamp = 0;

    const animate = (timestamp) => {
      // Calculate time difference to ensure consistent animation speed
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Only update position if enough time has passed (helps reduce jitter)
      if (delta > 0) {
        position += speed * (delta / 16); // Normalize to 60fps
      }

      rotationElements.forEach((element) => {
        // Use CSS transform with will-change for smoother animation
        element.style.transform = `rotate(${position}deg)`;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Improved infinite loop animation for the slides
  useEffect(() => {
    const slideContainer = slideContainerRef.current;
    if (!slideContainer) return;

    // Create a duplicate set of slides for seamless looping
    setSlides([...hinduCommunitySlides, ...hinduCommunitySlides]);

    let animationId;
    let position = 0;
    const speed = 0.5; // pixels per frame
    let lastTimestamp = 0;
    let slideWidth = 0;

    // Function to reset position when we've scrolled through the first set of slides
    const resetPositionIfNeeded = () => {
      if (position >= slideWidth * hinduCommunitySlides.length) {
        // When we've gone through all original slides, reset to beginning without animation
        position = 0;
        slideContainer.style.transition = "none";
        slideContainer.style.transform = `translateX(0px)`;

        // Force reflow to apply the change immediately
        slideContainer.offsetHeight;

        // Re-enable transition for the next movement
        slideContainer.style.transition = "transform 500ms linear";
      }
    };

    const animate = (timestamp) => {
      // Get the current slide width (may change on resize)
      const slides = slideContainer.querySelectorAll(".hindu-slide");
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;
      }

      // Calculate time difference to ensure consistent animation speed
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Only update position if enough time has passed
      if (delta > 0) {
        position += speed * (delta / 16); // Normalize to 60fps
      }

      // Apply the transform
      slideContainer.style.transform = `translateX(-${position}px)`;

      // Check if we need to reset position
      resetPositionIfNeeded();

      animationId = requestAnimationFrame(animate);
    };

    // Start with transition enabled
    slideContainer.style.transition = "transform 500ms linear";
    animationId = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      const slides = slideContainer.querySelectorAll(".hindu-slide");
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;

        // If we've already scrolled past the new width, reset
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
    const speed = 0.5; // pixels per frame - slower for smoother scrolling
    let lastTimestamp = 0;
    let slideWidth = 0;
    const slideCount = regularCommunitySlides.length;

    // Function to reset position when we've scrolled through the first set of slides
    const resetPositionIfNeeded = () => {
      if (position >= slideWidth * slideCount) {
        // When we've gone through all original slides, reset to beginning without animation
        position = 0;
        sliderContainer.style.transition = "none";
        sliderContainer.style.transform = `translateX(0px)`;

        // Force reflow to apply the change immediately
        sliderContainer.offsetHeight;

        // Re-enable transition for the next movement
        sliderContainer.style.transition = "transform 1000ms linear";
      }
    };

    const animate = (timestamp) => {
      // Get the current slide width (may change on resize)
      const slides = sliderContainer.querySelectorAll(".community-slide");
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;
      }

      // Calculate time difference to ensure consistent animation speed
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Only update position if enough time has passed
      if (delta > 0) {
        position += speed * (delta / 16); // Normalize to 60fps
      }

      // Apply the transform with cubic-bezier for smoother motion
      sliderContainer.style.transform = `translateX(-${position}px)`;

      // Check if we need to reset position
      resetPositionIfNeeded();

      animationId = requestAnimationFrame(animate);
    };

    // Start with transition enabled - longer duration for smoother appearance
    sliderContainer.style.transition = "transform 1000ms linear";
    animationId = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      const slides = sliderContainer.querySelectorAll(".community-slide");
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;

        // If we've already scrolled past the new width, reset
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

  // Handle popup visibility
  useEffect(() => {
    if (isPopupOpen) {
      setPopupVisible(true);
      setTimeout(() => setAnimatePopup(true), 0); // Trigger animation after popup is visible
    } else {
      setAnimatePopup(false);
      setTimeout(() => setPopupVisible(false), 500); // Matches animation duration
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
        <div
          className="w-full h-[400px] sm:h-[500px] md:h-[625px] bg-cover bg-center flex items-center justify-center text-center my-4"
          style={{
            backgroundImage: `url(${bookEventBg})`,
            backgroundRepeat: "no-repeat",
          }}
        >
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
              className="bg-[#0079bf] hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
              onClick={() => setIsPopupOpen(true)}
            >
              Book your Event
            </button>
          </div>
        </div>
      </div>

      {/* Community Special section */}
      <div className="md:mx-20 mx-5  py-12 relative">
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
        <div className="relative grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {communityCards.map((card, index) => (
            <div
              key={index}
              className="relative rounded-lg shadow-sm overflow-hidden z-10"
            >
              <div className="relative z-10 flex flex-col items-center justify-center text-center bg-white bg-opacity-90 p-4 rounded-lg">
                <div className="mb-4">
                  <span className="text-orange-400 ">
                    <img src={star} className="h-auto w-10 md:w-15" />
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-4">{card.name}</h3>
                <ul className="space-y-2">
                  {card.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-center text-gray-700"
                    >
                      {/* <span className="mr-2 text-gray-500">•</span> */}
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
      <div className="container mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Regular Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Serving diverse communities with customized catering experiences.
          </p>
        </div>

        {/* Hindu Community Slides - This section was missing in the render */}

        {/* Horizontal scrolling community slides */}
        <div className="max-w-6xl mx-auto">
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
                  {/* Left part - Image */}
                  <div className="w-full md:w-1/2">
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={`${slide.title} illustration`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right part - Content */}
                  <div
                    className="w-full md:w-1/2 flex flex-col h-full justify-center relative md:pl-20 px-6 py-16 overflow-hidden"
                    style={{ backgroundColor: slide.bgColor }}
                  >
                    {/* Low opacity header - Removed hidden class */}
                    <div
                      className={`absolute top-0 text-[70px] font-bold text-white opacity-10 select-none whitespace-nowrap hidden md:block `}
                    >
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

                    {/* Circular text with leaf */}
                    <div className="absolute bottom-0 right-0 w-25 h-25 md:w-50 md:h-50">
                      <div className="w-full h-full relative">
                        {/* Circular text - Animated - Fixed text content */}
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
                              style={{ fontSize: "10px", letterSpacing: "2px" }}
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
                        {/* Leaf image - Static */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={leaf1 || "/placeholder.svg"}
                            alt="Leaf"
                            className="w-15 h-15 md:w-34 md:h-34 object-contain"
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
          {/* Close Button - Separate blue square with X */}
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

          {/* Popup Form with animation */}
          <div
            className={`w-full h-100dvh max-w-md bg-white rounded-l-3xl shadow-xl transform transition-all duration-500 ease-in-out ${
              animatePopup
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            } relative`}
          >
            {/* Mobile Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors z-[60] md:hidden"
              onClick={() => setIsPopupOpen(false)}
            >
              <X size={24} />
            </button>
            {/* Form Content */}
            <div className="p-8 pt-12">
              <h2 className="text-3xl font-bold text-center text-[#101a24] mb-1">
                Get in Touch
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Get in Touch with Us
              </p>

              <form className="space-y-6">
                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Event Type Dropdown */}
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

                  {/* Dropdown Menu */}
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

                {/* Message Field */}
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

                {/* Submit Button */}
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
`}
      </style>
    </div>
  );
};

export default Community;
