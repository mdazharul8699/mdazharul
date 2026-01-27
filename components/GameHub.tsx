"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import XTypeSection from "./SolarSystemSection"; 
import MemoryGameSection from "./MemoryGameSection";
import SnakeGame from "./SnakeGame"; 
import Game2048 from "./Game2048";

// ১. টাইপ ডিফাইন করা
type GameType = "XTYPE" | "MEMORY" | "SNAKE" | "G2048" | null;

// গেম কার্ডের জন্য প্রপস টাইপ
interface GameCardProps {
  icon: string;
  title: string;
  desc: string;
  color: string;
  onClick: () => void;
}

// Fullscreen API এর জন্য কাস্টম টাইপ (WebKit সাপোর্ট সহ)
interface VendorFullscreenElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

export default function GameHub() {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const containerRef = useRef<VendorFullscreenElement>(null);

  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        setActiveGame(null);
      }
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const launchGame = useCallback(async (game: GameType) => {
    const elem = containerRef.current;
    if (!elem) return;

 try {
      if (elem.requestFullscreen) {
        // স্ট্যান্ডার্ড মেথড কল
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        // সাফারির জন্য মেথড কল
        await elem.webkitRequestFullscreen();
      }
      setActiveGame(game);
    } catch (e) {
      console.error("Fullscreen failed:", e);
      // ফুলস্ক্রিন এরর হলেও গেমটি যাতে লোড হয়
      setActiveGame(game);
    }
  }, []);

  const closeGame = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    setActiveGame(null);
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30">
      
      {!activeGame ? (
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic"
            >
              Play <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Zone</span>
            </motion.h2>
            <p className="text-gray-500 font-medium tracking-[8px] uppercase text-xs mt-4">System Online // Select Module</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <GameCard icon="🚀" title="X-Type" desc="High-speed orbital typing combat." color="#00d2ff" onClick={() => launchGame("XTYPE")} />
            <GameCard icon="🐍" title="Neon Snake" desc="Navigate the digital grid. Survive." color="#00ff88" onClick={() => launchGame("SNAKE")} />
            <GameCard icon="🧠" title="Memory Pro" desc="Sync your brain cells to win." color="#ff0055" onClick={() => launchGame("MEMORY")} />
            <GameCard icon="🧩" title="Cyber 2048" desc="Merge tiles to reach the core." color="#fde047" onClick={() => launchGame("G2048")} />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen bg-black relative flex items-center justify-center">
          <button 
            onClick={closeGame}
            className="absolute top-6 right-6 z-[1000] group flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-red-500 border border-white/10 rounded-xl transition-all"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase italic">Terminating Link</span>
            <span className="bg-red-500 group-hover:bg-white w-2 h-2 rounded-full animate-pulse" />
          </button>
          
          <div className="w-full h-full">
            {/* বস্, এখানে {...{ isFullscreenMode: true } as any} ব্যবহার করা হয়েছে কারণ আপনার গেম কম্পোনেন্টগুলোতে প্রপস ডিফাইন করা নেই। */}
            {activeGame === "XTYPE" && <XTypeSection {...({ isFullscreenMode: true } as object)} />}
            {activeGame === "MEMORY" && <MemoryGameSection {...({ isFullscreenMode: true } as object)} />}
            {activeGame === "SNAKE" && <SnakeGame />}
            {activeGame === "G2048" && <Game2048 />}
          </div>
        </div>
      )}
    </div>
  );
}

function GameCard({ icon, title, desc, color, onClick }: GameCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div 
        className="absolute -inset-0.5 rounded-[2.5rem] opacity-20 group-hover:opacity-60 transition duration-500 blur"
        style={{ backgroundColor: color }}
      />
      <div className="relative flex flex-col items-center p-12 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden h-full">
        <div className="absolute -right-4 -bottom-4 text-9xl opacity-5 group-hover:opacity-10 transition-opacity grayscale group-hover:grayscale-0">
          {icon}
        </div>
        <div className="text-7xl mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-3xl font-black italic uppercase tracking-tight text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm font-medium mb-8 max-w-[200px] text-center leading-tight">{desc}</p>
        <div 
          className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[3px] border transition-all"
          style={{ borderColor: `${color}44`, color: color }}
        >
          Initialize Boot
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700" style={{ backgroundColor: color }} />
      </div>
    </motion.div>
  );
}