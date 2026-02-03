"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FiMessageSquare, FiStar, FiActivity, FiShield } from "react-icons/fi";

export default function AdminDashboard() {
  const theme = useTheme();
  const [stats, setStats] = useState({ messages: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (data.success) {
          setStats({ messages: data.messages, reviews: data.reviews });
        }
      } catch (err) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Messages", value: stats.messages, icon: <FiMessageSquare />, color: theme.color },
    { label: "Total Reviews", value: stats.reviews, icon: <FiStar />, color: "#a855f7" },
    { label: "Security Level", value: "ELITE", icon: <FiShield />, color: "#22c55e" },
    { label: "System Status", value: "ONLINE", icon: <FiActivity />, color: "#eab308" },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-5xl font-black uppercase italic tracking-tighter">
          Command <span style={{ color: theme.color }}>Center</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase mt-2">
          REAL-TIME DATA STREAM SYNCHRONIZED
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative group overflow-hidden"
          >
            <div className="text-3xl mb-4" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
            
            {loading ? (
              <div className="h-9 w-16 bg-white/5 animate-pulse rounded mt-1" />
            ) : (
              <div className="text-4xl font-black mt-1 tabular-nums">{stat.value}</div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* System Status Log */}
      <div className="p-8 rounded-[3rem] border border-white/5 bg-white/[0.01] font-mono">
        <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-4 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" /> Live System Logs
        </div>
        <div className="space-y-2 text-[11px] text-gray-600 italic">
          <p>[{new Date().toLocaleTimeString()}] : Initializing Azharul_OS... DONE</p>
          <p>[{new Date().toLocaleTimeString()}] : Fetching Database Records... SUCCESS</p>
          <p>[{new Date().toLocaleTimeString()}] : All systems operational.</p>
        </div>
      </div>
    </div>
  );
}