"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";

const plans = [
  {
    id: "starter", // এই আইডিটি ডাইনামিক লিঙ্কের জন্য জরুরি
    name: "Starter Solution",
    price: "$99",
    features: ["Single Page Architecture", "Next.js High Performance", "Tailwind CSS Styling", "Core SEO Setup", "Mobile-First Design", "Basic Deployment"],
  },
  {
    id: "pro", // PRICING_PLANS অবজেক্টের কী-এর সাথে মিল রেখে
    name: "Business Growth",
    price: "$249",
    features: ["Multi-page Web App", "Advanced Next.js Routing", "Framer Motion Animations", "Full SEO Optimization", "Fast Loading (90+ Score)", "Social Media Integration"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Custom",
    price: "$499",
    features: ["Full-Stack Application", "MongoDB Database", "Admin Panel Integration", "E-commerce System", "API Development", "Priority Maintenance"],
  }
];

export default function Pricing() {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-32 relative min-h-screen flex items-center overflow-hidden bg-[#020202]">
      
      {/* পর্দা এনিমেশন */}
      <motion.div 
        initial={{ y: 0 }}
        whileInView={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-black z-[50]"
      />

      {/* উজ্জ্বল কোণার আলো */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] blur-[160px] rounded-full"
          style={{ backgroundColor: theme.color }}
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] blur-[180px] rounded-full"
          style={{ backgroundColor: theme.color }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white uppercase opacity-50 select-none">
            Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="group relative"
            >
              {/* ইলেকট্রিক হোভার বর্ডার */}
              <div 
                className="absolute -inset-[1px] rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md z-0"
                style={{ backgroundColor: theme.color }}
              />

              <div className="relative h-full p-10 rounded-[40px] bg-black border border-white/10 backdrop-blur-3xl flex flex-col items-center overflow-hidden z-10">
                
                {plan.popular && (
                  <div 
                    className="absolute top-0 right-0 px-8 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest z-20"
                    style={{ backgroundColor: theme.color, color: "#000" }}
                  >
                    Best Value
                  </div>
                )}

                <h3 
                  className="text-xs font-bold tracking-[0.6em] mb-8 uppercase transition-all duration-300"
                  style={{ color: hoveredIndex === index ? "white" : "#666" }}
                >
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-12">
                  <span className="text-6xl font-black text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 text-sm">/start</span>
                </div>

                <ul className="space-y-5 mb-12 w-full">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-[13px] text-gray-400 group-hover:text-white transition-all">
                      <div 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: theme.color, boxShadow: `0 0 10px ${theme.color}` }} 
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* এখানে লিঙ্কটি আপনার ডাইনামিক অর্ডার পেজের সাথে কানেক্ট করা হলো */}
                <Link href={`/order/${plan.id}`} className="w-full mt-auto ">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${theme.color}40` }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-5 rounded-2xl font-black cursor-pointer text-[11px] uppercase tracking-[0.4em] transition-all border border-white/10"
                    style={{ 
                      backgroundColor: plan.popular ? theme.color : "transparent",
                      color: plan.popular ? "#000" : "#fff"
                    }}
                  >
                    Initiate Project
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}