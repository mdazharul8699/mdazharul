"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// আপনার পার্সোনাল ডেটা যা AI রিপ্লাই দিবে
const myInfo: Record<string, string> = {
  "name": "আমার নাম মো. আজহারুল।",
  "skill": "আমি HTML5, CSS, JS, React, Node.js, MongoDB, Tailwind CSS এবং Bootstrap-এ দক্ষ।",
  "education": "আমি ২০২২ সালে SSC-তে GPA 5.00 এবং ২০২৪ সালে HSC-তে GPA 4.42 পেয়েছি।",
  "drone": "ড্রোন আমার ড্রিম প্রজেক্ট! আমি বিশেষ করে ইরানের Shahed-136 ড্রোনের ডিজাইন নিয়ে কাজ করছি।",
  "contact": "আপনি আমার সাথে এই পোর্টফোলিওর মাধ্যমে যোগাযোগ করতে পারেন।",
  "default": "আমি আপনার প্রশ্নটি ঠিক বুঝিনি। আপনি আমার নাম, দক্ষতা, রেজাল্ট বা ড্রোন প্রজেক্ট নিয়ে জিজ্ঞেস করতে পারেন।"
};

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "হ্যালো আজহারুল ভক্ত! আমি তার AI এসিস্ট্যান্ট। কি জানতে চান?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // অটো স্ক্রল ডাউন
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.toLowerCase();
    const newMsgs = [...messages, { text: input, sender: "user" }];
    setMessages(newMsgs);
    setInput("");

    // অটো রিপ্লাই লজিক
    setTimeout(() => {
      let botReply = myInfo.default;
      if (userText.includes("নাম") || userText.includes("name")) botReply = myInfo.name;
      else if (userText.includes("কাজ") || userText.includes("skill")) botReply = myInfo.skill;
      else if (userText.includes("রেজাল্ট") || userText.includes("ssc") || userText.includes("hsc")) botReply = myInfo.education;
      else if (userText.includes("drone") || userText.includes("ড্রোন")) botReply = myInfo.drone;

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* চ্যাট ওপেন করার বাটন */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-cyan-500 shadow-[0_0_20px_#22d3ee] flex items-center justify-center text-2xl hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? "❌" : "🤖"}
      </button>

      {/* চ্যাট উইন্ডো */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="absolute bottom-20 right-0 w-[320px] md:w-[380px] h-[450px] bg-[#0d1117]/95 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* চ্যাট হেডার */}
            <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-transparent border-b border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-sm shadow-[0_0_10px_#22d3ee]">AI</div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-widest">Azharul Bot</h4>
                <p className="text-[10px] text-cyan-400">অটো-রিপ্লাই মোড</p>
              </div>
            </div>

            {/* মেসেজ এরিয়া */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user" 
                    ? "bg-cyan-500 text-black font-bold" 
                    : "bg-white/5 text-gray-200 border border-white/10"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            {/* ইনপুট এরিয়া */}
            <div className="p-4 bg-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="প্রশ্ন করুন..."
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-xs text-white outline-none focus:border-cyan-500 transition-all"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors"
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