"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

// ১. স্টার ফিল্ড অ্যানিমেশন
const SupernovaField = ({ themeColor }: { themeColor: string }) => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; duration: number; delay: number }[]>([]);
  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }).map(() => ({
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
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  const yLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // শুধুমাত্র MongoDB ডাটাবেজে ডাটা পাঠানোর ফাংশন
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    const formData = new FormData(formRef.current);
    const payload = {
      name: formData.get("from_name"),
      email: formData.get("reply_to"),
      subject: "New Message from Portfolio",
      message: formData.get("message"),
    };

    try {
      // API এর মাধ্যমে MongoDB-তে ডাটা পাঠানো
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("বিজয়! আপনার বার্তাটি সরাসরি ডাটাবেজে সেভ হয়েছে।");
        formRef.current.reset();
      } else {
        alert("দুঃখিত, ডাটাবেজে সেভ হতে সমস্যা হয়েছে: " + data.error);
      }

    } catch (error) {
      console.error("Database Submission Error:", error);
      alert("সার্ভারের সাথে সংযোগ বিচ্ছিন্ন! আবার চেষ্টা করুন।");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-32 relative overflow-hidden text-white bg-[#020202] min-h-screen flex items-center">
      <SupernovaField themeColor={theme.color} />

      {/* উপরে-বামের উজ্জ্বল চাঁদ */}
      <motion.div style={{ y: yLeft }} className="absolute top-[-10%] left-[-15%] md:top-[-15%] md:left-[-10%] z-0 pointer-events-none opacity-50 md:opacity-70">
        <div className="relative flex items-center justify-center">
          <div className="w-[250px] h-[250px] md:w-[700px] md:h-[700px] rounded-full blur-[60px] md:blur-[100px]" 
            style={{ background: `radial-gradient(circle, ${theme.color} 40%, transparent 80%)` }} 
          />
          {[...Array(12)].map((_, i) => (
            <motion.div key={i} animate={{ opacity: [0.1, 0.4, 0.1], scaleY: [1, 1.2, 1] }} transition={{ duration: 5 + i, repeat: Infinity }}
              className={`absolute top-1/2 left-1/2 origin-top blur-[4px] ${i > 7 ? 'hidden md:block' : 'block'}`}
              style={{ 
                width: '2px', 
                height: '1500px',
                background: `linear-gradient(to bottom, ${theme.color}, transparent)`, 
                transform: `rotate(${i * 15 + 120}deg) translateX(-50%)` 
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* নিচে-ডানের উজ্জ্বল চাঁদ */}
      <motion.div style={{ y: yRight }} className="absolute bottom-[-10%] right-[-15%] md:bottom-[-15%] md:right-[-10%] z-0 pointer-events-none">
        <div className="relative flex items-center justify-center">
          <div className="w-[300px] h-[300px] md:w-[800px] md:h-[800px] rounded-full blur-[80px] md:blur-[120px]" 
            style={{ background: `radial-gradient(circle, ${theme.color} 30%, ${theme.color}44 60%, transparent 80%)` }} 
          />
          {[...Array(15)].map((_, i) => (
            <motion.div key={i} animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [1, 1.3, 1] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity }}
              className={`absolute bottom-1/2 right-1/2 origin-bottom blur-[6px] ${i > 9 ? 'hidden md:block' : 'block'}`}
              style={{ 
                width: '3px', 
                height: '1800px',
                background: `linear-gradient(to top, ${theme.color}, transparent)`, 
                transform: `rotate(${i * 10 - 50}deg) translateX(50%)` 
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16 md:mb-32">
            <h2 className="text-5xl md:text-[10rem] font-black tracking-tighter uppercase leading-none select-none">
              Get In <br className="md:hidden" />
              <span className="italic" style={{ color: `${theme.color}`, zIndex: 10, WebkitTextStroke: `1px md:2px ${theme.color}`, textShadow: `0 0 40px ${theme.color}44` }}>Touch</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
            
            <div className="space-y-4 md:space-y-8 order-2 lg:order-1">
              {[
                { icon: <FiMail />, label: "Email", val: "freelancermdazharul@gmail.com" },
                { icon: <FiPhone />, label: "Phone", val: "+880 1913958872" },
                { icon: <FiMapPin />, label: "Location", val: "Khulna, Bangladesh" }
              ].map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="group flex items-center gap-4 md:gap-6 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md transition-all"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl flex-shrink-0" 
                       style={{ backgroundColor: `${theme.color}20`, color: theme.color, boxShadow: `0 0 25px ${theme.color}33` }}>
                    {item.icon}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm md:text-xl font-bold truncate">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* কন্টাক্ট ফর্ম */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl relative order-1 lg:order-2"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6 md:space-y-10">
                <input required name="from_name" type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 focus:outline-none focus:border-white transition-all text-xs md:text-sm tracking-widest" />
                <input required name="reply_to" type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 focus:outline-none focus:border-white transition-all text-xs md:text-sm tracking-widest" />
                <textarea required name="message" rows={3} placeholder="MESSAGE" className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 focus:outline-none focus:border-white transition-all text-xs md:text-sm tracking-widest resize-none" />
                <motion.button 
                  disabled={isSending}
                  whileHover={{ scale: 1.02, boxShadow: `0 0 50px ${theme.color}55` }} whileTap={{ scale: 0.98 }}
                  className="w-full py-5 md:py-7 rounded-xl md:rounded-2xl font-black text-black uppercase tracking-[0.3em] md:tracking-[0.5em] flex items-center justify-center gap-4 transition-all"
                  style={{ backgroundColor: theme.color, opacity: isSending ? 0.6 : 1 }}
                >
                  {isSending ? "Dispatching..." : "Invoke Power"} <FiSend />
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}