"use client";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiSend, FiUser, FiMessageSquare, FiClock } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const theme = useTheme();
  const [review, setReview] = useState("");
  const [myReviews, setMyReviews] = useState([]); // ইউজারের নিজের রিভিউ এর জন্য

  // ১. ইউজারের নিজের রিভিউগুলো ফেচ করার ফাংশন
  const fetchMyReviews = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`/api/get-reviews?email=${session.user.email}`);
      const data = await res.json();
      setMyReviews(data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    if (session) fetchMyReviews();
  }, [session]);

  if (!session) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono tracking-widest">ACCESS DENIED...</div>;

  const handleSubmitReview = async () => {
    if (!review.trim()) return alert("বস্, কিছু তো লিখুন!");

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          userName: session?.user?.name, // আপনার API অনুযায়ী কী-নাম ঠিক রাখুন
          userImage: session?.user?.image,
          message: review,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Secret Review Received! " + session.user?.name);
        setReview(""); 
        fetchMyReviews(); // নতুন রিভিউ দেওয়ার পর লিস্ট রিফ্রেশ করা
      } else {
        alert("❌ ডাটাবেজে সেভ হতে সমস্যা হয়েছে!");
      }
    } catch (error) {
      alert("❌ সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না!");
    }
  };

  return (
    <div className="min-h-screen mt-20 md:mt-40 bg-[#020202] text-white p-4 md:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ background: theme.color }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              User <span style={{ color: theme.color }}>Console</span>
            </h1>
            <p className="text-gray-500 text-xs tracking-[0.3em] mt-2 font-mono">ENCRYPTED_SESSION_ACTIVE</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-2 pr-6 rounded-full border border-white/10 backdrop-blur-md">
            <img src={session.user?.image || ""} alt="User" className="w-12 h-12 rounded-full border-2" style={{ borderColor: theme.color }} />
            <div>
              <p className="text-sm font-bold">{session.user?.name}</p>
              <button onClick={() => signOut()} className="text-[10px] text-red-500 font-bold tracking-widest flex items-center gap-1 hover:opacity-70 transition-all uppercase">
                <FiLogOut /> Terminate Session
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <FiUser className="text-4xl mb-4" style={{ color: theme.color }} />
              <h3 className="text-xl font-black mb-2 uppercase">Profile Data</h3>
              <div className="space-y-4 text-sm font-mono text-gray-400">
                <p className="truncate">ID: {session.user?.email}</p>
                <p>STATUS: AUTHORIZED</p>
                <p>RANK: ELITE_VISITOR</p>
              </div>
            </motion.div>
          </div>

          {/* Submission Box */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 italic font-black text-6xl select-none">SECRET</div>
              <div className="flex items-center gap-3 mb-6">
                <FiMessageSquare className="text-2xl" style={{ color: theme.color }} />
                <h3 className="text-2xl font-black uppercase italic">Submit Secret Review</h3>
              </div>
              <textarea 
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="আপনার মতামত আমাদের ডাটাবেজে এনক্রিপ্ট করে রাখা হবে..."
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-sm focus:outline-none focus:border-white transition-all min-h-[150px] resize-none mb-6 font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${theme.color}44` }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitReview}
                className="px-10 py-5 rounded-2xl font-black text-black uppercase tracking-[.3em] flex items-center gap-3 transition-all w-full md:w-auto justify-center"
                style={{ backgroundColor: theme.color }}
              >
                Dispatch Review <FiSend />
              </motion.button>
            </motion.div>

            {/* ইউজারের নিজের রিভিউ লিস্ট */}
            <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-2 text-gray-500">
                    <FiClock style={{ color: theme.color }} /> Your Transmission History
                </h3>
                <AnimatePresence>
                    {myReviews.map((rev: any, index: number) => (
                        <motion.div 
                            key={rev._id || index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col gap-3"
                        >
                            <p className="text-gray-300 text-sm italic font-medium">"{rev.message}"</p>
                            <div className="flex justify-between items-center border-t border-white/5 pt-4">
                                <span className="text-[10px] font-mono text-gray-600 uppercase">Status: Published_to_home</span>
                                <span className="text-[10px] font-mono" style={{ color: theme.color }}>#{index + 101}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {myReviews.length === 0 && (
                    <p className="text-xs font-mono text-gray-700 italic">No previous transmissions found in database.</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}