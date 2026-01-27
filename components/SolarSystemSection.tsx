"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORD_BANK: Record<number, string[]> = {
  1: ["red", "sky", "run", "ace", "fly", "jet", "top", "sun", "war"],
  2: ["space", "flame", "light", "brave", "power", "ghost", "blast"],
  3: ["galactic", "thunder", "warrior", "phantom", "upgrade", "rocket"],
  4: ["destruction", "revolution", "atmosphere", "cyberpunk", "infinity"]
};

export default function XTypeUltimate() {
  const gameRef = useRef<HTMLDivElement>(null); // গেম এরিয়ার রেফারেন্স
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "OVER">("START");
  const [isPaused, setIsPaused] = useState(false);
  const [config, setConfig] = useState({ difficulty: 0.8, theme: 'default' });
  const [modal, setModal] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [waveKills, setWaveKills] = useState(0);
  const [stats, setStats] = useState({ wpm: 0, acc: 0, totalKeys: 0, correctKeys: 0, startTime: 0 });
  const [activeWords, setActiveWords] = useState<any[]>([]);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [bullets, setBullets] = useState<any[]>([]);
  const [shipRotation, setShipRotation] = useState(0);

  const wordsRef = useRef(activeWords);
  useEffect(() => { wordsRef.current = activeWords; }, [activeWords]);

  // --- Fullscreen Toggle Function ---
  const toggleFullScreen = (enable: boolean) => {
    if (enable) {
      if (gameRef.current?.requestFullscreen) {
        gameRef.current.requestFullscreen();
      } else if ((gameRef.current as any).webkitRequestFullscreen) {
        (gameRef.current as any).webkitRequestFullscreen(); // Safari সাপোর্ট
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  const spawnWord = useCallback(() => {
    if (gameState !== "PLAYING" || isPaused) return;
    const lvl = Math.min(wave, 4);
    const text = WORD_BANK[lvl][Math.floor(Math.random() * WORD_BANK[lvl].length)];
    const id = Date.now();
    const lanes = 5;
    const x = (Math.floor(Math.random() * lanes) * (window.innerWidth / lanes)) + (window.innerWidth / (lanes * 2));
    setActiveWords((prev) => [...prev, { id, text, x, y: -50, typed: "", speed: config.difficulty + (wave * 0.12) }]);
  }, [gameState, isPaused, wave, config.difficulty]);

  const triggerGameOver = useCallback(() => {
    setGameState("OVER");
    toggleFullScreen(false); // গেম ওভার হলে ফুলস্ক্রিন থেকে বের হবে
    const timeElapsed = (Date.now() - stats.startTime) / 60000;
    const wpm = Math.round((stats.correctKeys / 5) / timeElapsed) || 0;
    const acc = Math.round((stats.correctKeys / stats.totalKeys) * 100) || 0;
    setStats(prev => ({ ...prev, wpm, acc }));
  }, [stats]);

  // --- Game Loops & Listeners (Same as your logic) ---
  useEffect(() => {
    if (gameState !== "PLAYING" || isPaused) return;
    const interval = setInterval(() => {
      setActiveWords((prev) => {
        const next = prev.map(w => ({ ...w, y: w.y + w.speed }));
        if (next.some(w => w.y > window.innerHeight - 150)) { triggerGameOver(); return prev; }
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
      let currentWords = wordsRef.current;
      let target = currentWords.find(w => w.id === targetId);
      if (!target) {
        target = currentWords.find(w => w.text.startsWith(char));
        if (target) setTargetId(target.id);
      }
      if (target) {
        const shipX = window.innerWidth / 2;
        const shipY = window.innerHeight - 80;
        const angle = Math.atan2(target.y - shipY, target.x - shipX);
        setShipRotation((angle * 180 / Math.PI) + 90);
        if (char === target.text[target.typed.length]) {
          setStats(s => ({ ...s, correctKeys: s.correctKeys + 1 }));
          target.typed += char;
          const bId = Math.random();
          setBullets(prev => [...prev, { id: bId, x: shipX, y: shipY, tx: target?.x, ty: target?.y, angle: (angle * 180 / Math.PI) + 90 }]);
          setTimeout(() => setBullets(prev => prev.filter(b => b.id !== bId)), 300);
          if (target.typed === target.text) {
            setScore(s => s + 10);
            setWaveKills(k => {
              const newKills = k + 1;
              if (newKills >= 5) { setWave(w => w + 1); return 0; }
              return newKills;
            });
            setActiveWords(prev => prev.filter(w => w.id !== target?.id));
            setTargetId(null);
            setShipRotation(0);
          } else { setActiveWords([...currentWords]); }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, isPaused, targetId]);

  // --- Button Handlers ---
  const handleStartGame = () => {
    toggleFullScreen(true); // ফুলস্ক্রিন একটিভেট হবে
    setGameState("PLAYING");
    setStats(s => ({ ...s, startTime: Date.now() }));
  };

  const handleExit = () => {
    toggleFullScreen(false); // ফুলস্ক্রিন বন্ধ হবে
    window.location.reload(); // পেজ রিলোড হবে
  };

  const getBgStyle = () => {
    if (config.theme === 'matrix') return "radial-gradient(circle, #003300 0%, #000 100%)";
    if (config.theme === 'void') return "#000";
    return "radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)";
  };

  return (
    <div ref={gameRef} className="relative w-full h-screen overflow-hidden bg-[#050510] text-white font-sans selection:bg-none">
      
      {/* --- START SCREEN --- */}
      {gameState === "START" && (
        <div className="absolute inset-0 z-[2000] bg-[#050514] flex flex-col items-center justify-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-8xl md:text-9xl font-black text-[#00d2ff] tracking-[15px] italic drop-shadow-[0_0_20px_#00d2ff] mb-4">X-TYPE</motion.h1>
          <p className="text-gray-500 tracking-[8px] mb-12 font-bold uppercase text-sm">Ultimate Typing Interface</p>
          <div className="flex flex-col gap-4">
            <button onClick={handleStartGame} className="game-btn">Play Game</button>
            <button onClick={() => setModal('settings')} className="game-btn">Settings</button>
          </div>
        </div>
      )}

      {/* --- GAME AREA --- */}
      <div className="absolute inset-0" style={{ background: getBgStyle() }}>
        {gameState === "PLAYING" && (
          <>
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-[100]">
              <div className="text-[#00d2ff] text-2xl font-black tracking-widest">
                WAVE: <span className="text-white">{wave}</span> | SCORE: <span className="text-white">{score}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setIsPaused(!isPaused)} className="px-6 py-2 border-2 border-yellow-500 text-yellow-500 font-bold hover:bg-yellow-500 hover:text-black transition-all uppercase tracking-tighter">
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button onClick={handleExit} className="px-6 py-2 border-2 border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all uppercase tracking-tighter font-black">Exit</button>
              </div>
            </div>

            {isPaused && <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-6xl font-black text-[#00d2ff] z-[150] tracking-widest uppercase italic">Paused</div>}

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
              <div className="w-16 h-20 bg-[#00d2ff] transition-transform duration-75 shadow-[0_0_30px_#00d2ff]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 50% 85%, 100% 100%)', transform: `rotate(${shipRotation}deg)` }} />
            </div>
          </>
        )}
      </div>

      {/* --- GAME OVER MODAL --- */}
      {gameState === "OVER" && (
        <div className="absolute inset-0 z-[3000] bg-black/95 flex items-center justify-center p-4">
          <div className="bg-[#111] border-4 border-[#ff0055] p-12 rounded-[2rem] max-w-md w-full text-center shadow-[0_0_60px_rgba(255,0,85,0.4)]">
            <h2 className="text-[#ff0055] text-6xl font-black mb-8 italic uppercase tracking-tighter">Terminated</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">WPM</p>
                <p className="text-4xl font-black text-[#00d2ff]">{stats.wpm}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Accuracy</p>
                <p className="text-4xl font-black text-[#00d2ff]">{stats.acc}%</p>
              </div>
            </div>
            <button onClick={() => window.location.reload()} className="w-full py-5 bg-[#00d2ff] text-black font-black rounded-2xl text-2xl hover:bg-white transition-all uppercase italic">Re-Deploy</button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <AnimatePresence>
        {modal === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[4000] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-[#111] border-2 border-[#00d2ff] p-10 rounded-[2.5rem] max-w-lg w-full">
              <h3 className="text-3xl font-black text-[#00d2ff] italic uppercase mb-8">System Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2 tracking-widest">Theme Module</label>
                  <select className="w-full bg-[#222] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#00d2ff]" onChange={(e) => setConfig({...config, theme: e.target.value})}>
                    <option value="default">Neon Blue (Classic)</option>
                    <option value="matrix">Matrix Code</option>
                    <option value="void">Deep Space Void</option>
                  </select>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="w-full mt-10 py-4 bg-[#00d2ff] text-black font-black rounded-xl uppercase tracking-widest">Save & Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .game-btn { 
          width: 300px; 
          padding: 18px; 
          border: 3px solid #00d2ff; 
          background: transparent; 
          color: white; 
          font-weight: 900; 
          text-transform: uppercase; 
          font-style: italic; 
          letter-spacing: 3px; 
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          cursor: pointer; 
        }
        .game-btn:hover { 
          background: #00d2ff; 
          color: black; 
          box-shadow: 0 0 30px #00d2ff; 
          transform: scale(1.05) skewX(-5deg); 
        }
      `}</style>
    </div>
  );
}