import React, { useEffect, useState } from 'react';

const images = [
  '/voltvision-images/images/quality.jpg',
  '/voltvision-images/images/safety.jpg',
  '/voltvision-images/images/customer-satisfaction.jpg',
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden mt-16">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* Overlay to slightly darken background */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

      {/* Carousel image on top of background */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt="Hero Slide"
          className="max-h-[70%] w-auto object-contain shadow-lg rounded-lg transition-all duration-700"
        />
      </div>

      {/* Dots for indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;