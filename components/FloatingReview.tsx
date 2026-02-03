"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiStar, FiUser } from "react-icons/fi"; // FiUser ব্যাকআপ হিসেবে
import { useTheme } from "@/context/ThemeContext";
import { useSession } from "next-auth/react";

export default function FloatingReview() {
  const theme = useTheme();
  const { data: session } = useSession();

  // লগইন থাকলে ড্যাশবোর্ড বা রিভিউ পেজ, না থাকলে লগইন পেজ
  const targetPath = session ? "/dashboard" : "/login";

  return (
    <div className="fixed bottom-28 right-6 z-[99]">
      <Link href={targetPath}>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center group cursor-pointer"
        >
          {/* Glowing Label - এখানে নাম দেখাবে */}
          <div className="mr-[-15px] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <span className="bg-black/80 backdrop-blur-xl text-white text-[10px] font-black py-2 px-4 rounded-l-full border border-white/10 tracking-widest uppercase whitespace-nowrap">
              {session?.user?.name ? (
                <>Hi, <span style={{ color: theme.color }}>{session.user.name.split(' ')[0]}</span></>
              ) : (
                <>Give Me <span style={{ color: theme.color }}>Review</span></>
              )}
            </span>
          </div>

          {/* Icon/Photo Circle */}
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl border"
            style={{ 
              backgroundColor: "#080808", 
              borderColor: `${theme.color}44`,
              boxShadow: `0 0 20px ${theme.color}33`
            }}
          >
            {/* Animated Pulse Ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${theme.color}` }}
            />

            {/* ইউজার ছবি থাকলে ছবি, না থাকলে স্টার আইকন */}
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="User" 
                className="w-full h-full object-cover relative z-10 p-[2px] rounded-full"
              />
            ) : (
              <FiStar 
                className="text-2xl relative z-10 group-hover:rotate-[144deg] transition-transform duration-500" 
                style={{ color: theme.color }} 
              />
            )}
          </div>

          {/* background glow */}
          <div 
            className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
            style={{ backgroundColor: theme.color }}
          />
        </motion.div>
      </Link>
    </div>
  );
}