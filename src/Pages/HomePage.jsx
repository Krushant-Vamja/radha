import React from "react";
import About from "../Components/About";
import Services from "../Components/Services";
import Recipe from "../Components/Recipe";
import ImageSwipe from "../Components/ImageSwipe";
import Community from "../Components/Community";
import Testimonials from "../Components/Testimonials";
import Footer from "../Components/Footer";
import Gallery from "../Components/Gallery";
import Quality from "../Components/Quality";
import Founder from "../Components/Founder";
import Hero from "../Components/Hero";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Recipe />
      <ImageSwipe />
      <Founder />
      <Gallery />
      <Quality />
      <Community />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HomePage;
