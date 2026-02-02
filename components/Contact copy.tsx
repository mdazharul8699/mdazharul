"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

// ১. স্টার ফিল্ড অ্যানিমেশন
const SupernovaField = ({ themeColor }: { themeColor: string }) => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; duration: number; delay: number }[]>([]);
  useEffect(() => {
    const generatedStars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5, duration: Math.random() * 3 + 2, delay: Math.random() * 5,
    }));
    setStars(generatedStars);
  }, []);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star, i) => (
        <motion.div key={i} animate={{ opacity: [0, 1, 0] }} transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          className="absolute rounded-full bg-white shadow-[0_0_5px_white]" style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
        />
      ))}
    </div>
  );
};

export default function Contact() {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  // প্যারালাক্স মুভমেন্ট
  const yLeft = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const yRight = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={sectionRef} id="contact" className="py-32 relative overflow-hidden text-white bg-[#020202] min-h-screen flex items-center">
      <SupernovaField themeColor={theme.color} />

      {/* ২. উপরে-বামের উজ্জ্বল চাঁদ ও রশ্মি (Top-Left Radiant Moon) */}
      <motion.div style={{ y: yLeft }} className="absolute top-[-15%] left-[-10%] z-0 pointer-events-none">
        <div className="relative flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 6, repeat: Infinity }}
            className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full blur-[100px]" 
            style={{ background: `radial-gradient(circle, ${theme.color} 40%, transparent 80%)` }} 
          />
          {[...Array(12)].map((_, i) => (
            <motion.div key={i} animate={{ opacity: [0.1, 0.4, 0.1], scaleY: [1, 1.2, 1] }} transition={{ duration: 5 + i, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 origin-top w-[3px] h-[1500px] blur-[4px]"
              style={{ background: `linear-gradient(to bottom, ${theme.color}, transparent)`, transform: `rotate(${i * 15 + 120}deg) translateX(-50%)` }}
            />
          ))}
        </div>
      </motion.div>

      {/* ৩. নিচে-ডানের উজ্জ্বল চাঁদ ও রশ্মি (Bottom-Right Radiant Moon) */}
      <motion.div style={{ y: yRight }} className="absolute bottom-[-15%] right-[-10%] z-0 pointer-events-none">
        <div className="relative flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 5, repeat: Infinity }}
            className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full blur-[120px]" 
            style={{ background: `radial-gradient(circle, ${theme.color} 30%, ${theme.color}44 60%, transparent 80%)` }} 
          />
          {[...Array(15)].map((_, i) => (
            <motion.div key={i} animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [1, 1.3, 1] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity }}
              className="absolute bottom-1/2 right-1/2 origin-bottom w-[4px] h-[1800px] blur-[6px]"
              style={{ background: `linear-gradient(to top, ${theme.color}, transparent)`, transform: `rotate(${i * 10 - 50}deg) translateX(50%)` }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-32">
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-none select-none">
              Get In <span className="italic" style={{ color: 'transparent', WebkitTextStroke: `2px ${theme.color}`, textShadow: `0 0 40px ${theme.color}44` }}>Touch</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* কন্টাক্ট কার্ডস */}
            <div className="space-y-8">
              {[
                { icon: <FiMail />, label: "Email", val: "freelancermdazharul@gmail.com" },
                { icon: <FiPhone />, label: "Phone", val: "+880 1913958872" },
                { icon: <FiMapPin />, label: "Location", val: "Khulna, Bangladesh" }
              ].map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 15, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="group flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" 
                       style={{ backgroundColor: `${theme.color}20`, color: theme.color, boxShadow: `0 0 25px ${theme.color}33` }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{item.label}</p>
                    <p className="text-xl font-bold">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* কন্টাক্ট ফর্ম */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              className="p-12 md:p-16 rounded-[4rem] bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl relative"
            >
              <form className="relative z-10 space-y-10">
                <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-all text-sm tracking-widest" />
                <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-all text-sm tracking-widest" />
                <textarea rows={3} placeholder="MESSAGE" className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-all text-sm tracking-widest resize-none" />
                <motion.button whileHover={{ scale: 1.02, boxShadow: `0 0 50px ${theme.color}55` }} whileTap={{ scale: 0.98 }}
                  className="w-full py-7 rounded-2xl font-black text-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 transition-all"
                  style={{ backgroundColor: theme.color }}
                >
                  Invoke Power <FiSend />
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}