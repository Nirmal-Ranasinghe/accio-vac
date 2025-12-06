'use client';

import React, { useState, useEffect } from 'react';
import { Send, Menu, X, Sun, Moon, Monitor } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
        root.classList.add('light');
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

  return (
    <>
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
    </>
  );
}
