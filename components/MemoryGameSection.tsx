"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// টাইপ এবং ইন্টারফেস
interface Card {
  id: number;
  icon: string;
}

interface VendorFullscreenElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

const ALL_ICONS = ["⚛️", "🚀", "⚡", "🛠️", "🎨", "📱", "🔥", "💎"];

export default function MemoryGameSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  // --- Fullscreen Logic (Fixed) ---
  const toggleFullScreen = (enable: boolean) => {
    if (enable) {
      const elem = containerRef.current as VendorFullscreenElement;
      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
      }
    } else {
      if (typeof document !== 'undefined' && document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  const initializeGame = useCallback((currentLevel: number) => {
    const cardCount = Math.min(currentLevel * 4, 16);
    const iconsNeeded = ALL_ICONS.slice(0, cardCount / 2);
    const doubledIcons = [...iconsNeeded, ...iconsNeeded];
    
    const shuffled: Card[] = doubledIcons
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));

    setCards(shuffled);
    setSolved([]);
    setFlipped([]);
    setMoves(0);
    setDisabled(false);
  }, []);

  const handleStart = () => {
    setIsPlaying(true);
    setLevel(1);
    initializeGame(1);
    toggleFullScreen(true);
  };

  const nextLevel = () => {
    const nextLvl = level + 1;
    if (nextLvl <= 4) {
      setLevel(nextLvl);
      initializeGame(nextLvl);
    } else {
      handleExit();
    }
  };

  const handleExit = () => {
    toggleFullScreen(false);
    setIsPlaying(false);
    setLevel(1);
  };

  const handleClick = (id: number) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
    } else if (flipped.length === 1) {
      const firstId = flipped[0];
      setFlipped([firstId, id]);
      setMoves((m) => m + 1);
      setDisabled(true);

      if (cards[firstId].icon === cards[id].icon) {
        setSolved((prev) => [...prev, firstId, id]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 700);
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full min-h-[500px] flex items-center justify-center bg-[#050505] font-sans selection:bg-none">
      {!isPlaying ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full p-12 bg-[#111] border-2 border-[#00d2ff] rounded-[3rem] text-center shadow-[0_0_50px_rgba(0,210,255,0.2)]">
          <div className="w-20 h-20 bg-[#00d2ff]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#00d2ff]/30">
            <span className="text-4xl">🧠</span>
          </div>
          <h2 className="text-4xl font-black text-white italic mb-2 tracking-tighter uppercase">Memory Pro</h2>
          <p className="text-gray-500 text-sm mb-10 font-bold tracking-widest uppercase">Level Based Challenge</p>
          <button onClick={handleStart} className="w-full py-5 bg-[#00d2ff] text-black font-black rounded-2xl hover:bg-white transition-all uppercase tracking-[2px]">Enter Fullscreen</button>
        </motion.div>
      ) : (
        <div className="w-full h-screen bg-[#050508] p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 w-full p-8 flex justify-between items-center z-50">
            <div className="space-y-1">
              <p className="text-[#00d2ff] text-xs font-black tracking-[4px] uppercase">System Status</p>
              <h3 className="text-white text-3xl font-black italic">LEVEL {level} <span className="text-gray-600 mx-2">/</span> {moves} <span className="text-sm font-normal text-gray-500 uppercase tracking-tighter">Moves</span></h3>
            </div>
            <button onClick={handleExit} className="px-8 py-3 bg-red-600/10 border border-red-600/50 text-red-500 font-black rounded-xl hover:bg-red-600 hover:text-white transition-all uppercase text-xs tracking-widest">Abort Mission</button>
          </div>

          <div className={`grid gap-4 w-full max-w-2xl px-4 ${level === 1 ? 'grid-cols-2 max-w-xs' : 'grid-cols-4'}`}>
            {cards.map((card) => {
              const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
              const isMatched = solved.includes(card.id);

              return (
                <div key={card.id} className="relative aspect-[3/4] cursor-pointer" onClick={() => handleClick(card.id)}>
                  <div className="w-full h-full relative" style={{ perspective: '1000px' }}>
                    <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.4 }} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="absolute inset-0 bg-[#0f0f0f] border-2 border-white/10 rounded-2xl flex items-center justify-center shadow-2xl" style={{ backfaceVisibility: 'hidden' }}>
                        <div className="w-8 h-8 rounded-full border-2 border-white/5 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <div 
                        className={`absolute inset-0 rounded-2xl flex items-center justify-center ${isMatched ? 'bg-[#00d2ff] border-white shadow-[0_0_40px_rgba(0,210,255,0.6)]' : 'bg-[#1a1a1a] border-[#00d2ff]'}`} 
                        style={{ 
                          backfaceVisibility: 'hidden', 
                          transform: 'rotateY(180deg)', 
                          border: '3px solid' 
                        }}
                      >
                        <span className={`text-4xl md:text-5xl ${isMatched ? 'scale-110' : ''} transition-transform`}>{card.icon}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {solved.length === cards.length && cards.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center">
                <div className="text-center">
                  <motion.p initial={{ y: 20 }} animate={{ y: 0 }} className="text-[#00d2ff] font-black text-6xl italic mb-2 uppercase tracking-tighter">Level {level} Clear</motion.p>
                  <p className="text-gray-500 font-bold mb-10 tracking-[5px] uppercase text-sm">Completed in {moves} moves</p>
                  <button onClick={nextLevel} className="px-12 py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest hover:bg-[#00d2ff] transition-all">
                    {level < 4 ? 'Next Challenge' : 'Finish Game'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}