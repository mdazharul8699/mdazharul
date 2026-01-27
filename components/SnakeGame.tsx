"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[5, 5], [4, 5], [3, 5]];
const INITIAL_FOOD = [10, 10];
const INITIAL_DIR = [1, 0]; 

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [dir, setDir] = useState(INITIAL_DIR);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(150);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // খাবার জেনারেট করা
  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ];
      const isOnSnake = snake.some(s => s[0] === newFood[0] && s[1] === newFood[1]);
      if (!isOnSnake) break;
    }
    return newFood;
  }, [snake]);

  // গেম লজিক (মুভমেন্ট ও কলিশন)
  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newHead = [prevSnake[0][0] + dir[0], prevSnake[0][1] + dir[1]];

      // ১. ওয়ালের সাথে কলিশন চেক (বর্ডার হিট)
      if (
        newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
        newHead[1] < 0 || newHead[1] >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // ২. নিজের শরীরের সাথে কলিশন চেক
      if (prevSnake.some(s => s[0] === newHead[0] && s[1] === newHead[1])) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // ৩. খাবার খাওয়ার লজিক
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore(s => s + 10);
        setFood(generateFood());
        setSpeed(prev => Math.max(prev - 2, 60)); // গতি বাড়ানো
      } else {
        newSnake.pop(); // লেজ কেটে ফেলা
      }

      return newSnake;
    });
  }, [dir, food, generateFood]);

  // কিবোর্ড কন্ট্রোল
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": if (dir[1] !== 1) setDir([0, -1]); break;
        case "ArrowDown": if (dir[1] !== -1) setDir([0, 1]); break;
        case "ArrowLeft": if (dir[0] !== 1) setDir([-1, 0]); break;
        case "ArrowRight": if (dir[0] !== -1) setDir([1, 0]); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dir]);

  // গেম লুপ চালানো
  useEffect(() => {
    if (!gameOver) {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
  }, [moveSnake, gameOver, speed]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDir(INITIAL_DIR);
    setScore(0);
    setGameOver(false);
    setSpeed(150);
  };

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Score Section */}
      <div className="mb-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black italic text-white tracking-widest uppercase mb-2">
          Neon <span className="text-[#00ff88]">Snake</span>
        </h2>
        <div className="inline-block px-8 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full">
          <p className="text-[#00ff88] font-mono text-2xl font-bold tracking-widest">
            SCORE: {score}
          </p>
        </div>
      </div>

      {/* Game Board - Fixed Visible Border & Glow */}
      <div 
        className="relative bg-[#080808] border-[6px] border-[#00ff88] rounded-xl shadow-[0_0_40px_rgba(0,255,136,0.3)]"
        style={{ 
          width: 'min(85vw, 500px)', 
          height: 'min(85vw, 500px)',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Background Grid Guide */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
               backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
             }}>
        </div>

        {/* Snake Body Rendering */}
        {snake.map((segment, i) => (
          <div 
            key={i}
            className={`rounded-sm ${i === 0 ? 'bg-white shadow-[0_0_20px_#fff] z-20 scale-110' : 'bg-[#00ff88] shadow-[0_0_10px_#00ff88]'}`}
            style={{ 
              gridColumnStart: segment[0] + 1, 
              gridRowStart: segment[1] + 1 
            }}
          />
        ))}

        {/* Pulsing Food */}
        <div 
          className="bg-red-500 rounded-full animate-pulse shadow-[0_0_20px_#ef4444] z-10"
          style={{ 
            gridColumnStart: food[0] + 1, 
            gridRowStart: food[1] + 1 
          }}
        />
      </div>

      {/* Control Instruction */}
      <div className="mt-8">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[4px] animate-pulse">
          Use Arrow Keys to Navigate the Void
        </p>
      </div>

      {/* Game Over Screen */}
      <AnimatePresence>
        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/95 z-[1000] flex items-center justify-center p-6 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0a] border-2 border-[#00ff88] p-12 rounded-[2.5rem] text-center shadow-[0_0_60px_rgba(0,255,136,0.2)]"
            >
              <h2 className="text-5xl font-black text-white italic mb-4 uppercase tracking-tighter">System Error</h2>
              <p className="text-red-500 font-bold text-sm tracking-[5px] uppercase mb-8">Collision with Perimeter</p>
              
              <div className="text-white text-5xl font-black mb-10 flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-normal">Final Points</span>
                {score}
              </div>

              <button 
                onClick={resetGame}
                className="w-full py-4 bg-[#00ff88] text-black font-black rounded-xl hover:bg-white hover:scale-105 transition-all uppercase tracking-widest shadow-[0_10px_20px_rgba(0,255,136,0.2)]"
              >
                Reboot System
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}