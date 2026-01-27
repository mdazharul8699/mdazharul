"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import SpiderBackground from "./SpiderBackground";

export default function Hero() {
  const theme = useTheme();
  const [codeText, setCodeText] = useState("");
  const fullCode = `const developer = {
  name: "MD Azharul",
  role: "Full-Stack Developer",
  skills: ["React", "Next.js", "Node"],
  ssc_gpa: 5.00,
  hsc_gpa: 4.42,
  status: "Building the future"
};`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCodeText(fullCode.slice(0, i));
      i++;
      if (i > fullCode.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center  justify-center overflow-hidden ">
      {/* Background Spider Web - শুধুমাত্র এখানে showLines true */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <SpiderBackground showLines={true} />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-10">
        {/* Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-left order-2 lg:order-1"
        >
          <h2 className="text-xl md:text-2xl font-light mb-4 tracking-[5px] uppercase text-white/60">{"Hello, I'm"}</h2>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            MD <span style={{ color: theme.color }}>AZHARUL</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-mono mb-10 max-w-lg leading-relaxed">
            A Web Developer specialized in <span className="text-white">Next.js</span> & <span className="text-white">Full-Stack Solutions</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <button style={{ backgroundColor: theme.color }} className="px-8 py-4 text-black font-bold rounded-xl hover:scale-105 transition-all shadow-lg active:scale-95">My Projects</button>
            <button className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all">Contact Me</button>
          </div>
        </motion.div>

        {/* Right Side: Code Box */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative order-1 lg:order-2">
          <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/40" /><div className="w-3 h-3 rounded-full bg-yellow-500/40" /><div className="w-3 h-3 rounded-full bg-green-500/40" /></div>
              <span className="text-xs text-gray-500 font-mono ml-2">developer.js</span>
            </div>
            <div className="p-6 h-[280px] md:h-[320px] font-mono text-sm md:text-base leading-relaxed overflow-y-auto">
              <pre className="text-gray-300 whitespace-pre-wrap"><code style={{ color: theme.color }}>{codeText}</code><span className="animate-pulse font-bold" style={{ color: theme.color }}>_</span></pre>
            </div>
          </div>
          <div className="absolute -inset-4 blur-[100px] opacity-20 -z-10 rounded-full" style={{ backgroundColor: theme.color }} />
        </motion.div>
      </div>
    </section>
  );
}