'use client';

import React, { useState, useEffect, useRef, use } from 'react';
import { 
  Send, Menu, X, ArrowRight, PlayCircle, Map, Utensils, 
  Bus, Bell, Check, Wand2, Shield, CloudRain, 
  Calendar, Lightbulb, Download, Twitter, Instagram, Linkedin,
  Plane, Home, MapPin, Navigation, Sun, Moon, Monitor
} from 'lucide-react';

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

export default function AccioVacLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Theme State: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState('system');
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  // Handle Theme Change
  useEffect(() => {
    const root = window.document.documentElement;
    const removeOldTheme = () => {
      root.classList.remove('dark');
      root.classList.remove('light');
    };

    const applyTheme = (t: string) => {
      removeOldTheme();
      if (t === 'dark') {
        root.classList.add('dark');
      } else if (t === 'light') {
        root.classList.add('light'); // Optional, mainly 'dark' class toggles Tailwind
      } else if (t === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark');
        }
      }
    };

    applyTheme(theme);
    
    // System listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        removeOldTheme();
        if (e.matches) root.classList.add('dark');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);

  }, [theme]);

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Reveal Animation on Scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Carousel Auto-Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased overflow-x-hidden scroll-smooth transition-colors duration-300">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
        ? 'h-auto shadow-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-white/30 dark:border-slate-800' 
        : 'h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/30 dark:border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer z-50">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-800 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                <Send size={16} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-emerald-900 dark:text-emerald-400">Accio<span className="text-emerald-500">Vac</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Features</a>
              <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Use Cases</a>
              <a href="#reviews" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Reviews</a>
              
              {/* Theme Toggle Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none"
                >
                  {theme === 'light' && <Sun size={20} />}
                  {theme === 'dark' && <Moon size={20} />}
                  {theme === 'system' && <Monitor size={20} />}
                </button>
                
                {isThemeDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 py-1 overflow-hidden z-50">
                    {[
                      { id: 'light', icon: Sun, label: 'Light' },
                      { id: 'dark', icon: Moon, label: 'Dark' },
                      { id: 'system', icon: Monitor, label: 'System' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => { setTheme(mode.id); setIsThemeDropdownOpen(false); }}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${theme === mode.id ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-700/50' : 'text-slate-600 dark:text-slate-300'}`}
                      >
                        <mode.icon size={14} />
                        {mode.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a href="#download" className="bg-emerald-900 dark:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-800 dark:hover:bg-emerald-500 hover:shadow-lg transition transform hover:-translate-y-0.5">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4 z-50">
              {/* Theme Toggle (Mobile) */}
               <button 
                  onClick={() => {
                    if(theme === 'light') setTheme('dark');
                    else if(theme === 'dark') setTheme('system');
                    else setTheme('light');
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  {theme === 'light' && <Sun size={24} />}
                  {theme === 'dark' && <Moon size={24} />}
                  {theme === 'system' && <Monitor size={24} />}
                </button>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none transition-colors"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 shadow-xl transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-5 pointer-events-none'}`}>
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 w-full text-center border-b border-gray-100 dark:border-slate-800"
            >
              Features
            </a>
            <a 
              href="#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 w-full text-center border-b border-gray-100 dark:border-slate-800"
            >
              Use Cases
            </a>
            <a 
              href="#reviews" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 w-full text-center border-b border-gray-100 dark:border-slate-800"
            >
              Reviews
            </a>
            <a 
              href="#download" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-emerald-700 shadow-lg w-full text-center mt-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* 1️⃣ Hero Section */}
      <header className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gray-900">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80" 
            alt="Travel Background" 
            className="w-full h-full object-cover opacity-80 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="text-white space-y-8 reveal active">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">AI Travel Assistant V2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Explore Smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Travel Better.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 dark:text-gray-400 max-w-lg leading-relaxed">
              Your all-in-one AI-powered travel companion. Get real-time alerts, personalized itineraries, and hidden gem recommendations instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#download" className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold text-lg hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <span>Get Started Free</span>
                <ArrowRight size={20} />
              </a>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
                <PlayCircle size={20} /> Watch Demo
              </button>
            </div>

            <div className="pt-8 flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-gray-900 dark:border-slate-950" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
                <img className="w-8 h-8 rounded-full border-2 border-gray-900 dark:border-slate-950" src="https://i.pravatar.cc/100?img=2" alt="User 2" />
                <img className="w-8 h-8 rounded-full border-2 border-gray-900 dark:border-slate-950" src="https://i.pravatar.cc/100?img=3" alt="User 3" />
              </div>
              <p>Trusted by 50K+ travelers worldwide</p>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="relative hidden lg:flex justify-center lg:justify-end reveal delay-200 animate-float">
            <div className="relative w-[300px] h-[600px] bg-gray-900 dark:bg-black rounded-[3rem] border-4 border-gray-700 dark:border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/20">
              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-20"></div>
              
              {/* Screen Content */}
              <div className="w-full h-full bg-gray-50 dark:bg-slate-900 overflow-y-auto no-scrollbar relative">
                {/* App Header */}
                <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60')"}}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs opacity-80">Current Location</p>
                    <h3 className="text-2xl font-bold">Kyoto, Japan</h3>
                    <div className="flex items-center gap-1 text-sm mt-1">
                      <CloudRain size={14} className="text-yellow-400" /> 18°C Partly Cloudy
                    </div>
                  </div>
                </div>

                {/* App Body */}
                <div className="p-4 space-y-4 -mt-4 relative z-10 bg-gray-50 dark:bg-slate-900 rounded-t-3xl">
                  {/* Widget Row */}
                  <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {[
                      { icon: Map, color: 'blue', label: 'Map', sub: 'Explore' },
                      { icon: Utensils, color: 'emerald', label: 'Food', sub: 'Nearby' },
                      { icon: Bus, color: 'purple', label: 'Transit', sub: 'Routes' }
                    ].map((item, idx) => (
                      <div key={idx} className="min-w-[100px] bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col">
                        <div className={`w-8 h-8 bg-${item.color}-100 dark:bg-${item.color}-900/50 text-${item.color}-600 dark:text-${item.color}-400 rounded-full flex items-center justify-center mb-2`}>
                          <item.icon size={16} />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{item.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Itinerary Card */}
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-gray-800 dark:text-white">Today's Plan</h4>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="space-y-3 relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"></div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">09:00 AM</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Fushimi Inari Shrine</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-slate-800"></div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">12:30 PM</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Lunch at Nishiki Market</p>
                      </div>
                    </div>
                  </div>

                  {/* Alert Card */}
                  <div className="bg-gray-900 dark:bg-slate-950 text-white p-4 rounded-2xl shadow-lg flex items-start gap-3 border border-transparent dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Bell size={16} className="text-yellow-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">Crowd Alert</h5>
                      <p className="text-xs text-gray-300 mt-1">High traffic expected at Kinkaku-ji temple. Suggested alternate route available.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl z-20 animate-bounce transition-colors" style={{animationDuration: '3s'}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                  <Check size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Flight Status</p>
                  <p className="font-bold text-slate-800 dark:text-white">On Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2️⃣ Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 relative z-20 -mt-10 mx-4 lg:mx-auto max-w-7xl rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-800 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-slate-800 px-8">
          <div className="flex flex-col items-center text-center p-4 reveal">
            <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-500 mb-2">120+</div>
            <div className="text-gray-500 dark:text-gray-400 font-medium">Destinations Covered</div>
            <div className="mt-2 text-sm text-gray-400 dark:text-gray-600">From Tokyo to Tulum</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 reveal delay-100">
            <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-500 mb-2">50K+</div>
            <div className="text-gray-500 dark:text-gray-400 font-medium">Travelers Assisted</div>
            <div className="mt-2 text-sm text-gray-400 dark:text-gray-600">Rating 4.9/5 stars</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 reveal delay-200">
            <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-500 mb-2">24/7</div>
            <div className="text-gray-500 dark:text-gray-400 font-medium">AI-Powered Support</div>
            <div className="mt-2 text-sm text-gray-400 dark:text-gray-600">Always there for you</div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Trusted By Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-8">Trusted by global travel partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Generic Partner Logos */}
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-300 flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition"><Home className="mb-1"/> Airbnb</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-300 flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400 transition"><Plane className="mb-1"/> Expedia</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-300 flex items-center gap-2 hover:text-orange-500 dark:hover:text-orange-400 transition"><Map className="mb-1"/> Tripadvisor</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-300 flex items-center gap-2 hover:text-blue-800 dark:hover:text-blue-400 transition"><Check className="mb-1"/> Booking.com</div>
          </div>
        </div>
      </section>

      {/* 4️⃣ Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-sm">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-4">Plan, Explore, and Enjoy</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">AccioVac combines advanced AI with local data to make your trip seamless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Wand2, title: 'AI Itinerary Builder', desc: 'Tell us your interests, budget, and dates. Our AI generates the perfect day-by-day plan instantly.', img: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', color: 'emerald' },
              { icon: Shield, title: 'Geofencing Alerts', desc: 'Stay safe with real-time notifications about neighborhood safety, scams, and emergency contacts.', img: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', color: 'red' },
              { icon: CloudRain, title: 'Live Crowd & Weather', desc: 'Avoid the queues and the rain. Real-time updates help you pivot your plans on the fly.', img: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', color: 'blue' },
              { icon: Calendar, title: 'Nearby Events', desc: 'Discover local festivals, pop-up markets, and concerts happening right now around you.', img: 'https://plus.unsplash.com/premium_photo-1750307451801-0b1dd8f676d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'purple' },
              { icon: Lightbulb, title: 'Smart Suggestions', desc: 'Hungry? We recommend authentic spots based on your taste, not just tourist traps.', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', color: 'orange' },
              { icon: Download, title: 'Offline Mode', desc: 'No data? No problem. Access your itineraries, maps, and saved spots completely offline.', img: 'https://images.unsplash.com/photo-1627666260660-812e4684a600?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'teal' }
            ].map((feature, idx) => (
              <div key={idx} className={`group bg-gray-50 dark:bg-slate-800 rounded-3xl p-6 hover:bg-white dark:hover:bg-slate-700 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-slate-600 reveal ${idx % 3 === 1 ? 'delay-100' : idx % 3 === 2 ? 'delay-200' : ''}`}>
                <div className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 text-${feature.color}-600 dark:text-${feature.color}-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{feature.desc}</p>
                <div className="h-40 rounded-xl bg-gray-200 dark:bg-slate-700 overflow-hidden relative">
                  <img src={feature.img} alt={feature.title} className="object-cover w-full h-full opacity-80 dark:opacity-60 group-hover:scale-105 transition duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Services / Use Cases Section */}
      <section id="services" className="py-20 bg-emerald-50 dark:bg-emerald-950/20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Who is AccioVac for?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Solo Traveler', desc: 'Safety first features and "meet locals" mode to make solo trips social.', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
              { title: 'Families', desc: 'Kid-friendly filters and pace-adjusted itineraries for stress-free vacations.', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
              { title: 'Backpackers', desc: 'Budget tracking, hostel finder, and off-the-beaten-path trails.', img: 'https://images.unsplash.com/photo-1521335751419-603f61523713?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              { title: 'Business', desc: 'Receipt scanning, efficient routing, and leisure options for downtime.', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
            ].map((card, idx) => (
              <div key={idx} className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 dark:opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 dark:text-white">{card.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{card.desc}</p>
                  <a href="#" className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ Testimonials */}
      <section id="reviews" className="py-24 bg-white dark:bg-slate-900 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 dark:bg-slate-950 rounded-[3rem] p-8 md:p-16 relative overflow-hidden reveal border border-transparent dark:border-slate-800">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="text-emerald-500 mb-6">
                    {/* Quote Icon */}
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
                  "AccioVac helped me navigate Tokyo like a local, even though I don't speak Japanese. The real-time train alerts saved my entire trip when the typhoon hit!"
                </h3>
                <div>
                  <p className="text-lg font-bold text-white">Sarah Jenkins</p>
                  <p className="text-emerald-400">Professional Travel Blogger</p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl transform rotate-3">
                  <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Testimonial" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ Showcase / Interactive Map Carousel */}
      <section className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12 dark:text-white">Navigate the World with Confidence</h2>
          
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
        </div>
      </section>

      {/* 8️⃣ CTA Section */}
      <section id="download" className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-900 to-black dark:from-slate-900 dark:to-black rounded-3xl p-10 md:p-20 text-center text-white shadow-2xl relative overflow-hidden reveal border border-transparent dark:border-slate-800">
            {/* Glow effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-40"></div>
            
            <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-6">Start your next adventure.</h2>
            <p className="relative z-10 text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Download AccioVac today and let AI handle the planning so you can focus on the memories.</p>
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition transform hover:-translate-y-1 flex items-center justify-center gap-3">
                {/* Apple Icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.84 1.53-2.95 1.51-.14-1.15.36-2.35 1.05-3.2z"/></svg>
                <div className="text-left leading-tight">
                  <div className="text-xs font-normal">Download on the</div>
                  <div>App Store</div>
                </div>
              </button>
              <button className="bg-gray-800 dark:bg-slate-800 border border-gray-700 dark:border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-700 dark:hover:bg-slate-700 transition transform hover:-translate-y-1 flex items-center justify-center gap-3">
                {/* Play Store Icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.36,10.79C20.36,10.79 19.95,10.42 19.95,10.42L15.39,13.7L19.95,16.97C19.95,16.97 20.36,16.6 20.36,16.6C21.21,16 21.21,14.04 20.36,13.21M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
                <div className="text-left leading-tight">
                  <div className="text-xs font-normal">GET IT ON</div>
                  <div>Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9️⃣ Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-16 border-t border-gray-800 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 text-white">
                <Send className="text-emerald-500" />
                <span className="font-bold text-xl">AccioVac</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">Your smart companion for seamless travel experiences worldwide.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 dark:bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 dark:bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 dark:bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"><Linkedin size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Itinerary AI</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Safety Alerts</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} AccioVac. All rights reserved.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}