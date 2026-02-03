"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Education", href: "/education" },
    { name: "Projects", href: "/project" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  // আপনার কম্পোনেন্টের ভেতরে এটি বসান:
const { data: session } = useSession();
const targetLink = session ? "/dashboard" : "/login";

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
          <img 
            src="/azharul_logo.png" 
            alt="Logo" 
            width={40} 
            height={40} 
            className="object-contain"
          />
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
<Link href={targetLink} style={{ cursor: 'pointer' }}>
    <motion.button
      /* নজর কাড়ার জন্য পালস অ্যানিমেশন */
      animate={{ 
        boxShadow: [
          `0 0 0px ${theme.color}00`, 
          `0 0 20px ${theme.color}66`, 
          `0 0 0px ${theme.color}00`
        ],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: theme.color, 
        color: "#000" 
      }}
      whileTap={{ scale: 0.95 }}
      style={{ borderColor: theme.color, color: theme.color }}
      className="hidden md:flex items-center gap-2 px-6 py-2 border rounded-full cursor-pointer text-[10px] font-black tracking-[0.2em] uppercase transition-all bg-transparent relative overflow-hidden group"
    >
      {/* ভেতরের গ্লোয়িং ডট */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: theme.color }}></span>
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: theme.color }}></span>
      </span>

      <span className="relative z-10">Give Review</span>

      {/* হোভার করলে শাইন ইফেক্ট */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
    </motion.button>
  </Link>
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