"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

export default function Header() {
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "py-4 bg-black/50 backdrop-blur-xl border-b border-white/10" : "py-8 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-black tracking-tighter cursor-pointer"
        >
          A<span style={{ color: theme.color }}>Z</span>.
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors group"
            >
              {link.name}
              <span 
                style={{ backgroundColor: theme.color }}
                className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Right Action (Optional) */}
        <div className="flex items-center gap-4">
          <button 
            style={{ borderColor: theme.color, color: theme.color }}
            className="hidden md:block px-6 py-2 border rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all"
          >
            RESUME
          </button>
          
          {/* Mobile Menu Icon (Simplified) */}
          <div className="md:hidden w-6 h-6 flex flex-col justify-between items-end cursor-pointer">
            <span style={{ backgroundColor: theme.color }} className="w-full h-[2px]" />
            <span style={{ backgroundColor: theme.color }} className="w-2/3 h-[2px]" />
            <span style={{ backgroundColor: theme.color }} className="w-full h-[2px]" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}