"use client";
import "./globals.css";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import CustomCursor from "../components/CustomCursor";
import Header from "../components/Header";
import SpiderBackground from "../components/SpiderBackground";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SessionProvider } from "next-auth/react";

function ScrollProgressBorders() {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80, // একটু বেশি বাউন্সি ভাব আনার জন্য
    damping: 25,
    restDelta: 0.001
  });

  // মাথার মুভমেন্ট লজিক
  const topX = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const rightY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* ১. টপ বর্ডার - লেজার বিম ইফেক্ট */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] z-[9999] origin-left"
        style={{ 
          scaleX: smoothProgress, 
          backgroundColor: theme.color,
          width: "100%",
          boxShadow: `0 0 20px ${theme.color}, 0 0 40px ${theme.color}`
        }}
      >
        {/* মাথার ভয়ঙ্কর গ্লোয়িং ইফেক্ট */}
        <motion.div
          style={{ left: topX }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        >
          {/* মেইন নিউক্লিয়াস (বড় ডট) */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-6 h-6 rounded-full blur-[2px]"
            style={{ backgroundColor: theme.color, boxShadow: `0 0 30px 10px ${theme.color}` }}
          />
          {/* বাইরের বলয় (ভয়ঙ্কর আভা) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: theme.color }}
          />
        </motion.div>
      </motion.div>

      {/* ২. রাইট বর্ডার - পিসির জন্য */}
      <motion.div
        className="fixed top-0 right-0 w-[3px] h-full z-[9999] origin-top hidden md:block"
        style={{ 
          scaleY: smoothProgress, 
          backgroundColor: theme.color,
          boxShadow: `0 0 20px ${theme.color}, 0 0 40px ${theme.color}`
        }}
      >
        <motion.div
          style={{ top: rightY }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-6 h-6 rounded-full blur-[2px]"
            style={{ backgroundColor: theme.color, boxShadow: `0 0 30px 10px ${theme.color}` }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: theme.color }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#050505] text-white overflow-x-hidden antialiased">
        <SessionProvider>
        <ThemeProvider>
          <ScrollProgressBorders />
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <SpiderBackground showLines={false} />
          </div>
          <CustomCursor />
          <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
            <Header />
            <main className="flex-1 w-full bg-transparent">
              {children}
            </main>
            <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/5 bg-black/20 backdrop-blur-md">
              © {new Date().getFullYear()} MD Azharul. All rights reserved.
            </footer>
          </div>
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}