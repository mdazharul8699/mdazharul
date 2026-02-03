"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiCalendar, FiTrash2, FiMessageSquare } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

export default function AdminMessages() {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
            Inbox <span style={{ color: theme.color }}>Central</span>
          </h1>
          <p className="text-gray-500 font-mono text-[10px] mt-2 tracking-[.4em] uppercase">
            Total Transmissions: {messages.length}
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20 text-cyan-500 animate-pulse font-mono uppercase tracking-widest">
            Fetching Data Stream...
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg: any, idx: number) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={msg._id}
                className="group p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/20 backdrop-blur-xl transition-all relative overflow-hidden"
              >
                {/* Background Number */}
                <div className="absolute top-0 right-0 p-4 opacity-5 italic font-black text-6xl select-none group-hover:opacity-10 transition-opacity">
                  {idx + 1}
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5" style={{ color: theme.color }}>
                        <FiUser />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg uppercase tracking-tight">{msg.name}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 font-mono">
                          <FiMail className="text-[10px]" /> {msg.email}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                      <p className="text-gray-300 text-sm leading-relaxed italic">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600 uppercase">
                      <span className="flex items-center gap-1">
                        <FiCalendar /> {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span style={{ color: theme.color }}>Status: Unread</span>
                    </div>
                  </div>

                  <button className="p-4 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}

            {messages.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
                <FiMessageSquare className="text-4xl mx-auto mb-4 opacity-20" />
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">No Incoming Transmissions</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}