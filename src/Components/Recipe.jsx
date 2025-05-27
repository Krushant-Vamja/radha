"use client";

import { useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";

import gujaratiFood from "../assets/gujaratiFood.png";
import southIndianFood from "../assets/southIndianFood.png";
import punjabiFood from "../assets/punjabiFood.png";
import kathiyawadiFood from "../assets/kathiyawadiFood.png";
import broccoli from "../assets/broccoli.png";
import spoonNoodles from "../assets/spoonNoodles.png";
import servicebg from "../assets/servicebg.jpg";
import northindian from "../assets/northindian.png";
import chaat from "../assets/chaat.png";
import dessert from "../assets/dessert.png";

const Recipe = () => {
  const scrollRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const content = contentRef.current;

    if (!scrollContainer || !content) return;

    // Clone original items for seamless loop
    const items = Array.from(content.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add("cloned");
      content.appendChild(clone);
    });

    let position = 0;
    const speed = 0.2;
    let animationId;

    const scroll = () => {
      position += speed;
      if (position >= content.scrollWidth / 2) {
        position = 0;
      }
      content.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const cuisines = [
    {
      name: "Gujarati",
      image: gujaratiFood,
      items: [
        "Traditional Thali",
        "Farsan Items",
        "Authentic Sweets",
        "Festival Specials",
      ],
    },
    {
      name: "South Indian",
      image: southIndianFood,
      items: [
        "Dosa Varieties",
        "Idli & Vada",
        "Rice Specialties",
        "Traditional Meals",
      ],
    },
    {
      name: "Punjabi",
      image: punjabiFood,
      items: ["Rich Curries", "Fresh Breads", "Live Counter", "Special Thali"],
    },
    {
      name: "Kathiyawadi",
      image: kathiyawadiFood,
      items: [
        "Spicy Curries",
        "Traditional Breads",
        "Special Thalis",
        "Authentic Flavors",
      ],
    },
    {
      name: "North Indian",
      image: northindian,
      items: [
        "Paneer Butter Masala",
        "Dal Makhani",
        "Veg Biryani",
        "Naan & Rotis",
      ],
    },
    {
      name: "Chaat & Snacks",
      image: chaat,
      items: ["Pani Puri", "Samosa", "Bhel Puri", "Dahi Puri"],
    },
    {
      name: "Desserts",
      image: dessert,
      items: ["Gulab Jamun", "Rasmalai", "Gajar Ka Halwa", "Jalebi"],
    },
    {
      name: "Gujarati",
      image: gujaratiFood,
      items: [
        "Traditional Thali",
        "Farsan Items",
        "Authentic Sweets",
        "Festival Specials",
      ],
    },
    {
      name: "South Indian",
      image: southIndianFood,
      items: [
        "Dosa Varieties",
        "Idli & Vada",
        "Rice Specialties",
        "Traditional Meals",
      ],
    },
    {
      name: "Punjabi",
      image: punjabiFood,
      items: ["Rich Curries", "Fresh Breads", "Live Counter", "Special Thali"],
    },
    {
      name: "Kathiyawadi",
      image: kathiyawadiFood,
      items: [
        "Spicy Curries",
        "Traditional Breads",
        "Special Thalis",
        "Authentic Flavors",
      ],
    },
    {
      name: "North Indian",
      image: northindian,
      items: [
        "Paneer Butter Masala",
        "Dal Makhani",
        "Veg Biryani",
        "Naan & Rotis",
      ],
    },
    {
      name: "Chaat & Snacks",
      image: chaat,
      items: ["Pani Puri", "Samosa", "Bhel Puri", "Dahi Puri"],
    },
    {
      name: "Desserts",
      image: dessert,
      items: ["Gulab Jamun", "Rasmalai", "Gajar Ka Halwa", "Jalebi"],
    },
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      scrollRef.current.scrollLeft += 200;
    },
    onSwipedRight: () => {
      scrollRef.current.scrollLeft -= 200;
    },
    trackMouse: true,
  });

  return (
    <div
      className="relative py-20 bg-cover bg-center overflow-hidden"
      style={{
        backgroundRepeat: "repeat-x", // Make the image repeat horizontally
        backgroundAttachment: "fixed", // Keep the background fixed while scrolling
      }}
    >
      {/* Background Image with Opacity using ::before */}
      <div
        className="absolute inset-0 opacity-50 bg-cover bg-center"
        style={{
          backgroundImage: `url(${servicebg})`,
          // backgroundRepeat: "repeat-x", // Make the image repeat horizontally
          // backgroundAttachment: "fixed", // Keep the background fixed while scrolling
          // opacity: 0.5, // Apply opacity only to the background image
          // zIndex: -1, // Ensure the content is on top
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative">
        <img
          src={broccoli}
          alt="Broccoli"
          className="absolute left-40 bottom-90 w-28 md:w-40 z-10 custom-float hidden md:block"
        />

        <div className="text-center mb-25 px-4 relative z-20">
          <h2 className="text-4xl md:text-5xl text-[#1a1a2e] mb-4 font-bold">
            Quality is Our Recipe
          </h2>
          <p className="max-w-xl mx-auto text-gray-600 leading-relaxed text-base">
            Serving authentic vegetarian delicacies since 2016, crafted with
            passion and precision for your special moments.
          </p>
        </div>

        <img
          src={spoonNoodles}
          alt="Spoon with noodles"
          className="hidden md:block absolute left-280 bottom-70 w-36 md:w-70 z-0 custom-float"
        />

        <div {...handlers} ref={scrollRef} className="cursor-grab">
          <div
            ref={contentRef}
            className="flex recipe-cards will-change-transform gap-5"
            style={{
              whiteSpace: "nowrap",
              transition: "transform 0.1s linear",
            }}
          >
            {[...cuisines, ...cuisines].map((cuisine, index) => (
              <div
                className="flex-none w-64 md:w-72 px-4 bg-white shadow-md pt-8 pb-5 relative min-h-[300px] recipe-card
                [border-top-left-radius:50px] [border-top-right-radius:20px] [border-bottom-left-radius:20px] [border-bottom-right-radius:50px]"
                key={index}
              >
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-visible">
                  <img
                    src={cuisine.image || "/placeholder.svg"}
                    alt={cuisine.name}
                    className="w-32 h-32 object-cover rounded-full shadow-lg"
                  />
                </div>
                <div className="mt-16 text-center">
                  <h3 className="text-2xl text-[#1a1a2e] mb-5 font-semibold">
                    {cuisine.name}
                  </h3>
                  <ul className="list-none p-0 text-left max-w-[200px] mx-auto">
                    {cuisine.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="mb-2.5 text-gray-600 text-sm text-center"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
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
};

export default Recipe;
