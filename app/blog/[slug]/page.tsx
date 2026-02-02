"use client";
import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext"; 
import Link from "next/link";

interface PostData {
  title: string;
  date: string;
  mainImage: string;
  subImages: string[];
  intro: string;
  details: string;
  conclusion: string;
  tags: string[];
}

const BLOG_DATA: Record<string, PostData> = {
  "nextjs-future": {
    title: "Next.js 15: The Future of Web Architecture",
    date: "Feb 02, 2026",
    // আরও রিলায়েবল লিঙ্ক ব্যবহার করলাম
    mainImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1200",
    subImages: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    ],
    intro: "Next.js 15 is not just an update; it's a paradigm shift in how we build high-performance web applications.",
    details: "The introduction of Partial Prerendering (PPR) and refined Server Actions means we can now combine the speed of static sites with the power of dynamic applications seamlessly. It reflects the dedication to logic and precision that allowed me to achieve a GPA 5.00.",
    conclusion: "The future of web development is server-centric, yet incredibly fast.",
    tags: ["Next.js", "Vercel", "Performance"]
  },
  "drone-vision": {
    title: "Shahed-136: Aerodynamics & Vision Control",
    date: "Feb 01, 2026",
    mainImage: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1200",
    subImages: [
      "https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524146028014-8fba2949c316?auto=format&fit=crop&q=80&w=800"
    ],
    intro: "The engineering behind the Shahed-136 is a masterclass in cost-effective aerodynamics.",
    details: "Using AI-driven vision control, these systems can identify terrain features in real-time. The integration of complex algorithms allows for rapid data processing and flight path adjustments.",
    conclusion: "The fusion of robotics and software is the next frontier.",
    tags: ["Drones", "AI", "Robotics"]
  },
  "framer-motion-pro": {
    title: "Framer Motion: Advanced Interaction Design",
    date: "Jan 28, 2026",
    mainImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    subImages: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800"
    ],
    intro: "Mastering animations in React with Framer Motion.",
    details: "Creating production-ready animations that enhance UX without hurting performance.",
    conclusion: "Mastering motion is key to building world-class interfaces.",
    tags: ["UI/UX", "Animation"]
  }
};
export default function BlogDetails() {
  const params = useParams();
  const theme = useTheme();
  const slug = params?.slug as string;
  const post = BLOG_DATA[slug];

  if (!post) return <div className="text-white text-center py-40 font-bold">SYSTEM ERROR: POST_NOT_FOUND</div>;

  return (
    <main className="min-h-screen bg-black text-white pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Dynamic Background Aura */}
      <div className="absolute top-0 left-0 w-full h-[800px] opacity-10 blur-[150px] pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${theme.color}, transparent)` }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <Link href="/#blog">
          <motion.button whileHover={{ x: -8 }} className="mb-12 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-all">
            <span style={{ color: theme.color }}>←</span> Back to Journal
          </motion.button>
        </Link>

        {/* Title Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 mb-16 text-gray-400">
            <p className="font-mono text-xs uppercase tracking-widest">{post.date}</p>
            <div className="h-4 w-[1px] bg-gray-800" />
            <div className="flex gap-3">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: theme.color }}>#{tag}</span>
              ))}
            </div>
          </div>

          {/* Main Hero Image */}
          <div className="relative w-full aspect-video rounded-[32px] overflow-hidden border border-white/5 mb-16 shadow-2xl">
            <img src={post.mainImage} alt="Main" className="w-full h-full object-cover" />
          </div>

          {/* Content Area */}
          <div className="space-y-12">
            {/* Intro - Bold and Large */}
            <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-200">
              {post.intro}
            </p>

            {/* Sub Images Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
              {post.subImages.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-xl">
                  <img src={img} alt={`Detail ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Details - High Readability */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold uppercase tracking-widest border-l-4 pl-6" style={{ borderColor: theme.color }}>
                Technical Breakdown
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
                {post.details}
              </p>
            </div>

            {/* Conclusion Box */}
            <div className="p-8 md:p-12 rounded-[32px] bg-white/[0.02] border border-white/5 mt-16">
              <p className="text-lg md:text-xl text-gray-300 italic font-serif leading-relaxed">
                {post.conclusion}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Contact */}
        <div className="mt-32 pt-12 border-t border-white/10 text-center">
            <Link href="/#contact">
               <motion.button 
                 whileHover={{ scale: 1.05 }} 
                 className="px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-lg"
                 style={{ backgroundColor: theme.color, color: '#000' }}
               >
                  Start a Conversation
               </motion.button>
            </Link>
        </div>
      </div>
    </main>
  );
}