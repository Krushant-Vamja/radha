import React, { useState } from "react";
import sg from "../assets/sg.png";
import vp from "../assets/vp.png";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import servicebg from "../assets/servicebg.svg";

const Founder = () => {
  const [active, setActive] = useState(null); // or default to 0 or 1

  const founders = [
    {
      name: "Shailesh Godhani",
      post: "Founder & CEO",
      desc: "With a passion for authentic Gujarati cuisine ,fast food and a vision for excellence, Shailesh Godhani established Radha Caterers to bring the finest vegetarian catering services to Gujarat and beyond.",
      stats: [
        { value: "2016", label: "Founded in" },
        { value: "3,000+", label: "Satisfied customers" },
        { value: "Pan Gujarat", label: "Operating across" },
      ],
    },
    {
      name: "Vishal Padsala",
      post: "Co-Founder & Operations Head",
      desc: "A culinary expert with deep knowledge of traditional Indian cuisine, Vishal Padsala brings operational excellence and innovative catering solutions to Radha Caterers.",
      stats: [
        { value: "13+ Years", label: "Experience" },
        { value: "4500+", label: "Events managed" },
        { value: "Large Events", label: "Specialization" },
      ],
    },
  ];

  return (
    <div className="relative px-4 py-10 mx-auto">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-50">
        <img
          src={servicebg}
          alt="Food background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <h2 className="text-center text-4xl md:text-5xl mb-2 font-serif text-[#2C2F24]">
          Meet Our Founders
        </h2>
        <p className="text-sm md:text-base text-[#5C6574] text-center mb-8 font-[Poppins]">
          Visionaries behind Radha Caterers' culinary excellence
        </p>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-5 lg:items-start lg:justify-center p-10">
          {/* First Founder's Image */}
          <div className="flex justify-center">
            <img
              src={sg}
              alt="Shailesh Godhani"
              onClick={() => setActive(0)}
              className="w-[300px] h-[430px] object-cover rounded-[30px] cursor-pointer transition-all duration-300 hover:border-[#0079BF] hover:scale-105"
            />
          </div>

          {/* First Founder's Details */}
          <div className="space-y-6 flex h-[430px] flex-col justify-center">
            <h3 className="font-[Poppins] font-semibold text-3xl text-left text-[#2C2F24]">
              {founders[0].name}
            </h3>
            <p className="font-[Poppins] text-[#5C6574] font-semibold text-left text-lg">
              {founders[0].post}
            </p>
            <p className="font-[Poppins] text-[#5C6574] text-left text-[14px]">
              {founders[0].desc}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {founders[0].stats.map((s, i) => (
                <div
                  key={i}
                  className="w-[150px] h-[89px] border bg-white border-[#DBDFD0] flex flex-col items-center justify-center text-center rounded-lg shadow-sm"
                >
                  <p
                    className="text-[22px] text-[#2C2F24]"
                    // style={{ fontFamily: "Playfair Display" }}
                  >
                    {s.value}
                  </p>
                  <p className="font-[Poppins] text-[#414536] text-[10px] lowercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Second Founder's Image */}
          <div className="flex justify-center">
            <img
              src={vp}
              alt="Vishal Padsala"
              onClick={() => setActive(1)}
              className="w-[300px] h-[430px] object-cover rounded-[30px] cursor-pointer transition-all duration-300 hover:border-[#0079BF] hover:scale-105"
            />
          </div>

          {/* Second Founder's Details */}
          <div className="space-y-4 h-[430px] flex flex-col justify-center">
            <h3 className="font-[Poppins] font-semibold text-3xl text-left text-[#2C2F24]">
              {founders[1].name}
            </h3>
            <p className="font-[Poppins] text-[#5C6574] font-semibold text-left text-lg">
              {founders[1].post}
            </p>
            <p className="font-[Poppins] text-[#5C6574] text-left text-[14px]">
              {founders[1].desc}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {founders[1].stats.map((s, i) => (
                <div
                  key={i}
                  className="w-[150px] h-[89px] border bg-white border-[#DBDFD0] flex flex-col items-center justify-center text-center rounded-lg shadow-sm"
                >
                  <p
                    className="text-[22px] text-[#2C2F24]"
                    // style={{ fontFamily: "Playfair Display" }}
                  >
                    {s.value}
                  </p>
                  <p className="font-[Poppins] text-[#414536] px-2 text-[10px] lowercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots (Desktop) */}
        {/* <div className="hidden lg:flex justify-center gap-3 mt-6">
          <button
            onClick={() => setActive(0)}
            className={`w-4 h-4 rounded-full transition-colors ${
              active === 0 ? "bg-[#0079BF]" : "bg-[#E0E0E0]"
            }`}
          />
          <button
            onClick={() => setActive(1)}
            className={`w-4 h-4 rounded-full transition-colors ${
              active === 1 ? "bg-[#0079BF]" : "bg-[#E0E0E0]"
            }`}
          />
        </div> */}

        {/* MOBILE LAYOUT (Unchanged) */}
        <div className="lg:hidden flex flex-col items-center">
          {/* <div className="flex justify-center gap-4 w-full mb-6 px-4"> */}
          <div className="flex gap-4 px-4">
            <div className="flex w-full mb-6" onClick={() => setActive(0)}>
              <img
                src={sg}
                alt="Shailesh Godhani"
                className="w-50 h-[280px] object-cover rounded-[30px] cursor-pointer transition-all duration-300 hover:border-[#0079BF] hover:scale-105"
              />
            </div>
            <div
              className="flex justify-center gap-4 w-full mb-6"
              onClick={() => setActive(1)}
            >
              <img
                src={vp}
                alt="Vishal Padsala"
                onClick={() => setActive(1)}
                className="w-50 h-[280px] object-cover rounded-[30px] cursor-pointer transition-all duration-300 hover:border-[#0079BF] hover:scale-105"
              />
            </div>
          </div>

          {/* </div> */}

          {active !== null && (
            <div className="w-full max-w-md px-4 space-y-4 animate-fade-in">
              <h3 className="font-[Poppins] font-semibold text-2xl text-center">
                {founders[active].name}
              </h3>
              <p className="font-[Poppins] text-[#5C6574] font-semibold text-center">
                {founders[active].post}
              </p>
              <p className="font-[Poppins] text-[#5C6574] text-center">
                {founders[active].desc}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {founders[active].stats.map((s, i) => (
                  <div
                    key={i}
                    className="w-[140px] h-[89px] bg-white border border-[#DBDFD0] rounded-lg p-3 text-center"
                  >
                    <p
                      className="text-xl text-[#2C2F24]"
                      // style={{ fontFamily: "Playfair Display" }}
                    >
                      {s.value}
                    </p>
                    <p className="font-[Poppins] text-[#414536] text-xs">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons (Visible only in Mobile) */}
        <div className="lg:hidden flex justify-center gap-6 mt-10">
          <button
            onClick={() => setActive(0)}
            className={`rounded-full p-3 transition-colors ${
              active === 0 ? "bg-[#0079BF]" : "bg-[#E0E0E0]"
            }`}
          >
            <img
              src={left}
              alt="Show Shailesh"
              className={`w-6 h-6 transition-all ${
                active === 0 ? "filter invert" : ""
              }`}
            />
          </button>
          <button
            onClick={() => setActive(1)}
            className={`rounded-full p-3 transition-colors ${
              active === 1 ? "bg-[#0079BF]" : "bg-[#E0E0E0]"
            }`}
          >
            <img
              src={right}
              alt="Show Vishal"
              className={`w-6 h-6 transition-all ${
                active === 1 ? "" : "filter invert"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Founder;
