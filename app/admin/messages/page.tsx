"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiUser, FiCalendar, FiTrash2, FiMessageSquare, FiSend } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

export default function AdminMessages() {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [sendingId, setSendingId] = useState<string | null>(null);

  // ১. সব মেসেজ ফেচ করা
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  // ২. রিপ্লাই পাঠানোর ফাংশন
  const handleReply = async (msg: any) => {
    const text = replyText[msg._id];
    if (!text?.trim()) return alert("বস্, খালি রিপ্লাই পাঠানো যাবে না!");

    setSendingId(msg._id);
    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: msg.email,
          name: msg.name,
          message: msg.message,
          replyMessage: text,
        }),
      });

      if (res.ok) {
        alert("✅ Reply successfully sent to " + msg.email);
        setReplyText({ ...replyText, [msg._id]: "" });
      } else {
        alert("❌ ইমেইল পাঠাতে সমস্যা হয়েছে!");
      }
    } catch (error) {
      alert("❌ সার্ভার কানেকশন এরর!");
    } finally {
      setSendingId(null);
    }
  };

  // ৩. মেসেজ ডিলিট করার ফাংশন
  const handleDelete = async (id: string) => {
    if (!confirm("বস্, এই মেসেজটি কি চিরতরে ডিলিট করে দেব?")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m: any) => m._id !== id));
      }
    } catch (err) {
      alert("ডিলিট করতে সমস্যা হয়েছে!");
    }
  };

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
          <div className="grid gap-8">
            <AnimatePresence>
              {messages.map((msg: any, idx: number) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={msg._id}
                  className="group p-6 md:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 backdrop-blur-xl transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 italic font-black text-6xl select-none">{idx + 1}</div>

                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10" style={{ color: theme.color }}>
                          <FiUser className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg uppercase italic tracking-tighter">{msg.name}</h3>
                          <p className="text-xs text-gray-500 font-mono">{msg.email}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(msg._id)}
                        className="p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                      <p className="text-gray-300 text-sm leading-relaxed italic">"{msg.message}"</p>
                    </div>

                    {/* Reply Section */}
                    <div className="space-y-3">
                      <textarea
                        placeholder="Type your reply here..."
                        value={replyText[msg._id] || ""}
                        onChange={(e) => setReplyText({ ...replyText, [msg._id]: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs focus:outline-none focus:border-white/30 transition-all resize-none h-24"
                      />
                      <button
                        onClick={() => handleReply(msg)}
                        disabled={sendingId === msg._id}
                        style={{ backgroundColor: theme.color }}
                        className="px-6 py-3 rounded-xl text-black font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
                      >
                        {sendingId === msg._id ? "Sending..." : <>Dispatch Reply <FiSend /></>}
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600 uppercase pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1"><FiCalendar /> {new Date(msg.createdAt).toLocaleDateString()}</span>
                      <span className="text-gray-800">|</span>
                      <span style={{ color: theme.color }}>Encrypted Transmission</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

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