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
    <section
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden mt-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/voltvision-images/img/home3.jpg')" }}
    >
      {/* Dark overlay over background */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Carousel image */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt="Hero Slide"
          className="max-h-[70%] w-auto object-contain shadow-2xl rounded-lg transition-all duration-700"
        />
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === idx ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
