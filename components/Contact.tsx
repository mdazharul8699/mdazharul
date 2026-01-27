"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiFacebook } from "react-icons/fi";

export default function Contact() {
  const theme = useTheme();

  return (
    <section id="contact" className="py-24 relative overflow-hidden text-white">
      {/* ব্যাকগ্রাউন্ড আভা */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 80% 80%, ${theme.color}44, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
              Get In <span style={{ color: theme.color }}>Touch</span>
            </h2>
            <p className="text-gray-400 font-light text-lg italic">
              {"Let's build something extraordinary together."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* বাম পাশ: কন্টাক্ট ইনফো (৪ কলাম) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-white/20 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: `${theme.color}20`, color: theme.color }}>
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Email Me</p>
                    <p className="text-lg font-bold">freelancermdazharul@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-white/20 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: `${theme.color}20`, color: theme.color }}>
                    <FiPhone />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Call Me</p>
                    <p className="text-lg font-bold">+880 01913958872</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-white/20 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: `${theme.color}20`, color: theme.color }}>
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Location</p>
                    <p className="text-lg font-bold">Moharajpur, Moharajpur, Khulna, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* সোশ্যাল মিডিয়া লিঙ্ক */}
              <div className="flex gap-4 pt-4">
                {[
                  { icon: <FiGithub />, link: "#" },
                  { icon: <FiLinkedin />, link: "#" },
                  { icon: <FiFacebook />, link: "#" },
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link} 
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:scale-110 transition-all"
                    style={{ color: theme.color }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ডান পাশ: কন্টাক্ট ফর্ম (৭ কলাম) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <form className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-gray-500 ml-2">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-gray-500 ml-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-gray-500 ml-2">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Project Inquiry" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-gray-500 ml-2">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell me about your project..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-all resize-none"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-2xl font-black text-black uppercase tracking-widest flex items-center justify-center gap-3 transition-shadow"
                  style={{ backgroundColor: theme.color, boxShadow: `0 20px 40px -10px ${theme.color}66` }}
                >
                  Send Message <FiSend className="text-xl" />
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}