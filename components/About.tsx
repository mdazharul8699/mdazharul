"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const theme = useTheme();

  return (
    <section id="about" style={{
        background: `radial-gradient(circle at 30% 50%, ${theme.color}20 0%, #020617 100%)`,
      }} className="py-24 relative overflow-hidden bg-black text-white">
      {/* ১. মহাজাগতিক গভীরতার জন্য ব্যাকগ্রাউন্ড গ্লো */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${theme.color}33, transparent 50%), 
                       radial-gradient(circle at 80% 20%, #ff008011, transparent 40%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* বাম পাশ: রিয়েলিস্টিক ব্ল্যাকহোল ইমেজ */}
          <div className="relative flex justify-center items-center">
            
            {/* ব্ল্যাকহোল ইভেন্ট হরাইজন (ঘূর্ণায়মান গ্যাস ও আলো) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full opacity-70"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${theme.color}, transparent 30%, #ff008033, transparent 70%, ${theme.color})`,
                filter: "blur(20px)",
                maskImage: 'radial-gradient(circle, transparent 35%, black 75%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 35%, black 75%)',
              }}
            />

            {/* সাকশন রিং (ভেতরের দিকে টেনে নেওয়ার ইফেক্ট) */}
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full border border-white/10"
              style={{ boxShadow: `inset 0 0 60px ${theme.color}44` }}
            />

            {/* আপনার ছবি - ব্ল্যাকহোলের কেন্দ্র (Singularity) */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="relative z-20 group"
            >
              {/* ছবির চারপাশের তীব্র আলোর আভা */}
              <div 
                className="absolute -inset-1 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                style={{ backgroundColor: theme.color, boxShadow: `0 0 40px ${theme.color}` }}
              />
              
              <div className="relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-[3px] border-white/5 bg-[#050505]">
                <img 
                  src="/azharul.png" 
                  alt="MD Azharul" 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                {/* ইনার শ্যাডো যা গভীরতা বোঝায় */}
                <div className="absolute inset-0 shadow-[inner_0_0_80px_rgba(0,0,0,1)]" />
              </div>
            </motion.div>

            {/* ধূলিকণা যা ব্ল্যাকহোলের দিকে যাচ্ছে */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [0, 1.5, 0],
                  x: [Math.sin(i) * 250, 0],
                  y: [Math.cos(i) * 250, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, ease: "easeIn" }}
                className="absolute w-1 h-1 rounded-full bg-white z-10"
                style={{ boxShadow: `0 0 8px ${theme.color}` }}
              />
            ))}
          </div>

          {/* ডান পাশ: কন্টেন্ট */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
              Beyond The <br />
              <span style={{ color: theme.color }} className="relative">Code</span>
            </h2>
            
          <motion.div 
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative group"
>
  {/* বাম পাশের এনিমেটেড বর্ডার */}
  <div 
    className="absolute left-0 top-0 w-[3px] h-full" 
    style={{ 
      background: `linear-gradient(to bottom, transparent, ${theme.color}, transparent)`,
      boxShadow: `0 0 15px ${theme.color}`
    }}
  />

  <p className="text-gray-400 text-lg md:text-2xl leading-relaxed mb-10 font-light italic pl-8 relative">
    {/* ডেকোরেটিভ কোটেশন মার্ক */}
    <span 
      className="absolute -top-6 left-0 text-6xl opacity-10 font-serif select-none pointer-events-none"
      style={{ color: theme.color }}
    >
      &ldquo;
    </span>

    {"I am "} 
    <span className="text-white font-bold not-italic">MD AZHARUL</span>
    {", a developer who sees the "}
    <span className="text-white font-medium">terminal as a canvas</span>
    {" and "}
    <span className="text-white font-medium">code as the paint</span>
    {". Every project is a step toward "}
    <span style={{ color: theme.color }} className="font-semibold px-1">perfection</span>
    {", where I blend logic with aesthetics to build "}
    <span className="text-gray-200">digital ecosystems</span>
    {". I don't just write scripts; I architect "}
    <span className="relative inline-block text-white font-medium px-1 underline decoration-white/20">
      experiences
    </span> 
    {" that are scalable, intuitive, and future-proof."}
  </p>
</motion.div>

            {/* রেজাল্ট সেকশন - সুন্দর ডার্ক কার্ড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-colors group">
                <h4 className="text-xs text-gray-500 uppercase mb-2 font-mono tracking-widest">SSC Result</h4>
                <p className="text-3xl font-black group-hover:scale-110 transition-transform origin-left" style={{ color: theme.color }}>GPA 5.00</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-colors group">
                <h4 className="text-xs text-gray-500 uppercase mb-2 font-mono tracking-widest">HSC Result</h4>
                <p className="text-3xl font-black text-white group-hover:scale-110 transition-transform origin-left">GPA 4.42</p>
              </div>
            </div>

            {/* ফিলোসফি কোট */}
            <div className="relative p-6 rounded-xl bg-gradient-to-r from-white/5 to-transparent">
              <p className="text-sm font-mono text-gray-500 uppercase mb-2 tracking-tighter italic opacity-50">Core Philosophy</p>
              <p className="text-2xl font-serif italic text-white/80">"Learning is a never-ending journey."</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}