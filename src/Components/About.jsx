"use client";

import { useState, useEffect, useRef } from "react";
import aboutbg from "../assets/aboutbg.jpg";
import a1 from "../assets/a1.svg";
import a2 from "../assets/a2.svg";
import a3 from "../assets/a3.svg";
import a4 from "../assets/a4.svg";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [experienceCount, setExperienceCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const hasAnimated = useRef(false); // Track if animation has run

  const sectionRef = useRef(null);

  const statsData = [
    {
      icon: <img src={a1} className="w-12 h-12 sm:w-16 sm:h-16" />,
      value: 8,
      label: "Years of experience",
      state: experienceCount,
      setState: setExperienceCount,
    },
    {
      icon: <img src={a2} className="w-12 h-12 sm:w-16 sm:h-16" />,
      value: 3000,
      label: "Events Completed",
      state: eventsCount,
      setState: setEventsCount,
    },
    {
      icon: <img src={a3} className="w-12 h-12 sm:w-16 sm:h-16" />,
      value: 20,
      label: "Events Monthly",
      state: monthlyCount,
      setState: setMonthlyCount,
    },
    {
      icon: <img src={a4} className="w-12 h-12 sm:w-16 sm:h-16" />,
      value: 10,
      label: "Rated in India",
      state: ratingCount,
      setState: setRatingCount,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true; // Mark animation as run
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateCounters = () => {
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const timer = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;

          statsData.forEach((stat) => {
            const value = Math.min(
              Math.round(progress * stat.value),
              stat.value
            );
            stat.setState(value);
          });

          if (frame === totalFrames) {
            clearInterval(timer);
          }
        }, frameDuration);

        return timer;
      };

      const timer = animateCounters();
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className="relative py-16 bg-cover bg-center"
      style={{
        backgroundImage: `url(${aboutbg})`,
      }}
    >
      <div className="absolute inset-0" />
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 text-white text-center gap-5">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-white mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2">
                {stat.state}
                {stat.value > 10 ? "+" : "+"}
              </div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
