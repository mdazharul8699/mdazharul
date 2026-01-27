"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import XTypeSection from "./SolarSystemSection"; 
import MemoryGameSection from "./MemoryGameSection";
import SnakeGame from "./SnakeGame"; 
import Game2048 from "./Game2048"; // নতুন 2048 গেম ফাইল

type GameType = "XTYPE" | "MEMORY" | "SNAKE" | "G2048" | null;

export default function GameHub() {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ফুলস্ক্রিন হ্যান্ডলার
  const launchGame = (game: GameType) => {
    setActiveGame(game);
    const elem = containerRef.current;
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    }
  };

  const closeGame = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setActiveGame(null);
  };

  return (
    <div ref={containerRef} className="w-full py-20 bg-[#050505] flex flex-col items-center justify-center font-sans selection:bg-none min-h-screen">
      
      {!activeGame ? (
        /* --- GAME SELECTION CENTER --- */
        <div className="max-w-5xl w-full px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase mb-4">
              Gaming <span className="text-[#00d2ff]">Lab</span>
            </h2>
            <p className="text-gray-500 font-bold tracking-[5px] uppercase text-sm">Select a module to initialize</p>
          </div>

          {/* ৪টি গেমের জন্য ২ কলাম গ্রিড */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* 1. X-TYPE Card */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => launchGame("XTYPE")}
              className="group relative p-1 bg-[#111] border-2 border-white/10 hover:border-[#00d2ff] rounded-[2.5rem] cursor-pointer transition-all overflow-hidden"
            >
              <div className="p-10 text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
                <h3 className="text-3xl font-black text-white italic mb-2 uppercase">X-Type</h3>
                <p className="text-gray-500 text-xs font-bold mb-8 tracking-widest uppercase">Space Typing Combat</p>
                <div className="py-3 px-6 bg-white/5 border border-white/10 rounded-xl text-[#00d2ff] font-black group-hover:bg-[#00d2ff] group-hover:text-black transition-all">
                  LAUNCH MISSION
                </div>
              </div>
            </motion.div>

            {/* 2. NEON SNAKE Card */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => launchGame("SNAKE")}
              className="group relative p-1 bg-[#111] border-2 border-white/10 hover:border-[#00ff88] rounded-[2.5rem] cursor-pointer transition-all overflow-hidden"
            >
              <div className="p-10 text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🐍</div>
                <h3 className="text-3xl font-black text-white italic mb-2 uppercase">Neon Snake</h3>
                <p className="text-gray-500 text-xs font-bold mb-8 tracking-widest uppercase">Retro Survival</p>
                <div className="py-3 px-6 bg-white/5 border border-white/10 rounded-xl text-[#00ff88] font-black group-hover:bg-[#00ff88] group-hover:text-black transition-all">
                  FEED THE SNAKE
                </div>
              </div>
            </motion.div>

            {/* 3. MEMORY Card */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => launchGame("MEMORY")}
              className="group relative p-1 bg-[#111] border-2 border-white/10 hover:border-[#ff0055] rounded-[2.5rem] cursor-pointer transition-all overflow-hidden"
            >
              <div className="p-10 text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🧠</div>
                <h3 className="text-3xl font-black text-white italic mb-2 uppercase">Memory Pro</h3>
                <p className="text-gray-500 text-xs font-bold mb-8 tracking-widest uppercase">Brain Cells Challenge</p>
                <div className="py-3 px-6 bg-white/5 border border-white/10 rounded-xl text-[#ff0055] font-black group-hover:bg-[#ff0055] group-hover:text-black transition-all">
                  START SESSION
                </div>
              </div>
            </motion.div>

            {/* 4. CYBER 2048 Card - নতুন অ্যাড করা হয়েছে */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => launchGame("G2048")}
              className="group relative p-1 bg-[#111] border-2 border-white/10 hover:border-[#fde047] rounded-[2.5rem] cursor-pointer transition-all overflow-hidden"
            >
              <div className="p-10 text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🧩</div>
                <h3 className="text-3xl font-black text-white italic mb-2 uppercase">Cyber 2048</h3>
                <p className="text-gray-500 text-xs font-bold mb-8 tracking-widest uppercase">Logic Grid Master</p>
                <div className="py-3 px-6 bg-white/5 border border-white/10 rounded-xl text-[#fde047] font-black group-hover:bg-[#fde047] group-hover:text-black transition-all">
                  MERGE TILES
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      ) : (
        /* --- FULLSCREEN RENDERER --- */
        <div className="w-full h-screen bg-black relative">
          <button 
            onClick={closeGame}
            className="absolute top-6 right-10 z-[1000] px-6 py-2 bg-red-600 text-white font-black rounded-full shadow-lg hover:scale-105 transition-transform uppercase text-xs tracking-widest"
          >
            Close Game
          </button>

          {activeGame === "XTYPE" && <XTypeSection isFullscreenMode={true} />}
          {activeGame === "MEMORY" && <MemoryGameSection isFullscreenMode={true} />}
          {activeGame === "SNAKE" && <SnakeGame />}
          {activeGame === "G2048" && <Game2048 />}
        </div>
      )}
    </div>
  );
}