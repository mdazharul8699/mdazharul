"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";

// ডেটাবেস অবজেক্ট - এখানে 'slug' যোগ করা হয়েছে যা URL-এ দেখাবে
const blogPosts = [
  {
    id: 1,
    slug: "nextjs-future", // এই স্লাগটি URL-এ যাবে
    title: "Next.js 15: The Future of Web Architecture",
    date: "Feb 02, 2026",
    tags: ["Next.js", "Vercel", "Performance"],
    imageUrl: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop", 
    excerpt: "Deep diving into the latest rendering patterns and why it's the ultimate choice for scale."
  },
  {
    id: 2,
    slug: "drone-vision",
    title: "Shahed-136: Aerodynamics & Vision Control",
    date: "Feb 01, 2026",
    tags: ["Drones", "AI", "Robotics"],
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop",
    excerpt: "An engineering perspective on autonomous flight systems and structural integrity."
  },
  {
    id: 3,
    slug: "framer-motion-pro",
    title: "Framer Motion: Advanced Interaction Design",
    date: "Jan 28, 2026",
    tags: ["UI/UX", "Animation", "React"],
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Creating fluid, production-ready animations that don't compromise on performance."
  }
];

export default function BlogSection() {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="blog" className="py-32 relative bg-[#020202] overflow-hidden">
      
      {/* Background Tech Grids & Orbs */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(${theme.color}10 1px, transparent 1px), linear-gradient(90deg, ${theme.color}10 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] blur-[150px] opacity-10 rounded-full" style={{ backgroundColor: theme.color }} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none"
            >
              TECH <span className="opacity-50 block md:inline">JOURNAL</span>
            </motion.h2>
            <p className="text-gray-500 mt-4 font-mono text-sm tracking-widest uppercase">
              {" Systematic sharing of knowledge and innovation"}
            </p>
          </div>
          <Link href="/blogs">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
            >
              View All Posts
            </motion.span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="relative h-full bg-[#080808] rounded-[32px] border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-white/20">
                
                <div className="relative h-64 overflow-hidden">
                  <motion.img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-60" />
                  
                  <div className="absolute top-4 left-4 px-4 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-400">
                    {post.date}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: theme.color }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* এখানে লিঙ্কটি ডায়নামিক করা হয়েছে */}
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 group/link cursor-pointer">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] transition-all" style={{ color: hoveredIndex === index ? theme.color : '#666' }}>
                      Read Analysis
                    </span>
                    <motion.div 
                      animate={hoveredIndex === index ? { x: 5 } : { x: 0 }}
                      className="w-8 h-[1px]" 
                      style={{ backgroundColor: hoveredIndex === index ? theme.color : '#333' }} 
                    />
                  </Link>
                </div>

                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="absolute top-[-25px] right-[-25px] w-12 h-12 rotate-45" style={{ backgroundColor: theme.color }} />
                </div>
              </div>

              <div 
                className="absolute -inset-2 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 -z-10 rounded-[40px]"
                style={{ backgroundColor: theme.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}