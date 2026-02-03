"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiTrash2, FiCheckCircle, FiXCircle, FiMessageSquare } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

export default function ManageReviews() {
  const theme = useTheme();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটা লোড করা
  const fetchReviews = async () => {
    const res = await fetch("/api/get-reviews"); // আপনার আগের তৈরি করা API
    const data = await res.json();
    setReviews(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  // ডিলিট ফাংশন
  const handleDelete = async (id: string) => {
    if (!confirm("বস্, এই রিভিউটা কি ডিলিট করে দিব?")) return;
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (res.ok) setReviews(reviews.filter((r: any) => r._id !== id));
  };

  // স্ট্যাটাস আপডেট (Approve/Reject)
  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "approved" ? "pending" : "approved";
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchReviews();
  };

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-5xl font-black uppercase italic tracking-tighter">
          Review <span style={{ color: theme.color }}>Control</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] tracking-[.3em] uppercase mt-2">
          Manage user feedback and visibility status.
        </p>
      </header>

      {loading ? (
        <div className="text-center py-20 text-cyan-500 animate-pulse font-mono uppercase tracking-widest">Loading Records...</div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence>
            {reviews.map((rev: any, idx: number) => (
              <motion.div
                key={rev._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img src={rev.userImage || "/default.png"} className="w-12 h-12 rounded-full border border-white/10" alt="" />
                  <div>
                    <h4 className="font-bold uppercase text-sm tracking-tight">{rev.userName}</h4>
                    <p className="text-gray-500 text-[10px] font-mono">{rev.email}</p>
                  </div>
                </div>

                <div className="flex-2 bg-white/[0.03] p-4 rounded-xl border border-white/5 w-full md:w-1/2">
                  <p className="text-gray-400 text-xs italic">"{rev.message}"</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Toggle Button */}
                  <button 
                    onClick={() => toggleStatus(rev._id, rev.status)}
                    className={`p-3 rounded-full transition-all ${rev.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}
                    title={rev.status === 'approved' ? "Hide from Home" : "Show on Home"}
                  >
                    {rev.status === 'approved' ? <FiCheckCircle /> : <FiXCircle />}
                  </button>

                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDelete(rev._id)}
                    className="p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {reviews.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem] text-gray-600 font-mono text-xs uppercase tracking-widest">
              No reviews found in database.
            </div>
          )}
        </div>
      )}
    </div>
  );
}