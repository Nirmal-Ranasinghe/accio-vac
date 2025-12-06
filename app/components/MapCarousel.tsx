'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Utensils, CloudRain, Bell, Wand2 } from 'lucide-react';

// Data for the Map Carousel
const carouselData = [
  {
    id: 'paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', // Eiffel Tower
    location: 'Paris, France',
    widgets: [
      { icon: MapPin, color: 'red', label: 'Eiffel Tower', sub: '1.2km • 15 min walk', position: 'top-1/3 left-1/4', delay: '0s' },
      { icon: Utensils, color: 'emerald', label: 'Le Jules Verne', sub: 'Resv: 7:00 PM', position: 'bottom-1/3 right-1/4', delay: '1.5s' },
      { icon: CloudRain, color: 'blue', label: 'Rain Starting', sub: 'In 10 mins', isDark: true, position: 'top-1/4 right-1/3', delay: '0.5s' }
    ]
  },
  {
    id: 'srilanka',
    image: 'https://images.unsplash.com/photo-1711100358916-c3a93c7a47e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Sigiriya Rock Fortress
    location: 'Sigiriya, Sri Lanka',
    widgets: [
      { icon: MapPin, color: 'orange', label: 'Sigiriya Rock', sub: 'Open • Closing 5 PM', position: 'top-1/4 left-1/3', delay: '0s' },
      { icon: Utensils, color: 'emerald', label: 'Local Kottu Spot', sub: 'Highly Rated', position: 'bottom-1/4 right-1/3', delay: '1.2s' },
      { icon: Bell, color: 'yellow', label: 'Elephant Safari', sub: 'Departing 3:00 PM', isDark: true, position: 'top-1/2 right-1/4', delay: '0.6s' }
    ]
  },
  {
    id: 'kyoto',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', // Kyoto
    location: 'Kyoto, Japan',
    widgets: [
      { icon: MapPin, color: 'red', label: 'Fushimi Inari', sub: 'Crowded • Go Early', position: 'top-1/3 left-1/4', delay: '0s' },
      { icon: Utensils, color: 'emerald', label: 'Gogyo Ramen', sub: 'Wait: 20 mins', position: 'bottom-1/4 right-1/4', delay: '1s' },
      { icon: Wand2, color: 'purple', label: 'Geisha District', sub: 'Walking Tour', isDark: true, position: 'top-1/4 right-1/3', delay: '0.5s' }
    ]
  }
];

export default function MapCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Auto-Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl reveal group border border-transparent dark:border-slate-800">
      {/* Carousel Slides */}
      {carouselData.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={slide.image} alt={slide.location} className="w-full h-full object-cover brightness-75 dark:brightness-50" />
          
          {/* Location Label */}
          <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2">
            <MapPin size={16} className="text-emerald-400" />
            <span className="text-sm font-medium">{slide.location}</span>
          </div>

          {/* Floating Widgets for this Slide */}
          {slide.widgets.map((widget, wIdx) => (
            <div 
              key={wIdx}
              className={`absolute ${widget.position} animate-float ${index === currentSlide ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`} 
              style={{animationDelay: widget.delay, transitionDelay: `${wIdx * 200}ms`}}
            >
              <div className={`${widget.isDark ? 'bg-gray-900 text-white dark:border dark:border-slate-700' : 'bg-white text-gray-800 dark:bg-slate-800 dark:text-gray-100'} px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transform -translate-x-1/2`}>
                <widget.icon size={16} className={`text-${widget.color}-500`} />
                <div className="text-left">
                  <p className="text-xs font-bold">{widget.label}</p>
                  <p className={`text-[10px] ${widget.isDark ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>{widget.sub}</p>
                </div>
              </div>
              <div className={`w-3 h-3 ${widget.isDark ? 'bg-gray-900' : 'bg-white dark:bg-slate-800'} transform rotate-45 mx-auto -mt-1.5`}></div>
            </div>
          ))}
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {carouselData.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </div>
  );
}
