import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Use the custom hook from ThemeContext

const categories = [
  { name: 'Household Wires', image: '/voltvision-images/images/wire.png' },
  { name: 'Industrial cables', image: '/voltvision-images/images/cables.png' },
  { name: 'SwitchGear', image: '/voltvision-images/images/light-switch.png' },
  { name: 'Circuit protectors', image: '/voltvision-images/images/breaker.png' },
  { name: 'Hand Tools', image: '/voltvision-images/images/screwdriver.png' },
  { name: 'Solar Panel', image: '/voltvision-images/images/solar-panel.png' },
  { name: 'Power Tools', image: '/voltvision-images/images/drill.png' },
];

const ShopByCategory = () => {
  const { darkMode } = useTheme(); // Access darkMode from ThemeContext
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const updateScrollState = () => {
      const el = scrollRef.current;
      if (el) {
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
      }
    };

    updateScrollState();
    scrollRef.current?.addEventListener('scroll', updateScrollState);
    return () => scrollRef.current?.removeEventListener('scroll', updateScrollState);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 220;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={`py-10 px-4 md:px-16 relative ${darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        SHOP BY CATEGORY
      </h2>

      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow 
            ${darkMode ? 'bg-zinc-700 text-white hover:bg-zinc-600' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow 
            ${darkMode ? 'bg-zinc-700 text-white hover:bg-zinc-600' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Category Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar space-x-6 px-6 md:justify-center"
      >
        {categories.map((cat, idx) => (
          <div
            key={cat.name}
            onClick={() => setActiveIndex(idx)}
            className={`min-w-[150px] max-w-[150px] h-48 flex-shrink-0 cursor-pointer p-4 rounded-md shadow-md transition-all duration-300 flex flex-col justify-between items-center
              ${
                activeIndex === idx
                  ? darkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-800 text-white'
                  : darkMode
                  ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                  : 'bg-white text-gray-800 hover:shadow-xl hover:scale-105'
              } border ${darkMode ? 'border-zinc-700' : 'border-gray-300'}`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-20 object-contain"
            />
            <p className="mt-2 text-center text-sm font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;