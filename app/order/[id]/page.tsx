"use client";
import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// ১. টাইপ ইন্টারফেস তৈরি করুন (যাতে TS এরর না দেয়)
interface PlanType {
  name: string;
  price: string;
  features: string[];
  description: string;
}

// ২. অবজেক্টে টাইপ অ্যাসাইন করুন
const PRICING_PLANS: Record<string, PlanType> = {
  "starter": {
    name: "Starter Plan",
    price: "$99",
    features: ["Basic Web App", "Social Media Integration", "24/7 Support"],
    description: "Perfect for individuals starting their digital journey."
  },
  "pro": {
    name: "Business Growth",
    price: "$249",
    features: ["Advanced React App", "SEO Optimization", "Priority Support"],
    description: "Best for growing businesses needing professional solutions."
  },
  "enterprise": {
    name: "Enterprise Custom",
    price: "$499",
    features: ["Full Stack System", "High Security", "Dedicated Manager"],
    description: "Tailor-made solutions for large scale organizations."
  }
};

export default function OrderPage() {
  const params = useParams();
  const theme = useTheme();
  
  // ৩. স্লাগ রিসিভ করা এবং টাইপ এনসিওর করা
  const planId = params?.id as string; 
  const plan = PRICING_PLANS[planId];

  // যদি ভুল ID আসে তবে এরর হ্যান্ডলিং
  if (!plan) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <h2 className="text-xl font-mono uppercase tracking-widest text-red-500">
          [Error] Plan Not Found_
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020202] text-white py-24 px-6 relative">
      {/* Background Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-10 blur-[120px]" style={{ backgroundColor: theme.color }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left: Selected Plan Overview */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h3 className="text-xs font-black uppercase tracking-[0.5em] mb-4" style={{ color: theme.color }}>Configuring Service</h3>
             <h1 className="text-7xl font-[1000] italic uppercase leading-none mb-10">{plan.name}</h1>
             
             <div className="space-y-6">
                <div className="p-8 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-3xl">
                   <p className="text-gray-400 text-lg mb-6 font-light">{plan.description}</p>
                   <div className="text-5xl font-black mb-8">{plan.price}</div>
                   
                   <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm text-gray-300">
                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.color }} />
                           {feature}
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </motion.div>

          {/* Right: Modern Order Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <form className="bg-[#080808] p-10 md:p-14 rounded-[50px] border border-white/5 shadow-2xl relative overflow-hidden">
               {/* Form Header */}
               <div className="mb-10">
                  <h2 className="text-3xl font-black uppercase italic mb-2">Initialize Project</h2>
                  <p className="text-xs text-gray-500 font-mono tracking-widest">SUBMIT DATA FOR PROCESSING_</p>
               </div>

               <div className="space-y-8">
                  <div className="relative group">
                     <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Client Identity</label>
                     <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-all text-xl font-medium" />
                  </div>

                  <div className="relative group">
                     <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Communication Gateway</label>
                     <input type="email" placeholder="email@address.com" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-all text-xl font-medium" />
                  </div>

                  <div className="relative group">
                     <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Project Objective</label>
                     <textarea placeholder="Describe your vision..." rows={3} className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-all text-xl font-medium resize-none" />
                  </div>

                  <button className="w-full py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs mt-10 transition-all hover:scale-[1.02] shadow-2xl"
                          style={{ backgroundColor: theme.color, color: "#000" }}>
                     Transmit Request
                  </button>
               </div>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}