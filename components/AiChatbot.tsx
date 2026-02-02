"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { text: "হ্যালো! আমি আজহারুলের স্মার্ট এসিস্ট্যান্ট। আজহারুল সম্পর্কে কী জানতে চান?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userText }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages((prev) => [...prev, { text: data.text, sender: "bot" }]);
      } else {
        throw new Error(data.error || "No response");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev, 
        { text: "দুঃখিত বস্, সার্ভারে সমস্যা হচ্ছে।", sender: "bot" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-cyan-500 shadow-[0_0_25px_rgba(34,211,238,0.5)] flex items-center justify-center text-3xl transition-all hover:scale-110 active:scale-90 relative"
      >
        {isOpen ? "✕" : "🤖"}
        {!isOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-ping"></span>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="absolute bottom-20 right-0 w-[340px] md:w-[420px] h-[550px] bg-[#0c0c0e]/95 border border-cyan-500/20 backdrop-blur-3xl rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
          >
            <div className="p-5 bg-gradient-to-r from-cyan-500/20 to-transparent flex items-center gap-4 border-b border-white/5">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500 p-1 flex items-center justify-center text-cyan-500 font-bold italic text-xl">A</div>
              <div>
                <h4 className="text-white font-bold tracking-tight">Azharul AI Concierge</h4>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">System Online</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                    m.sender === "user" 
                    ? "bg-cyan-500 text-black font-bold rounded-tr-none shadow-lg shadow-cyan-500/20" 
                    : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-4 py-2 rounded-2xl flex gap-1 items-center border border-white/10">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            <div className="p-5 bg-black/40 border-t border-white/5 flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about Projects, Skills..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center hover:bg-cyan-400 transition-all disabled:opacity-50"
              >
                🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}