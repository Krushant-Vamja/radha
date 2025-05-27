import { useState, useEffect, useRef } from "react";
import herobg from "../assets/herobg.jpg";
import mainimg from "../assets/mainimg.png";
import rotateingimg from "../assets/rotateingimg.png";
import rightbottomleaf from "../assets/rightbottomleaf.svg";
import mint from "../assets/mint.png";
import lefttopleaf from "../assets/lefttopleaf.png";
import pizza from "../assets/pizza.png";
import happy from "../assets/happy.png";
import comment from "../assets/comment.png";
import noodles from "../assets/noodles.png";
import salad from "../assets/salad.png";
import sauce from "../assets/sauce.png";
import meal from "../assets/meal.png";
import centerleaf from "../assets/centerleaf.png";
import tleaf from "../assets/tleaf.png";
import blackpaper from "../assets/blackpaper.png";
import { X, ChevronDown } from "lucide-react";

const Hero = () => {
  // Animation for rotating image
  useEffect(() => {
    const rotatingImg = document.getElementById("rotatingImg");
    let rotation = 0;

    const rotateImage = () => {
      rotation += 0.05; // Slower rotation speed
      if (rotatingImg) {
        rotatingImg.style.transform = `rotate(${rotation}deg)`;
      }
      requestAnimationFrame(rotateImage);
    };

    rotateImage();
  }, []);

  // State for popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);

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
    <section id="home">
      <div
        className="w-full overflow-hidden object-left"
        style={{
          backgroundImage: `url(${herobg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="hidden md:block absolute -top-80 left-1/2 transform -translate-x-1/2 w-24 xs:w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-120 h-24 xs:h-28 sm:h-32 md:h-40 lg:h-48 xl:h-56 2xl:h-120 rounded-full z-20"
          style={{
            backgroundImage: `radial-gradient(
      circle at center, 
      rgba(0, 121, 191, 0.5) 0%, 
      rgba(0, 121, 191, 0) 100%
    )`,
            filter: "blur(100px)", // Adjust the blur radius as needed (e.g., 10px)
          }}
        ></div>
        {/* Background decorative elements */}
        <div className="hidden md:block inset-0 z-0 overflow-hidden">
          <div className="hidden md:block absolute md:text-[50px] lg:text-[80px] xl:text-[100px] 2xl:text-[120px] font-bold text-transparent bg-gradient-to-r from-black/20 md:top-13 lg:top-20 xl:top-60 2xl:top-30 left-10 sm:left-20 md:left-30 lg:left-40 xl:left-48 2xl:left-56 overflow-hidden bg-clip-text">
            CATERING
          </div>

          <img
            src={mint || "/placeholder.svg"}
            alt="Decorative mint"
            className="absolute -bottom-48 sm:-bottom-56 md:bottom-42 lg:bottom-10 xl:-bottom-96 2xl:-bottom-45 -left-1 w-[20%] sm:w-[18%] md:w-[13%] lg:w-[12%] xl:w-[10%] 2xl:w-[8%] object-contain z-10 custom-float"
          />
          <img
            src={lefttopleaf || "/placeholder.svg"}
            alt="Decorative leaf"
            className="absolute top-5 sm:top-8 md:top-10 lg:top-12 xl:top-14 2xl:top-10 -left-6 sm:-left-8 md:-left-5 lg:-left-4 xl:-left-14 2xl:-left-7 w-[15%] sm:w-[12%] md:w-[10%] lg:w-[8%] xl:w-[7%] 2xl:w-35 object-contain z-0 custom-float"
          />
          {/* <img
            src={rightbottomleaf || "/placeholder.svg"}
            alt="Decorative leaf"
            className="absolute top-5 sm:top-8 md:top-10 lg:top-12 xl:top-14 2xl:top-150 -right-6 sm:-right-8 md:-right-10 lg:-right-12 xl:-right-14 2xl:-right-7 w-[15%] sm:w-[12%] md:w-[10%] lg:w-[8%] xl:w-[7%] 2xl:w-35 object-contain z-0 custom-float overflow-hidden"
          /> */}
          <img
            src={tleaf || "/placeholder.svg"}
            alt="Decorative leaf"
            className="absolute top-48 sm:top-64 md:top-40 lg:top-50 xl:top-112 2xl:top-80 left-2 sm:left-3 md:left-4 lg:left-10 xl:left-6 2xl:left-10 w-[15%] sm:w-[12%] md:w-[10%] lg:w-[8%] xl:w-[7%] 2xl:w-30 object-contain z-0 custom-float"
          />
          <img
            src={centerleaf || "/placeholder.svg"}
            alt="Decorative leaf"
            className="absolute -bottom-10 sm:-bottom-12 md:bottom-76 lg:bottom-50 xl:-bottom-24 2xl:bottom-15 left-28 sm:left-80 md:left-80 lg:left-110 xl:left-130 2xl:left-150 w-[10%] sm:w-[8%] md:w-[12%] lg:w-[10%] xl:w-[5%] 2xl:w-45 object-contain z-10 custom-float"
          />
        </div>
        {/* Main content container */}
        <div className="container mx-auto py-5 relative z-10 h-full flex items-center">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 w-full">
            {/* Left side - Text content */}
            <div className="w-full md:w-1/2 pt-4 sm:pt-5 md:pt-0 pl-4 sm:pl-10 md:pl-20 lg:pl-24 xl:pl-27 2xl:pl-30 sm:px-5 pb-4 sm:pb-5 md:pb-4">
              <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-[42px] xl:text-7xl 2xl:text-[64px] font-bold text-[#101a24] leading-tight">
                We provide the best Service for you
              </h1>
              <p className="mt-2 lg:mt-7 xl:mt-8 2xl:mt-9 text-sm sm:text-base md:text-[14px] lg:text-[16px] xl:text-2xl 2xl:text-[22px] text-[#6b6b6b] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                Experience the rich flavors of authentic Indian cuisine, crafted
                with premium ingredients and served with unmatched hospitality.
              </p>
              <div
                style={{ fontFamily: "David Libre" }}
                className="mt-6 sm:mt-7 md:mt-7 lg:mt-9 xl:mt-10 2xl:mt-10 flex gap-3 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-5"
              >
                <button className="px-6 sm:px-7 md:px-6 lg:px-9 xl:px-10 py-3 sm:py-2.5 md:py-2 lg:py-3.5 bg-[#101a24] text-white font-medium [border-top-left-radius:20px] [border-top-right-radius:5px] [border-bottom-left-radius:5px] [border-bottom-right-radius:20px] hover:bg-[#101a24]/90 transition-colors text-sm sm:text-base md:text-sm lg:text-lg xl:text-xl 2xl:text-[20px] shadow-md">
                  Menu
                </button>
                <button
                  className="px-6 sm:px-7 md:px-4 lg:px-9 xl:px-10 py-2 sm:py-2.5 md:py-2 lg:py-3.5 bg-[#0079bf] text-white font-medium [border-top-left-radius:20px] [border-top-right-radius:5px] [border-bottom-left-radius:5px] [border-bottom-right-radius:20px] hover:bg-[#0079bf]/90 transition-colors text-sm sm:text-base md:text-sm lg:text-lg xl:text-xl 2xl:text-[20px] shadow-md"
                  onClick={() => setIsPopupOpen(true)}
                >
                  Book your Event
                </button>
              </div>
            </div>

            {/* Right side - Food images */}
            <div className="w-full md:w-1/2 relative flex justify-center items-center">
              {/* Container for layering images */}
              <div className="relative w-full flex justify-center items-center">
                {/* Rotating background image */}

                <div className="relative w-[90%] sm:w-[80%] md:w-[85%] lg:w-[90%] xl:w-[95%] 2xl:w-[700px] z-10">
                  <img
                    id="rotatingImg"
                    src={rotateingimg || "/placeholder.svg"}
                    alt="Rotating"
                    className="absolute z-90 w-[52%] sm:w-[48%] sm:left-20 sm:bottom-20 bottom-15 left-15 md:w-[50%] md:left-15 md:bottom-15 lg:w-[52%] lg:bottom-23 lg:left-22 xl:w-[55%] xl:left-29 xl:bottom-30 2xl:w-[58%] 2xl:left-40 2xl:bottom-40"
                  />

                  {/* Main food platter */}
                  <img
                    src={mainimg || "/placeholder.svg"}
                    alt="Indian Food Platter"
                    className="relative w-[90%] sm:w-[80%] md:w-[85%] lg:w-[90%] xl:w-[95%] 2xl:w-[700px] z-10"
                  />
                </div>

                {/* Pizza card */}
                <div className="absolute top-25 sm:top-24 md:top-33 lg:top-45 xl:top-32 2xl:top-70 left-2 sm:left-8 md:left-10 lg:left-6 xl:left-16 2xl:left-10 z-30 custom-float">
                  <img
                    src={pizza || "/placeholder.svg"}
                    alt="Pizza"
                    className="w-30 sm:w-28 md:w-25 lg:w-36 xl:w-40 2xl:w-48"
                  />
                </div>

                {/* Happy customer review */}
                <div className="absolute -right-1 sm:right-2 md:right-4 lg:right-6 xl:right-8 2xl:right-5 z-40 custom-float">
                  <img
                    src={happy || "/placeholder.svg"}
                    alt="Happy Customer"
                    className="w-32 sm:w-28 md:w-25 lg:w-36 xl:w-40 2xl:w-48"
                  />
                </div>

                {/* Comment bubble */}
                <div className="absolute bottom-20 sm:bottom-16 md:bottom-16 lg:bottom-20 xl:bottom-24 2xl:bottom-35 right-52 sm:right-12 md:right-54 lg:right-65 xl:right-20 2xl:right-100 z-30 custom-float">
                  <img
                    src={comment || "/placeholder.svg"}
                    alt="Comment"
                    className="w-35 sm:w-28 md:w-25 lg:w-36 xl:w-40 2xl:w-40"
                  />
                </div>

                {/* Additional food items positioned precisely */}
                <img
                  src={noodles || "/placeholder.svg"}
                  alt="Noodles"
                  className="absolute bottom-10 sm:bottom-12 md:bottom-0 md:right-67 lg:bottom-2 lg:right-88 xl:bottom-18 2xl:bottom-5 2xl:left-2 w-16 sm:w-20 md:w-30 lg:w-34 xl:w-32 2xl:w-50 hidden md:block animate-slide-up"
                />
                <img
                  src={salad || "/placeholder.svg"}
                  alt="Salad Bowl"
                  className="absolute -bottom-16 sm:-bottom-20 md:-bottom-6 lg:-bottom-8 xl:-bottom-30 2xl:-bottom-8 right-40 sm:right-44 md:right-20 lg:right-30 xl:right-56 2xl:right-45 w-14 sm:w-16 md:w-18 lg:w-24 xl:w-24 2xl:w-35 z-30 hidden md:block animate-slide-up"
                />
                <img
                  src={sauce || "/placeholder.svg"}
                  alt="Sauce"
                  className="absolute bottom-16 sm:bottom-18 md:bottom-7 lg:bottom-10 xl:bottom-24 2xl:bottom-20 right-20 sm:right-24 md:right-47 lg:right-56 xl:right-36 2xl:right-90 w-12 sm:w-14 md:w-15 lg:w-18 xl:w-20 2xl:w-24 z-10 hidden md:block animate-slide-up"
                />
                <img
                  src={meal || "/placeholder.svg"}
                  alt="Meal"
                  className="absolute bottom-16 sm:bottom-20 md:bottom-11 lg:bottom-12 lg:-right-2 xl:bottom-30 2xl:bottom-25 right-0 w-16 sm:w-18 md:w-17 lg:w-24 xl:w-28 2xl:w-32 z-30 hidden md:block animate-slide-up"
                />
                <img
                  src={blackpaper || "/placeholder.svg"}
                  alt="Black Pepper"
                  className="absolute top-5 sm:top-6 md:top-7 lg:top-10 xl:top-9 2xl:top-10 right-10 sm:right-12 md:right-14 lg:right-16 xl:right-20 2xl:right-24 w-16 sm:w-20 md:w-35 lg:w-48 xl:w-32 2xl:w-80 hidden md:block animate-slide-down"
                />
              </div>
            </div>
          </div>
        </div>
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
                        className={
                          eventType ? "text-gray-900" : "text-gray-500"
                        }
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
                          onClick={() =>
                            handleEventTypeSelect("Corporate Event")
                          }
                        >
                          Corporate Event
                        </div>
                        <div
                          className="p-3 cursor-pointer"
                          onClick={() =>
                            handleEventTypeSelect("Birthday Party")
                          }
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

  @keyframes slide-up {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .custom-float {
    animation: float-diagonal 3s ease-in-out infinite;
  }

  .animate-slide-up {
    animation: slide-up 1s ease-out forwards;
  }

  .animate-slide-down {
    animation: slide-down 1s ease-out forwards;
  }
`}
        </style>
      </div>
    </section>
  );
};

export default Hero;
