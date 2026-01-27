"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function CustomCursor() {
  const theme = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring animation for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full z-[9999] pointer-events-none"
        style={{ 
          backgroundColor: theme.color,
          x: mousePos.x - 6,
          y: mousePos.y - 6 
        }}
      />
      
      {/* Outer Ring with Theme Color Glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 z-[9998] pointer-events-none opacity-50"
        style={{ 
          borderColor: theme.color,
          x: cursorX,
          y: cursorY,
          boxShadow: `0 0 15px ${theme.color}`
        }}
      />
    </>
  );
}