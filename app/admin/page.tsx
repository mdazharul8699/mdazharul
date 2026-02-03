"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FiMessageSquare, FiStar, FiUsers, FiActivity } from "react-icons/fi";

export default function AdminDashboard() {
  const theme = useTheme();

  const stats = [
    { label: "Total Messages", value: "24", icon: <FiMessageSquare /> },
    { label: "Pending Reviews", value: "12", icon: <FiStar /> },
    { label: "Active Visitors", value: "1.2k", icon: <FiUsers /> },
    { label: "Server Status", value: "Online", icon: <FiActivity /> },
  ];

  return (
    <div className="space-y-12 mt-20 md:mt-0">
      <header>
        <h2 className="text-5xl font-black uppercase italic tracking-tighter">Command <span style={{ color: theme.color }}>Center</span></h2>
        <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase mt-2">Welcome back, Commander Azharul.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative group overflow-hidden"
          >
            <div className="text-3xl mb-4" style={{ color: theme.color }}>{stat.icon}</div>
            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
            <div className="text-3xl font-black mt-1">{stat.value}</div>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/[0.02] group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Quick Action Area */}
      <div className="p-10 rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
        <p className="text-gray-600 font-mono text-xs uppercase mb-4 italic">Waiting for new transmissions...</p>
        <div className="w-16 h-[2px] bg-white/10" />
      </div>
    </div>
  );
}