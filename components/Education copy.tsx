"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const eduData = [
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

  return (
    <section id="education" className="py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6">
        
        {/* সেকশন টাইটেল */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-7xl font-black mb-24 tracking-tighter text-center md:text-left"
        >
          ACADEMIC <span style={{ color: theme.color }}>JOURNEY</span>
        </motion.h2>

        {/* টাইমলাইন কন্টেইনার */}
        <div className="relative border-l border-white/10 ml-4 md:ml-12">
          {eduData.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-20 ml-10 relative group"
            >
              {/* Timeline Dot with Glow */}
              <div 
                style={{ 
                  backgroundColor: theme.color, 
                  boxShadow: `0 0 20px ${theme.color}` 
                }}
                className="absolute -left-[49px] top-2 w-4 h-4 rounded-full group-hover:scale-150 transition-all duration-300 ring-8 ring-white/5"
              />
              
              {/* Year Badge */}
              <div className="mb-4 inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase opacity-70">
                {edu.year}
              </div>

              {/* Main Content Card */}
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl md:text-5xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {edu.degree}
                </h3>
                <h4 className="text-lg md:text-2xl text-white/70 font-medium">
                  {edu.institution}
                </h4>

                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase font-mono text-gray-400">Board: {edu.board}</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase font-mono text-gray-400">Group: {edu.group}</span>
                </div>
              </div>

              {/* Result Badge */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 inline-flex flex-col backdrop-blur-sm"
              >
                <span className="text-[10px] text-gray-500 font-mono uppercase">Final Score</span>
                <span className="text-2xl md:text-3xl font-black" style={{ color: theme.color }}>
                   {edu.result}
                </span>
              </motion.div>
              
              {/* Description */}
              <p className="mt-6 text-gray-400 max-w-2xl leading-relaxed font-light text-base md:text-lg italic">
                {edu?.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}