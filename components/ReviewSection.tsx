"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiShield, FiInbox } from "react-icons/fi";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // লোডিং স্টেট যুক্ত করা হয়েছে
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch("/api/get-reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data || []); // নিশ্চিত করা হচ্ছে যেন ডাটা সবসময় array হয়
        setIsLoading(false);
      })
      .catch(() => {
        setReviews([]);
        setIsLoading(false);
      });
  }, []);

// এই অংশটুকু আপনার কোডে আপডেট করুন
const firstRow = (reviews && Array.isArray(reviews)) 
  ? reviews.slice(0, Math.ceil(reviews.length / 2)) 
  : [];
 const secondRow = (reviews && Array.isArray(reviews)) 
  ? reviews.slice(Math.ceil(reviews.length / 2)) 
  : [];
  const colors = ["#06b6d4", "#a855f7", "#84cc16"];

  return (
    <div className="py-24 bg-[#050505] overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Secret <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Reviews</span>
          </h2>
          <p className="text-gray-500 text-xs tracking-[0.4em] mt-4 uppercase flex items-center justify-center md:justify-start gap-2">
            <FiShield className="text-cyan-500" /> Authorized Access Only. All Data Encrypted.
          </p>
        </div>
        
        <Link href="/review" className="group px-8 py-4 bg-cyan-500 text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          VIEW ALL <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Conditional Rendering: রিভিউ না থাকলে বা লোড হলে কি দেখাবে */}
      {isLoading ? (
        <div className="text-center py-20 text-cyan-500 animate-pulse font-mono tracking-widest uppercase">
          Decrypting Reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-white/5 mx-6 rounded-[2rem] bg-white/[0.01]">
          <FiInbox className="text-5xl text-gray-700 mb-4" />
          <h3 className="text-xl font-black italic text-gray-500 uppercase tracking-widest">No Reviews Found</h3>
          <p className="text-gray-600 text-xs mt-2 font-mono">ENCRYPTED_DATABASE_EMPTY</p>
        </div>
      ) : (
        <div 
          className="flex flex-col gap-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Row 1 */}
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div 
              animate={{ x: isPaused ? undefined : [0, -1500] }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 pr-8"
            >
              {[...firstRow, ...firstRow, ...firstRow]?.map((rev, i) => (
                <PremiumReviewCard key={i} rev={rev} borderColor={colors[i % colors.length]} />
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          {secondRow.length > 0 && (
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <motion.div 
                animate={{ x: isPaused ? undefined : [-1500, 0] }} 
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="flex gap-8 pr-8"
              >
                {[...secondRow, ...secondRow, ...secondRow]?.map((rev, i) => (
                  <PremiumReviewCard key={i} rev={rev} borderColor={colors[(i + 1) % colors.length]} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PremiumReviewCard({ rev, borderColor }: { rev: any, borderColor: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      style={{ borderColor: borderColor + "33" }} 
      className="w-[400px] shrink-0 p-8 rounded-[2rem] bg-white/[0.02] border backdrop-blur-2xl relative group transition-all duration-500 hover:bg-white/[0.04]"
    >
      <div 
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 40px ${borderColor}15`, border: `1px solid ${borderColor}` }}
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative p-[2px] rounded-full" style={{ background: `linear-gradient(45deg, ${borderColor}, transparent)` }}>
            <img src={rev?.userImage || "/default-avatar.png"} alt="" className="w-12 h-12 rounded-full bg-black object-cover" />
          </div>
          <div>
            <h4 className="font-black text-white group-hover:text-white transition-colors uppercase italic tracking-tighter">{rev?.userName || "Anonymous"}</h4>
            <p className="text-[10px] text-gray-500 font-mono">STATUS: VERIFIED_VISITOR</p>
          </div>
        </div>
        <div className="text-[10px] font-mono p-1 px-2 rounded bg-white/5 text-gray-400" style={{ color: borderColor }}>#{Math.floor(Math.random() * 9000) + 1000}</div>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed font-medium group-hover:text-gray-200 transition-colors italic">
        {rev?.message || "No message provided."}
      </p>

      <div className="mt-6 flex justify-between items-center">
         <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="w-8 h-[2px] rounded-full mt-[2px]" style={{ backgroundColor: borderColor }} />
         </div>
         <span className="text-[10px] font-black italic opacity-20" style={{ color: borderColor }}>AZHARUL_DEV</span>
      </div>
    </motion.div>
  );
}