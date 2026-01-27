"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GRID_SIZE = 4;

// টাইপ ডিফাইন করা
type Grid = number[][];
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // নতুন টাইল যোগ করা (currentGrid কে টাইপ সেফ করা হয়েছে)
  const addTile = (currentGrid: Grid): void => {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentGrid[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length > 0) {
      const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const initGame = useCallback(() => {
    const newGrid: Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    addTile(newGrid);
    addTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  }, []);

  // প্রথমবার গেম লোড করার জন্য
  useEffect(() => { 
    initGame(); 
  }, [initGame]);

  // মুভমেন্ট লজিক
  const move = (direction: Direction): void => {
    if (gameOver || grid.length === 0) return;
    
    let newGrid: Grid = JSON.parse(JSON.stringify(grid));
    let moved = false;

    const rotate = (matrix: Grid): Grid => {
      return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
    };
    
    const rotationCount: Record<Direction, number> = { LEFT: 0, UP: 3, RIGHT: 2, DOWN: 1 };
    const count = rotationCount[direction];

    for (let i = 0; i < count; i++) {
      newGrid = rotate(newGrid);
    }

    for (let r = 0; r < GRID_SIZE; r++) {
      // ফিক্স: এখানে (newGrid[r] as number[]) দিয়ে টাইপ নিশ্চিত করা হয়েছে
      const row = (newGrid[r] as number[]).filter((v: number) => v !== 0);
      
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
          row[i] *= 2;
          setScore(s => s + row[i]);
          row.splice(i + 1, 1);
          moved = true;
        }
      }
      while (row.length < GRID_SIZE) row.push(0);
      
      if (JSON.stringify(newGrid[r]) !== JSON.stringify(row)) {
        moved = true;
      }
      newGrid[r] = row;
    }

    for (let i = 0; i < (4 - count) % 4; i++) {
      newGrid = rotate(newGrid);
    }

    if (moved) {
      addTile(newGrid);
      setGrid(newGrid);
      if (!canMove(newGrid)) setGameOver(true);
    }
  };

  const canMove = (g: Grid): boolean => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (g[r][c] === 0) return true;
        if (c < GRID_SIZE - 1 && g[r][c] === g[r][c + 1]) return true;
        if (r < GRID_SIZE - 1 && g[r][c] === g[r + 1][c]) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") move("UP");
        if (e.key === "ArrowDown") move("DOWN");
        if (e.key === "ArrowLeft") move("LEFT");
        if (e.key === "ArrowRight") move("RIGHT");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [grid, gameOver]);

  const getTileColor = (val: number): string => {
    const colors: Record<number, string> = {
      2: "bg-gray-800 text-white",
      4: "bg-gray-700 text-white",
      8: "bg-orange-500 text-white shadow-[0_0_15px_#f97316]",
      16: "bg-orange-600 text-white shadow-[0_0_15px_#ea580c]",
      32: "bg-red-500 text-white shadow-[0_0_20px_#ef4444]",
      64: "bg-red-600 text-white shadow-[0_0_20px_#dc2626]",
      128: "bg-yellow-500 text-black shadow-[0_0_25px_#eab308]",
      256: "bg-yellow-400 text-black shadow-[0_0_30px_#fde047]",
      512: "bg-cyan-500 text-black shadow-[0_0_35px_#06b6d4]",
      1024: "bg-blue-500 text-white shadow-[0_0_40px_#3b82f6]",
      2048: "bg-purple-600 text-white shadow-[0_0_50px_#a855f7]",
    };
    return colors[val] || "bg-black text-white border border-white/10";
  };

  if (grid.length === 0) return null;

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center p-4 font-sans">
      <div className="mb-8 text-center">
        <h2 className="text-5xl font-black italic text-white mb-2 uppercase tracking-tighter">
          Cyber <span className="text-yellow-400">2048</span>
        </h2>
        <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Current Score</p>
          <p className="text-3xl font-black text-white">{score}</p>
        </div>
      </div>

      <div className="bg-[#111] p-4 rounded-3xl border-4 border-white/10 shadow-2xl">
        <div className="grid grid-cols-4 gap-3">
          {grid.map((row, r) => row.map((val, c) => (
            <motion.div
              key={`${r}-${c}`}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl text-2xl font-black transition-all duration-200 ${getTileColor(val)}`}
            >
              {val !== 0 ? val : ""}
            </motion.div>
          )))}
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-[10px] font-bold uppercase tracking-[4px] animate-pulse">
        Use Arrow Keys to Merge Tiles
      </p>

      <AnimatePresence>
        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-[100] flex items-center justify-center backdrop-blur-sm"
          >
            <div className="text-center">
              <h3 className="text-6xl font-black text-white italic mb-4 uppercase">Grid Full</h3>
              <p className="text-yellow-400 text-xl font-bold mb-10 tracking-widest uppercase">Score: {score}</p>
              <button 
                onClick={initGame} 
                className="px-12 py-4 bg-yellow-400 text-black font-black rounded-xl uppercase tracking-widest hover:bg-white transition-all"
              >
                Reboot
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}