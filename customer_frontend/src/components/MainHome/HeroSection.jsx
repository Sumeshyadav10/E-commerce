import React, { useEffect, useState } from 'react';

const images = [
  '/voltvision-images/images/home1.jpg',
  '/voltvision-images/images/home2.jpg',
  '/voltvision-images/images/home3.jpg',
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
    <section className="relative w-full h-screen overflow-hidden">
      {/* Static background image (like electric towers) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: "url('/voltvision-images/img/home3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
      </div>

      {/* Centered carousel image */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4 text-white text-center">
        <img
          src={images[currentIndex]}
          alt="Hero Slide"
          className="max-h-[300px] md:max-h-[400px] w-auto object-contain shadow-2xl rounded-lg mb-6 transition-all duration-700"
        />
        <h1 className="text-3xl md:text-5xl font-light max-w-5xl">
          Simply we supply a good quality material at the right time
        </h1>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx ? 'bg-white' : 'bg-gray-400'
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
