"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef } from "react";
import Image from "next/image";

const eduData = [
  {
    year: "2024 - 2026 (Enrolled)",
    degree: "Bachelor of Honours",
    result: "Political Science",
    institution: "Government Brajalal (BL) College, Khulna",
    board: "National University",
    group: "Arts / Humanities",
    desc: "Currently pursuing higher studies in Political Science at one of Bangladesh's most historic institutions, focusing on political theory and governance."
  },
  {
    year: "2022 - 2024",
    degree: "Higher Secondary Certificate (HSC)",
    result: "GPA 4.42",
    institution: "Government Brajalal (BL) College, Khulna",
    board: "Jashore Board",
    group: "Science Group",
    desc: "Completed higher secondary education at one of the most prestigious colleges in Bangladesh, focusing on advanced scientific studies."
  },
  {
    year: "2020 - 2022",
    degree: "Secondary School Certificate (SSC)",
    result: "GPA 5.00",
    institution: "Graduate's High School",
    board: "Jashore Board",
    group: "Science Group",
    desc: "Achieved a perfect GPA 5.00, building a rock-solid foundation in analytical thinking and core science subjects."
  }
];

export default function Education() {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  // মাউস ট্র্যাকিং
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // স্প্রিং ফিজিক্স
  const springX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  // প্যারাল্যাক্স মুভমেন্ট
  const imageMoveX = useTransform(springX, [-500, 500], [20, -20]);
  const imageMoveY = useTransform(springY, [-500, 500], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (section) section.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={sectionRef} 
      id="education" 
      className="py-24 md:py-32 relative overflow-hidden bg-transparent min-h-screen flex items-center"
    >
      
      {/* ৩ডি গ্লাস বেলুন */}
      <motion.div
        style={{
          left: "30%",
          top: "20%",
          x: springX,
          y: springY,
          background: `radial-gradient(circle at 30% 30%, white, ${theme.color} 50%, rgba(0,0,0,0.5) 100%)`,
          boxShadow: `inset -20px -20px 50px rgba(0,0,0,0.4), 0 50px 100px rgba(0,0,0,0.2)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          borderRadius: [
            "45% 55% 74% 26% / 48% 41% 59% 52%",
            "58% 42% 48% 52% / 51% 58% 42% 49%",
            "45% 55% 74% 26% / 48% 41% 59% 52%"
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-0 opacity-30 blur-[40px]"
      >
        <div className="absolute top-[15%] left-[15%] w-[120px] h-[70px] bg-white/30 blur-2xl rounded-full rotate-[-45deg]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black mb-20 md:mb-28 tracking-tighter text-center md:text-left text-white"
            >
              ACADEMIC <span style={{ color: theme.color }}>JOURNEY</span>
            </motion.h2>

            <div className="relative border-l-2 border-white/10 ml-4 md:ml-12">
              {eduData.map((edu, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-20 ml-10 relative group"
                >
                  <div 
                    style={{ backgroundColor: theme.color, boxShadow: `0 0 20px ${theme.color}` }}
                    className="absolute -left-[49px] md:-left-[58px] top-2 w-4 h-4 rounded-full group-hover:scale-150 transition-all duration-300 ring-8 ring-white/5"
                  />
                  
                  <div className="mb-4 inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest uppercase opacity-70">
                    {edu.year}
                  </div>

                  <h3 className="text-2xl md:text-5xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300 text-white">
                    {edu.degree}
                  </h3>
                  <h4 className="text-lg md:text-2xl text-white/70 font-medium mb-3">
                    {edu.institution}
                  </h4>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase font-mono text-gray-400">Board: {edu.board}</span>
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase font-mono text-gray-400">Group: {edu.group}</span>
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 inline-flex flex-col backdrop-blur-sm"
                  >
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Status / Result</span>
                    <span className="text-2xl md:text-3xl font-black" style={{ color: theme.color }}>{edu.result}</span>
                  </motion.div>
                  
                  <p className="mt-6 text-gray-400 max-w-2xl leading-relaxed font-light text-base md:text-lg italic">
                    {edu.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <motion.div
              style={{ x: imageMoveX, y: imageMoveY, rotateY: imageMoveX }}
              className="relative w-full max-w-[480px] aspect-[4/5]"
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 blur-[80px] rounded-full"
                style={{ backgroundColor: theme.color }}
              />
              
              <div className="relative z-10 w-full h-full rounded-[4rem] overflow-hidden border border-white/20 shadow-2xl">
                <Image 
                  src="/azharuleducation.jpg" 
                  alt="MD Azharul Honours BL College"
                  fill
                  className="object-cover object-top brightness-90 hover:brightness-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-4 border border-white/5 rounded-[4.5rem] -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}