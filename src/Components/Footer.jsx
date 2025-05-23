"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Send } from "lucide-react";
import { Link } from "react-router-dom";

import f1 from "../assets/f1.svg";
import f2 from "../assets/f2.svg";
import f3 from "../assets/f3.svg";
import f4 from "../assets/f4.svg";
import f5 from "../assets/f5.svg";
import f6 from "../assets/f6.svg";
import contactusbg from "../assets/contactusbg.svg";
import logo from "../assets/logo.svg";
import ice from "../assets/ice.svg";
import fleaf from "../assets/fleaf.png";
import fleaf1 from "../assets/fleaf1.png";
import fb from "../assets/fb.svg";
import insta from "../assets/insta.svg";
import whats from "../assets/whats.svg";
import yt from "../assets/yt.svg";
import linkedin from "../assets/linkedin.svg";

// ✅ ScrollToTopButton component with scroll visibility
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); // only visible after scrolling down
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed hidden md:block bottom-26 right-24 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [activeLink, setActiveLink] = useState("Home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    const section = document.querySelector(`#${link.toLowerCase()}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank you for contacting us! We'll reach out to ${contactEmail} soon.`
    );
    setContactEmail("");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  const images = [f1, f2, f3, f4, f5, f6];
  const navLinks = ["Home", "Service", "Menu", "Gallery"];

  return (
    <section id="contact">
      <footer className="relative w-full">
        {/* Contact Us Card */}
        <div className="relative mx-auto h-[240px] md:max-w-5xl -mt-20 px-4 z-10 top-25">
          <div className="rounded-[30px] overflow-hidden shadow-lg h-[290px]">
            <div className="relative">
              <div className="absolute inset-0 bg-black/50"></div>
              <img
                src={contactusbg}
                alt="Contact Us Background"
                className="w-full h-74 object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
                <p className="text-center mb-5 text-sm md:text-base max-w-2xl">
                  Contact us for all types of functions including Engagement,
                  Wedding, Birthday, Anniversary, House Warming and all
                  occasions.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-3xl mx-auto flex items-center bg-white rounded-full shadow-md overflow-hidden px-2"
                >
                  <input
                    type="email"
                    placeholder="Enter your Email Here"
                    className="flex-grow min-w-0 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 bg-white focus:outline-none"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 my-2 rounded-full shadow-md transition-all duration-200"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="pt-0 pb-0">
          <div className="bg-white pt-4 pb-12">
            <div className="container mx-auto px-4">
              {/* Render ScrollToTopButton */}
              <ScrollToTopButton />
              <div className="bottom-0 right-0 w-28 h-28 overflow-hidden">
                <img
                  src={ice}
                  alt="Decorative leaves bottom right"
                  className="hidden md:block absolute bottom-116 right-340 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Lower section */}
          <div className="relative bg-blue-50 pt-12 pb-0">
            <div className="absolute bottom-0 right-0 w-48 h-48 overflow-hidden">
              <img
                src={fleaf}
                alt="Decorative leaves bottom right"
                className="hidden md:block absolute bottom-0 -right-10 w-full h-full object-contain custom-float"
              />
            </div>
            <div className="absolute bottom-25 right-350 w-35 h-40 overflow-hidden">
              <img
                src={fleaf1}
                alt="Decorative leaves bottom right"
                className="hidden md:block absolute bottom-0 right-0 w-full h-full object-contain custom-float"
              />
            </div>
            <div className="container md:mx-auto md:px-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-6">
                <div className="lg:col-span-1">
                  <div className="flex items-start mb-4">
                    <div>
                      <Link to="/">
                        <img
                          src={logo}
                          alt="Radha Caterers Logo"
                          className="h-10 w-auto mb-2"
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                        />
                      </Link>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    India's premier catering service with over 1000 successful
                    events.
                  </p>
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex w-[200px]"
                  >
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="flex-grow border border-gray-300 rounded-l py-2 px-3 text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white p-2 rounded-r"
                      aria-label="Subscribe"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>

                {/* Column 2: Quick Links */}
                <div className="lg:col-span-1 md:pl-10">
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link}>
                        <a
                          href={`#${link.toLowerCase()}`}
                          className={`${
                            activeLink === link
                              ? "text-black font-semibold"
                              : "text-gray-600"
                          } hover:text-black transition-colors duration-200`}
                          onClick={() => handleLinkClick(link)}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Services */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-bold mb-4">Services</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#wedding"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        Wedding Catering
                      </a>
                    </li>
                    <li>
                      <a
                        href="#corporate"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        Corporate Events
                      </a>
                    </li>
                    <li>
                      <a
                        href="#birthday"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        Birthday Parties
                      </a>
                    </li>
                    <li>
                      <a
                        href="#social"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        Social Gatherings
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Contact */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-bold mb-4">Contact us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5.5 w-5.5 text-gray-600 absolute top-1 left-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <a
                        href="https://maps.app.goo.gl/jgYbxgeRZgX7f2g27?g_st=awb"
                        className="text-gray-600 pl-7"
                      >
                        Radha Caterers, second floor, Krishna Row House, Parvati
                        Nagar, Nana Varachha, Surat, Gujarat 395006.
                      </a>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href="mailto:radha.caterers2016@Gmail.com"
                        className="text-gray-600"
                      >
                        radha.caterers2016@Gmail.com
                      </a>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a href="tel:09913244456" className="text-gray-600">
                        099132 44456
                      </a>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a href="tel:08000396216" className="text-gray-600">
                        080003 96216
                      </a>
                    </li>
                    <div className="flex space-x-3 mt-4">
                      <a
                        href="https://www.facebook.com/share/152mhTmhqgB/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        aria-label="Facebook"
                      >
                        <img src={fb} className="size-4" alt="Facebook icon" />
                      </a>
                      <a
                        href="https://www.instagram.com/radhacaterers?igsh=MXc0bzlqZ3E4Y25jMQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        aria-label="Instagram"
                      >
                        <img
                          src={insta}
                          className="size-4"
                          alt="Instagram icon"
                        />
                      </a>
                      <a
                        href="https://wa.me/+918000396216?text=Hello%20Radha%20Caterers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        aria-label="WhatsApp"
                      >
                        <img
                          src={whats}
                          className="size-4"
                          alt="WhatsApp icon"
                        />
                      </a>
                      <a
                        href="https://www.youtube.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        aria-label="Youtube"
                      >
                        <img src={yt} className="size-4" alt="Youtube icon" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/shailesh-godhani-85ba671b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors z-50 relative"
                        aria-label="Linkedin"
                      >
                        <img
                          src={linkedin}
                          className="size-4"
                          alt="Linkedin icon"
                        />
                      </a>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 text-white text-center py-4 mt-8">
              <p>© 2025 Radha Caterers. All rights reserved.</p>
              <p>Developed by Godhani technology</p>
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
      </footer>
    </section>
  );
};

export default Footer;
