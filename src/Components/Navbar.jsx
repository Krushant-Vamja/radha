"use client";

import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import leaf from "../assets/leaf.svg";
import { X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);
  const [eventType, setEventType] = useState("");
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = ["Home", "Menu", "Service", "Gallery", "Review", "Contact"];
  const eventTypes = ["Wedding", "Corporate Event", "Birthday Party", "Other"];

  // Handle event type selection
  const handleEventTypeSelect = (type) => {
    setEventType(type);
    setIsDropdownOpen(false);
  };

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

  // Handle route and section changes
  useEffect(() => {
    const path = location.pathname;
    const matchedLink = navLinks.find(
      (link) =>
        path === `/${link.toLowerCase()}` || (path === "/" && link === "Home")
    );
    setActiveLink(matchedLink || "Home");

    const handleScroll = () => {
      const sections = navLinks.map((link) =>
        document.getElementById(link.toLowerCase())
      );
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let visibleSection = matchedLink || "Home";
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            visibleSection = navLinks[index];
          }
        }
      });

      setActiveLink(visibleSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, navLinks]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMobileMenuOpen(false);

    if (link === "Review") {
      navigate("/review");
    } else {
      navigate("/");
      setTimeout(() => {
        const delayedSection = document.getElementById(link.toLowerCase());
        if (delayedSection) {
          delayedSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <>
      <nav className="relative bg-transparent bg-gradient-to-r from-white/30 via-blue-100/30 to-white/30 py-2 px-6 shadow-4xl z-50 w-full top-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            {/* Logo on the left */}
            <Link
              to="/"
              onClick={() => handleLinkClick("Home")}
              className="flex-shrink-0"
            >
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation and Book Now Button */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6">
                {navLinks.map((link) => (
                  <div key={link} className="relative group">
                    <button
                      onClick={() => handleLinkClick(link)}
                      className={`${
                        activeLink === link ? "text-black" : "text-gray-600"
                      } hover:text-black transition-colors duration-200 uppercase text-sm font-medium`}
                    >
                      {link}
                    </button>
                    {/* Preserved active leaf code */}
                    {/* {activeLink === link && (
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <img src={leaf} alt="Leaf" className="w-6 h-6" />
                      </div>
                    )} */}
                    {/* Hover leaf effect */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <img src={leaf} alt="Leaf" className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Book Now Button (Desktop) */}
              <div style={{ fontFamily: "David Libre" }}>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="bg-[#0079bf] text-white xl:px-5 px-3 py-2 rounded-full shadow-xl transition-all duration-200 [border-top-left-radius:20px] [border-top-right-radius:5px] [border-bottom-left-radius:5px] [border-bottom-right-radius:20px] text-sm font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full z-40 bg-white/80 backdrop-blur-md py-4 rounded-b-lg shadow-lg md:hidden">
              <div className="flex flex-col space-y-4 px-4">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => handleLinkClick(link)}
                    className={`flex items-center ${
                      activeLink === link
                        ? "text-black font-semibold"
                        : "text-gray-600"
                    } hover:text-black transition-colors duration-200 py-2 uppercase text-sm font-medium`}
                  >
                    {activeLink === link && (
                      <img src={leaf} alt="Leaf" className="w-6 h-6 mr-2" />
                    )}
                    {link}
                  </button>
                ))}
                <button
                  style={{ fontFamily: "David Libre" }}
                  onClick={() => setIsPopupOpen(true)}
                  className="bg-[#0079bf] font-libre text-white px-6 py-3 rounded-[20px] shadow-xl transition-all duration-200 text-center mt-4 text-sm font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

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
          {/* <button
            className={`hidden md:block absolute top-[300px] left-254 bg-[#0079bf] text-white p-4 rounded-l-md hover:bg-[#0079bf]/90 transition-all duration-500 ease-in-out z-[60] ${
              animatePopup
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
            onClick={() => setIsPopupOpen(false)}
          >
            <X size={24} />
          </button> */}

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
            <div className="p-8">
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
                      {eventTypes.map((type) => (
                        <div
                          key={type}
                          className="p-3 cursor-pointer flex items-center"
                          onClick={() => handleEventTypeSelect(type)}
                        >
                          {type}
                          {type === "Wedding" && (
                            <div className="ml-2 w-4 h-4 rounded-[20px] bg-[#E0E0E0]"></div>
                          )}
                        </div>
                      ))}
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
    </>
  );
};

export default Navbar;
