"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiUser, FiCalendar, FiTrash2, FiMessageSquare, FiSend, FiCheckCircle, FiClock } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

export default function AdminMessages() {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [sendingId, setSendingId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleReply = async (msg: any) => {
    const text = replyText[msg._id];
    if (!text?.trim()) return alert("বস্, কিছু তো লিখুন!");

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
        // ইমেইল পাঠানোর পর স্ট্যাটাস 'completed' করা
        await fetch(`/api/admin/messages/${msg._id}`, { method: "PATCH" });
        alert("✅ Reply Sent & Status Updated!");
        setReplyText({ ...replyText, [msg._id]: "" });
        fetchMessages(); // লিস্ট রিফ্রেশ করা
      }
    } catch (error) { alert("Error sending reply!"); } 
    finally { setSendingId(null); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("বস্, ডিলিট করবেন?")) return;
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (res.ok) setMessages(messages.filter((m: any) => m._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Inbox <span style={{ color: theme.color }}>Central</span>
            </h1>
            <p className="text-gray-500 font-mono text-[10px] mt-2 tracking-[.4em]">ADMIN_COMMUNICATION_HUB</p>
          </div>
          <div className="text-right hidden md:block">
             <p className="text-3xl font-black tabular-nums">{messages.length}</p>
             <p className="text-[9px] text-gray-600 uppercase tracking-widest font-mono">Total Logs</p>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20 text-cyan-500 animate-pulse font-mono tracking-widest">LOADING_TRANSMISSIONS...</div>
        ) : (
          <div className="grid gap-10">
            <AnimatePresence>
              {messages.map((msg: any, idx: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={msg._id}
                  className={`group p-8 rounded-[2.5rem] bg-white/[0.02] border transition-all relative overflow-hidden ${msg.status === 'completed' ? 'border-green-500/20' : 'border-white/5 hover:border-white/10'}`}
                >
                  {/* Status Badge */}
                  <div className={`absolute top-6 right-20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1 ${msg.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500 animate-pulse'}`}>
                    {msg.status === 'completed' ? <><FiCheckCircle /> Completed</> : <><FiClock /> Unread</>}
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10" style={{ color: theme.color }}>
                          <FiUser />
                        </div>
                        <div>
                          <h3 className="font-black text-lg uppercase tracking-tight">{msg.name}</h3>
                          <p className="text-[10px] text-gray-500 font-mono">{msg.email}</p>
                        </div>
                      </div>
                      <button onClick={() => handleDelete(msg._id)} className="p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                        <FiTrash2 />
                      </button>
                    </div>

                    {/* মূল মেসেজ - হাই অপাসিটি */}
                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 relative">
                      <p className="text-gray-100 text-sm leading-relaxed font-medium">
                        {msg.message}
                      </p>
                    </div>

                    {/* Reply Section */}
                    {msg.status !== 'completed' && (
                      <div className="space-y-3 mt-2">
                        <textarea
                          placeholder="আপনার রিপ্লাই লিখুন..."
                          value={replyText[msg._id] || ""}
                          onChange={(e) => setReplyText({ ...replyText, [msg._id]: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs focus:outline-none focus:border-white/30 transition-all h-24"
                        />
                        <button
                          onClick={() => handleReply(msg)}
                          disabled={sendingId === msg._id}
                          style={{ backgroundColor: theme.color }}
                          className="px-6 py-3 rounded-xl text-black font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
                        >
                          {sendingId === msg._id ? "Processing..." : <>Send Reply & Complete <FiSend /></>}
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-[9px] font-mono text-gray-600 uppercase pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1"><FiCalendar /> {new Date(msg.createdAt).toLocaleDateString()}</span>
                      <span>|</span>
                      <span>ID: {msg._id.slice(-6)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}