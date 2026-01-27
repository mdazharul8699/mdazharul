"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef } from "react";

const skills = [
  { name: "HTML5", level: "95%" },
  { name: "CSS3", level: "90%" },
  { name: "JavaScript", level: "85%" },
  { name: "React.js", level: "88%" },
  { name: "Next.js", level: "80%" },
  { name: "Node.js", level: "75%" },
  { name: "MongoDB", level: "70%" },
  { name: "Tailwind", level: "95%" },
  { name: "Bootstrap", level: "90%" },
];

// রঙিন মাছ এবং পানির জন্য অ্যানিমেশন কম্পোনেন্ট
function FishAquarium() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // সাইজ সেট করার ফাংশন
    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };

    setCanvasSize();

    const fishColors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FFD700"];
    
    // মাছের প্রাথমিক ডাটা
    const fishes = Array.from({ length: 4 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 0.8 + 0.3,
      angle: Math.random() * Math.PI * 2,
      color: fishColors[Math.floor(Math.random() * fishColors.length)],
    }));

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fishes.forEach((f) => {
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;

        // বাউন্ডারি চেক (মাছ স্ক্রিন থেকে বের হবে না)
        if (f.x < 0 || f.x > canvas.width) f.angle = Math.PI - f.angle;
        if (f.y < 0 || f.y > canvas.height) f.angle = -f.angle;

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.angle);
        ctx.fillStyle = f.color;
        
        // মাছের বডি (ellipse)
        ctx.beginPath();
        ctx.ellipse(0, 0, f.size * 2, f.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // মাছের লেজ
        ctx.beginPath();
        ctx.moveTo(-f.size * 1.5, 0);
        ctx.lineTo(-f.size * 3, -f.size);
        ctx.lineTo(-f.size * 3, f.size);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // উইন্ডো রিসাইজ হ্যান্ডেল
    window.addEventListener("resize", setCanvasSize);

    // মেমোরি লিক রোধে ক্লিনআপ
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />;
}

export default function Skills() {
  const { color } = useTheme(); // theme.color সরাসরি ডিস্ট্রাকচার করা হয়েছে

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black mb-16 tracking-tighter text-white"
        >
          MY <span style={{ color: color }}>STRENGTHS</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              style={{ 
                borderLeft: `4px solid ${color}`,
                background: "linear-gradient(135deg, rgba(10, 25, 41, 0.7) 0%, rgba(2, 6, 23, 0.8) 100%)"
              }}
              className="p-8 py-12 rounded-2xl backdrop-blur-xl border border-white/5 relative overflow-hidden group shadow-2xl"
            >
              {/* অ্যাকুরিয়াম ব্যাকগ্রাউন্ড লেয়ার */}
              <FishAquarium />

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                    {skill.name}
                  </h3>
                  <span style={{ color: color }} className="font-mono font-bold text-xl drop-shadow-sm">
                    {skill.level}
                  </span>
                </div>
                
                {/* Progress Bar Container */}
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    style={{ backgroundColor: color }}
                    className="h-full shadow-[0_0_15px] shadow-current"
                  />
                </div>
              </div>

              {/* কার্ডে গ্লস ইফেক্ট */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}