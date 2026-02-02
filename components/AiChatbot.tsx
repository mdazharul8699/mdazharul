"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const myInfo = {
  name: "আমার নাম মো. আজহারুল। আমি একজন প্রফেশনাল Next.js ও Full-Stack ডেভেলপার।",
  education: "আমি ২০২২ সালে SSC-তে GPA 5.00 এবং ২০২৪ সালে HSC-তে GPA 4.42 পেয়েছি। বর্তমানে আমি বিএল কলেজে রাষ্ট্রবিজ্ঞানে অনার্স করছি (সেশন ২০২৪-২০২৬)।",
  skills: "আমি HTML5, CSS, JS, React, Next.js, Node.js, MongoDB এবং Tailwind CSS-এ বিশেষজ্ঞ।",
  drone: "ড্রোন আমার প্যাশন! আমি বিশেষ করে ইরানের Shahed-136 ড্রোনের অ্যারোডাইনামিক ডিজাইন এবং টেকনোলজি নিয়ে কাজ করছি।",
  recommendation: "একটি আধুনিক ওয়েবসাইটের জন্য আমি সবসময় Next.js এবং Tailwind CSS রিকমেন্ড করি। কারণ এটি সুপার ফাস্ট (Fast-loading), SEO-Friendly এবং ইউজার এক্সপেরিয়েন্স দারুণ দেয়।",
  pricing: "প্রোজেক্টের ধরন এবং ফিচারের ওপর ভিত্তি করে বাজেট ঠিক হয়। আপনি আপনার আইডিয়া শেয়ার করলে আমি একটি সঠিক ধারণা দিতে পারব।"
};

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { text: "হ্যালো! আমি আজহারুলের স্মার্ট এসিস্ট্যান্ট। আপনার প্রজেক্ট বা আজহারুল সম্পর্কে কী জানতে চান?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.toLowerCase();
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "";

      // ১. পার্সোনাল ডাটা ফিল্টার
      if (userText.includes("নাম") || userText.includes("name") || userText.includes("identity")) {
        botReply = myInfo.name;
      } else if (userText.includes("রেজাল্ট") || userText.includes("ssc") || userText.includes("hsc") || userText.includes("porasuna") || userText.includes("result")) {
        botReply = myInfo.education;
      } else if (userText.includes("skill") || userText.includes("expert") || userText.includes("ki ki jano")) {
        botReply = myInfo.skills;
      } else if (userText.includes("drone") || userText.includes("shahed")) {
        botReply = myInfo.drone;
      } 
      
      // ২. ওয়েবসাইট কনসালটেন্সি (Next.js/Language advice)
      else if (userText.includes("language") || userText.includes("best framework") || userText.includes("kon language valo")) {
        botReply = "বর্তমান সময়ে " + myInfo.recommendation;
      } else if (userText.includes("next js") || userText.includes("nextjs")) {
        botReply = "Next.js হলো বর্তমানের সেরা ফ্রেমওয়ার্ক। এটি সার্ভার-সাইড রেন্ডারিং (SSR) সাপোর্ট করে, যা আপনার সাইটকে গুগলের এক নম্বর র‍্যাংকে আনতে সাহায্য করে।";
      } else if (userText.includes("wordpress") || userText.includes("wp")) {
        botReply = "WordPress সহজ, কিন্তু কাস্টম ফিচারের জন্য Next.js সেরা। আপনি যদি ইউনিক এবং ফাস্ট সাইট চান, তবে কোডিং করে বানানোই বুদ্ধিমানের কাজ হবে।";
      }

      // ৩. ক্লায়েন্ট লিড হ্যান্ডলিং
      else if (userText.includes("website banate") || userText.includes("price") || userText.includes("koto taka") || userText.includes("hire")) {
        botReply = "আজহারুল খুবই সাশ্রয়ী মূল্যে হাই-কোয়ালিটি সাইট তৈরি করে দেয়। " + myInfo.pricing + " আপনি কি আজহারুলের সাথে সরাসরি কথা বলতে চান?";
      }

      // ৪. জেনারেলাইজড নলেজ (AI Mode)
      else {
        botReply = "আমি আপনার প্রশ্নটি নিয়ে ভাবছি। আপনি কি আজহারুলের স্কিল, তার ড্রোন প্রজেক্ট, কিংবা কেন Next.js আপনার ব্যবসার জন্য সেরা—সেটি জানতে চাচ্ছেন? আমি সেই বিষয়েই আপনাকে সবথেকে ভালো তথ্য দিতে পারব।";
      }

      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
      setIsTyping(false);
    }, 1200); // টাইপিং অ্যানিমেশনের জন্য একটু লেট
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
            initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="absolute bottom-20 right-0 w-[340px] md:w-[420px] h-[550px] bg-[#0c0c0e]/95 border border-cyan-500/20 backdrop-blur-3xl rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-cyan-500/20 to-transparent flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500 p-1">
                <div className="w-full h-full rounded-full bg-cyan-500 flex items-center justify-center text-black font-black italic">A</div>
              </div>
              <div>
                <h4 className="text-white font-bold tracking-tight">Azharul AI Concierge</h4>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">System Online</span>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed transition-all ${
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

            {/* Input Area */}
            <div className="p-5 bg-black/40 border-t border-white/5 flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about Projects, Skills or Advice..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-gray-600"
              />
              <button 
                onClick={handleSend}
                className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}