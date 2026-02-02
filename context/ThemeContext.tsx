// context/ThemeContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const themes = [
 
 { 
    name: 'purple', 
    color: '#A855F7', 
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]' 
  } ,
  { 
    name: 'yellow', 
    color: '#FACC15', 
    glow: 'shadow-[0_0_20px_rgba(250,204,21,0.5)]' 
  }
  // { 
  //   name: 'pink', 
  //   color: '#FF007F', // Premium Neon Pink
  //   glow: 'shadow-[0_0_20px_rgba(255,0,127,0.5)]' 
  // },
  
];

const ThemeContext = createContext(themes[0]);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    // Random theme selection from the updated list (Yellow, Pink, Purple)
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setCurrentTheme(randomTheme);
    
    // Setting global CSS variable for primary color
    document.documentElement.style.setProperty('--primary-color', randomTheme.color);
  }, []);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className={`${currentTheme.name}-theme bg-[#050505] text-white min-h-screen transition-colors duration-1000`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);