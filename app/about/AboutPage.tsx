"use client";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { FiHeart, FiTarget } from "react-icons/fi";

export default function About() {
  const theme = useTheme();

  // ইমেজ এরর হ্যান্ডলার ফাংশন
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, placeholder: string) => {
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.innerHTML = `<div class="flex items-center justify-center w-full h-full bg-[#0a0a0a] text-8xl">${placeholder}</div>`;
    }
  };

  return (
    <section id="about" className="bg-black text-white overflow-hidden">
      {/* --- ১. ব্ল্যাকহোল সেকশন (আপনার আগের কোড) --- */}
      <div style={{ background: `radial-gradient(circle at 30% 50%, ${theme.color}20 0%, #020617 100%)` }} className="py-24 relative overflow-hidden">
         {/* ... Blackhole Code ... */}
      </div>

      {/* --- ২. Cat Companion Section (Text Left | Image Right) --- */}
      <div className="py-32 relative bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12" style={{ backgroundColor: theme.color }} />
                <span className="font-mono text-sm uppercase tracking-[0.3em]" style={{ color: theme.color }}>My Soul Companion</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">OF CODE <br /> & <span style={{ color: theme.color }}>WHISKERS</span></h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                {`When the terminal screen gets overwhelming, my cat is the one who brings me back to reality. 
                Developing isn't just about logic; it's about the patience I've learned from my feline friend.`}
              </p>
              <div className="flex items-center gap-3 text-white/60 italic">
                <FiHeart style={{ color: theme.color }} className="text-xl" />
                <span>{"Life is better with a cat and a clean code."}</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="relative group">
              <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: theme.color }} />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square bg-[#0a0a0a] flex items-center justify-center">
                <img 
                  src="/cat.png" 
                  alt="My Cat" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  onError={(e) => handleImageError(e, "🐈")} 
                />
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-6 right-6 text-4xl">🐾</motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


{/* --- ৩. Football Passion Section (Same to Same as Your AI Image) --- */}
<div className="py-24 relative bg-black overflow-hidden min-h-[600px] flex items-center">
  
  {/* ১. ব্যাকগ্রাউন্ড এলিমেন্টস (Lightning & Silhouette) */}
  <div className="absolute inset-0 pointer-events-none">
    {/* বাম পাশের সেই দৌড়ানো প্লেয়ার (Yellow/Orange Glow) */}
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="absolute left-[-5%] top-1/2 -translate-y-1/2 z-10"
    >
      {/* বড় মেইন প্লেয়ার */}
      <div className="relative">
        <span className="text-[450px] leading-none select-none opacity-80 brightness-125 filter drop-shadow-[0_0_30px_rgba(252,186,3,0.5)]"
              style={{ color: '#fcba03' }}>
          🏃
        </span>
        {/* মোশন ব্লার ইফেক্ট (পেছনের প্লেয়ার) */}
        <span className="absolute left-[-20%] top-0 text-[400px] leading-none opacity-60 blur-sm" style={{ color: '#03e7fc' }}>
          🏃
        </span>
      </div>
    </motion.div>

    {/* ডান পাশের আবছা প্লেয়ার (Blue Silhouette) */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      className="absolute right-[5%] top-1/2 -translate-y-1/2 z-0"
    >
      <span className="text-[350px] leading-none select-none blur-md" style={{ color: '#03e7fc' }}>
        🏃
      </span>
    </motion.div>

        {/* ডান পাশের আবছা প্লেয়ার (Blue Silhouette) */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      className="absolute right-[30%] top-1/2 -translate-y-1/2 z-0"
    >
      <span className="text-[350px] leading-none select-none blur-md" style={{ color: '#03e7fc' }}>
        🏃
      </span>
    </motion.div>
  </div>

  <div className="container mx-auto px-6 relative z-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* ২. বাম পাশ: নিওন ফ্রেম ও ফুটবল (আপনার ছবির মাঝখানের অংশ) */}
      <div className="relative flex justify-center items-center">
        {/* নিওন লাইটনিং ফ্রেম */}
        <div className="relative p-1 rounded-3xl overflow-hidden">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-[2px] border-pink-500 rounded-2xl shadow-[0_0_20px_#ff00ff,inset_0_0_20px_#ff00ff]"
          />
          
          {/* লাইটনিং ইফেক্ট (SVG ব্যবহার করা হয়েছে ছবির ইলেকট্রিক ভাইব দিতে) */}
          <svg className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] opacity-60" viewBox="0 0 100 100">
            <motion.path
              d="M0,50 L20,45 L40,55 L60,45 L80,55 L100,50"
              stroke="#03e7fc"
              strokeWidth="0.5"
              fill="none"
              animate={{ d: ["M0,50 L20,40 L40,60 L60,40 L80,60 L100,50", "M0,50 L20,60 L40,40 L60,60 L80,40 L100,50"] }}
              transition={{ duration: 0.1, repeat: Infinity }}
            />
          </svg>
{/* --- মাঝখানের কসমিক ফুটবল (Updated with Pro Visuals) --- */}
<div className="relative w-64 h-48 md:w-[450px] md:h-[280px] bg-gradient-to-br from-purple-900/20 to-black backdrop-blur-md rounded-3xl flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,0,255,0.1)]">
  
  {/* ১. ব্যাকগ্রাউন্ড স্টারডাস্ট ও নেবুলা ইফেক্ট */}
  <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
  
  {/* ২. ডাইনামিক অরবিট রিংস (আপনার ছবির মতো ইলেকট্রিক লুক) */}
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    className="absolute w-56 h-56 rounded-full border-[1px] border-pink-500/40 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
    style={{ transform: 'rotateX(70deg)' }}
  />
  <motion.div 
    animate={{ rotate: -360 }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    className="absolute w-64 h-64 rounded-full border-[1px] border-cyan-500/30 shadow-[0_0_15px_rgba(0,231,252,0.2)]"
    style={{ transform: 'rotateX(80deg) rotateY(20deg)' }}
  />

  {/* ৩. মেইন থ্রি-ডি ফুটবল (আপনার জেনারেট করা ছবির মতো গ্লোয়িং ফুটবল) */}
  <div className="relative z-10 group">
    {/* ফুটবলের পেছনের অরা (Aura) */}
    <div className="absolute inset-0 bg-pink-600 blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity" />
    
    <motion.img 
      src="https://cdn-icons-png.flaticon.com/512/53/53254.png" // একটি ক্লিন ফুটবল আইকন
      alt="Cosmic Ball" 
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-32 h-32 md:w-40 md:h-40 relative z-10 invert brightness-200 drop-shadow-[0_0_25px_#ff00ff]"
      style={{ 
        filter: 'drop-shadow(0 0 10px #ff00ff) drop-shadow(0 0 20px #03e7fc)' 
      }}
    />

    {/* ৪. ইলেকট্রিক স্পার্কস (আপনার ছবির সেই বজ্রপাত ইফেক্ট সিমুলেশন) */}
    <div className="absolute inset-[-20px] pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 90, 180, 270]
          }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
          className="absolute inset-0 border border-cyan-400/30 rounded-full blur-[2px]"
          style={{ transform: `rotate(${i * 45}deg) scale(${1 + i * 0.1})` }}
        />
      ))}
    </div>
  </div>

  {/* ৫. নিচের শ্যাডো রিফ্লেকশন */}
  <div className="absolute bottom-4 w-32 h-4 bg-pink-500/20 blur-xl rounded-[100%]" />
</div> b



        </div>
      </div>

      {/* ৩. ডান পাশ: টেক্সট এবং কার্ডস (ছবির হুবহু এলাইনমেন্ট) */}
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-pink-500" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-pink-500 font-bold">The Beautiful Game</span>
        </div>
        
        <h3 className="text-6xl md:text-8xl font-black mb-6 leading-[0.8] tracking-tighter text-white">
          UNSTOPPABLE <br /> 
          <span className="italic" style={{ 
            color: 'transparent', 
            WebkitTextStroke: `1.5px ${theme.color}`,
            textShadow: `0 0 20px ${theme.color}44`
          }}>STRATEGIST</span>
        </h3>

        <p className="text-gray-400 text-sm mb-12 max-w-sm leading-relaxed">
        {`Football is more than just a game; it's a cosmic discipline. It taught me teamwork and the grit to fight until the final whistle.`}
        </p>

        {/* কার্ডস (ডার্ক গ্লাস লুক) */}
        <div className="flex gap-4">
          <div className="flex-1 p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-md">
             <div className="w-8 h-8 rounded-full border-2 border-purple-600 flex items-center justify-center mb-4">
                <div className="w-3 h-3 rounded-full bg-purple-600 shadow-[0_0_10px_#a855f7]" />
             </div>
             <h5 className="font-bold text-white text-lg">Teamwork</h5>
             <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Stronger Together</p>
          </div>

          <div className="flex-1 p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-md flex flex-col items-center">
             <div className="text-2xl mb-4 relative">
                <span className="relative z-10">⚽</span>
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-40 animate-pulse" />
             </div>
             <h5 className="font-bold text-white text-lg">Hardwork</h5>
             <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">No Limits</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</div>


    </section>
  );
}