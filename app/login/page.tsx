"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FiMail, FiLock, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (provider: string) => {
    // এখানে 'google' বা 'github' প্রোভাইডার কাজ করবে
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড গ্লো (আপনার থিমের সাথে মিল রেখে) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: theme.color }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic" style={{ color: theme.color }}>
            Access Portal
          </h2>
          <p className="text-gray-500 text-xs mt-2 tracking-widest uppercase">Login to Azharul's Dashboard</p>
        </div>

        <div className="space-y-6">
          {/* গুগল লগইন বাটন */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLogin('google')}
            className="w-full py-4 rounded-2xl border border-white/10 flex items-center justify-center gap-4 text-sm font-bold tracking-widest transition-all"
          >
            <FcGoogle className="text-2xl" /> CONTINUE WITH GOOGLE
          </motion.button>

          <div className="flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-white/10"></div>
            <span className="text-[10px] text-gray-600 font-mono">OR USE CREDENTIALS</span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          {/* কাস্টম লগইন ফর্ম */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="email" 
                placeholder="EMAIL" 
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:outline-none focus:border-white transition-all tracking-widest"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="password" 
                placeholder="PASSWORD" 
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:outline-none focus:border-white transition-all tracking-widest"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${theme.color}44` }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-2xl font-black text-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: theme.color }}
            >
              INVOKE SESSION
            </motion.button>
          </form>
        </div>

        <p className="text-center text-[10px] text-gray-600 mt-8 tracking-widest uppercase">
          New here? <span style={{ color: theme.color }} className="cursor-pointer font-bold">Initialize Identity</span>
        </p>
      </motion.div>
    </div>
  );
}