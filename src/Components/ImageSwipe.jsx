"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import i1 from "../assets/i1.jpg";
import i2 from "../assets/i2.jpg";
import i3 from "../assets/i3.jpg";

const ImageSwipe = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const textScrollRef = useRef(null);
  const animationRef = useRef(null);

  // Product data with only main images
  const products = [
    {
      id: 1,
      mainImage: i1,
    },
    {
      id: 2,
      mainImage: i2,
    },
    {
      id: 3,
      mainImage: i3,
    },
  ];

  // Text scrolling animation
  useEffect(() => {
    const scrollText = () => {
      if (textScrollRef.current) {
        const text = textScrollRef.current;
        let position = 0;
        const speed = 0.5;

        const animate = () => {
          position -= speed;
          const textWidth = text.offsetWidth / 4; // Width of one text instance

          // Reset position when one text instance has scrolled out of view
          if (position <= -textWidth) {
            position += textWidth;
          }

          text.style.transform = `translateX(${position}px)`;
          animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
      }
    };

    scrollText();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#f6f3f0]">
      {/* Main hero content */}
      <div className="relative">
        <div className="flex flex-col items-center justify-between gap-4">
          {/* Product Carousel */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            navigation={false}
            pagination={{ clickable: false }}
            onSwiper={setSwiperInstance}
            className="w-full"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="w-full h-full flex items-center justify-center">
                  {/* Main product image */}
                  <img
                    src={product.mainImage || "/placeholder.svg"}
                    alt="Raha Organic Products"
                    className="w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Bottom scrolling text banner */}
      {/* <div className="bg-[#7f614f] text-white py-3 overflow-hidden whitespace-nowrap">
        <div className="relative w-full overflow-hidden">
          <div ref={textScrollRef} className="inline-block whitespace-nowrap">
            <span className="inline-block px-4">
              Join the #BADLAV Movement — From Harmful to Herbal, Make the
              Change!
            </span>
            <span className="inline-block px-4">
              Join the #BADLAV Movement — From Harmful to Herbal, Make the
              Change!
            </span>
            <span className="inline-block px-4">
              Join the #BADLAV Movement — From Harmful to Herbal, Make the
              Change!
            </span>
            <span className="inline-block px-4">
              Join the #BADLAV Movement — From Harmful to Herbal, Make the
              Change!
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ImageSwipe;
