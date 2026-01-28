"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ১. গেমের প্রয়োজনীয় টাইপ এবং ইন্টারফেস
interface ActiveWord {
  id: number;
  text: string;
  x: number;
  y: number;
  typed: string;
  speed: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  angle: number;
}

interface GameStats {
  wpm: number;
  acc: number;
  totalKeys: number;
  correctKeys: number;
  startTime: number;
}

const WORD_BANK: Record<number, string[]> = {
  1: ["red", "sky", "run", "ace", "fly", "jet", "top", "sun", "war"],
  2: ["space", "flame", "light", "brave", "power", "ghost", "blast"],
  3: ["galactic", "thunder", "warrior", "phantom", "upgrade", "rocket"],
  4: ["destruction", "revolution", "atmosphere", "cyberpunk", "infinity"]
};

export default function XTypeUltimate() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "OVER">("START");
  const [isPaused, setIsPaused] = useState(false);
  const [config] = useState({ difficulty: 0.8, theme: 'default' });
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [waveKills, setWaveKills] = useState(0);
  const [stats, setStats] = useState<GameStats>({ wpm: 0, acc: 0, totalKeys: 0, correctKeys: 0, startTime: 0 });
  const [activeWords, setActiveWords] = useState<ActiveWord[]>([]);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [shipRotation, setShipRotation] = useState(0);

  // ফুলস্ক্রিন ফাংশন
  const toggleFullScreen = (enable: boolean) => {
    if (enable) {
      if (gameRef.current?.requestFullscreen) {
        gameRef.current.requestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  // গেম স্টেট রিসেট ফাংশন (এটি বারবার ব্যবহার হবে)
  const resetAllStates = useCallback(() => {
    setActiveWords([]);
    setTargetId(null);
    setScore(0);
    setWave(1);
    setWaveKills(0);
    setBullets([]);
    setShipRotation(0);
    setIsPaused(false);
    setStats({ wpm: 0, acc: 0, startTime: 0, totalKeys: 0, correctKeys: 0 });
  }, []);

  const triggerGameOver = useCallback(() => {
    setGameState("OVER");
    toggleFullScreen(false);
    setStats(prev => {
      const timeElapsed = (Date.now() - prev.startTime) / 60000;
      const wpm = Math.round((prev.correctKeys / 5) / timeElapsed) || 0;
      const acc = Math.round((prev.correctKeys / (prev.totalKeys || 1)) * 100) || 0;
      return { ...prev, wpm, acc };
    });
  }, []);

  const spawnWord = useCallback(() => {
    if (gameState !== "PLAYING" || isPaused) return;
    const lvl = Math.min(wave, 4) as keyof typeof WORD_BANK;
    const words = WORD_BANK[lvl];
    const text = words[Math.floor(Math.random() * words.length)];
    const id = Date.now() + Math.random();
    const lanes = 5;
    const x = (Math.floor(Math.random() * lanes) * (window.innerWidth / lanes)) + (window.innerWidth / (lanes * 2));
    
    setActiveWords((prev) => [...prev, { 
      id, text, x, y: -50, typed: "", 
      speed: config.difficulty + (wave * 0.12) 
    }]);
  }, [gameState, isPaused, wave, config.difficulty]);

  useEffect(() => {
    if (gameState !== "PLAYING" || isPaused) return;
    const interval = setInterval(() => {
      setActiveWords((prev) => {
        const next = prev.map(w => ({ ...w, y: w.y + w.speed }));
        if (next.some(w => w.y > window.innerHeight - 150)) {
          triggerGameOver();
          return prev;
        }
        return next;
      });
    }, 20);
    const spawnInt = setInterval(spawnWord, Math.max(800, 3000 - (wave * 300)));
    return () => { clearInterval(interval); clearInterval(spawnInt); };
  }, [gameState, isPaused, spawnWord, wave, triggerGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "PLAYING" || isPaused) return;
      const char = e.key.toLowerCase();
      if (char.length !== 1) return;

      setStats(s => ({ ...s, totalKeys: s.totalKeys + 1 }));

      setActiveWords((prevWords) => {
        let currentTargetId = targetId;
        let targetIndex = -1;

        if (currentTargetId === null) {
          targetIndex = prevWords.findIndex(w => w.text.startsWith(char));
          if (targetIndex !== -1) {
            currentTargetId = prevWords[targetIndex].id;
            setTargetId(currentTargetId);
          }
        } else {
          targetIndex = prevWords.findIndex(w => w.id === currentTargetId);
        }

        if (targetIndex !== -1) {
          const target = prevWords[targetIndex];
          if (char === target.text[target.typed.length]) {
            setStats(s => ({ ...s, correctKeys: s.correctKeys + 1 }));

            const shipX = window.innerWidth / 2;
            const shipY = window.innerHeight - 80;
            const angle = Math.atan2(target.y - shipY, target.x - shipX);
            setShipRotation((angle * 180 / Math.PI) + 90);

            const bId = Math.random();
            setBullets(prev => [...prev, { 
              id: bId, x: shipX, y: shipY, tx: target.x, ty: target.y, 
              angle: (angle * 180 / Math.PI) + 90 
            }]);
            setTimeout(() => setBullets(p => p.filter(b => b.id !== bId)), 300);

            const updatedWords = [...prevWords];
            updatedWords[targetIndex] = { ...target, typed: target.typed + char };

            if (updatedWords[targetIndex].typed === target.text) {
              setScore(s => s + 10);
              setWaveKills(k => {
                if (k + 1 >= 5) { setWave(w => w + 1); return 0; }
                return k + 1;
              });
              setTargetId(null);
              setShipRotation(0);
              return updatedWords.filter(w => w.id !== currentTargetId);
            }
            return updatedWords;
          }
        }
        return prevWords;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, isPaused, targetId]);

  const handleStartGame = () => {
    resetAllStates();
    setGameState("PLAYING");
    setStats({ wpm: 0, acc: 0, startTime: Date.now(), totalKeys: 0, correctKeys: 0 });
    toggleFullScreen(true);
  };

  const handleExitToHome = () => {
    resetAllStates();
    setGameState("START");
    toggleFullScreen(false);
  };

  return (
    <div ref={gameRef} className="relative w-full h-screen overflow-hidden bg-[#050510] text-white font-sans selection:bg-none">
      
      {/* ১. হোম স্ক্রিন / ইন্ট্রোডাকশন */}
      {gameState === "START" && (
        <div className="absolute inset-0 z-[2000] bg-[#050514] flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1 className="text-8xl md:text-9xl font-black text-[#00d2ff] tracking-[15px] italic drop-shadow-[0_0_20px_#00d2ff] mb-4">X-TYPE</h1>
            <p className="text-gray-500 tracking-[8px] mb-12 font-bold uppercase text-sm">Ultimate Typing Interface</p>
            <button onClick={handleStartGame} className="game-btn">Initialise Mission</button>
          </motion.div>
        </div>
      )}

      {/* ২. মেইন গেম এরিয়া */}
      <div className="absolute inset-0" style={{ background: getBgStyle(config.theme) }}>
        {gameState === "PLAYING" && (
          <>
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-[100]">
              <div className="text-[#00d2ff] text-2xl font-black tracking-widest">
                WAVE: <span className="text-white">{wave}</span> | SCORE: <span className="text-white">{score}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setIsPaused(!isPaused)} className="px-6 py-2 border-2 border-yellow-500 text-yellow-500 font-bold uppercase tracking-tighter hover:bg-yellow-500 hover:text-black transition-colors">
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button onClick={handleExitToHome} className="px-6 py-2 border-2 border-red-600 text-red-600 font-bold uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-colors">
                  Exit
                </button>
              </div>
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-6xl font-black text-[#00d2ff] z-[150] tracking-widest uppercase italic backdrop-blur-sm">
                Paused
              </div>
            )}

            {activeWords.map((word) => (
              <div key={word.id} className="absolute -translate-x-1/2" style={{ left: `${word.x}px`, top: `${word.y}px` }}>
                <div className={`text-2xl font-bold px-5 py-1 bg-black/70 rounded border-2 transition-all ${targetId === word.id ? 'border-[#00d2ff] shadow-[0_0_20px_#00d2ff] scale-110' : 'border-white/10'}`}>
                  <span className="text-yellow-400">{word.typed}</span>
                  <span className="text-white opacity-80">{word.text.substring(word.typed.length)}</span>
                </div>
              </div>
            ))}

            {bullets.map((b) => (
              <motion.div key={b.id} initial={{ left: b.x, top: b.y }} animate={{ left: b.tx, top: b.ty }} transition={{ duration: 0.2, ease: "linear" }}
                className="absolute w-1.5 h-6 bg-yellow-400 rounded-full shadow-[0_0_10px_yellow]" style={{ rotate: `${b.angle}deg` }}
              />
            ))}

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <div className="w-16 h-20 bg-[#00d2ff] transition-transform duration-75 shadow-[0_0_30px_#00d2ff]" 
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 50% 85%, 100% 100%)', transform: `rotate(${shipRotation}deg)` }} 
              />
            </div>
          </>
        )}
      </div>

      {/* ৩. গেম ওভার স্ক্রিন */}
      {gameState === "OVER" && (
        <div className="absolute inset-0 z-[3000] bg-black/95 flex items-center justify-center backdrop-blur-md">
          <div className="bg-[#111] border-4 border-[#ff0055] p-12 rounded-[2rem] text-center shadow-[0_0_60px_#ff005566]">
            <h2 className="text-[#ff0055] text-6xl font-black mb-8 italic uppercase tracking-tighter">Terminated</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] text-gray-500 uppercase font-bold">WPM</p>
                <p className="text-4xl font-black text-[#00d2ff]">{stats.wpm}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Accuracy</p>
                <p className="text-4xl font-black text-[#00d2ff]">{stats.acc}%</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
                <button onClick={handleStartGame} className="w-full py-5 bg-[#00d2ff] text-black font-black rounded-2xl text-2xl uppercase italic hover:bg-white transition-all shadow-[0_0_20px_#00d2ff]">Re-Deploy</button>
                <button onClick={handleExitToHome} className="w-full py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-xl uppercase hover:bg-white/10 transition-all">Main Menu</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .game-btn { width: 350px; padding: 20px; border: 3px solid #00d2ff; background: transparent; color: white; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: 3px; transition: all 0.3s; cursor: pointer; }
        .game-btn:hover { background: #00d2ff; color: black; box-shadow: 0 0 40px #00d2ff; transform: scale(1.05) skewX(-5deg); }
      `}</style>
    </div>
  );
}

function getBgStyle(theme: string) {
  if (theme === 'matrix') return "radial-gradient(circle, #003300 0%, #000 100%)";
  return "radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)";
}