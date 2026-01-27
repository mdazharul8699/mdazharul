"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

// ড্রোনের ৩ডি মডেল লোডার
function DroneModel() {
  // এখানে আপনার ড্রোনের .glb ফাইলের পাথ দিতে হবে
  const { scene } = useGLTF("/models/iranian_unique_drone.glb");
  return <primitive object={scene} scale={1.5} />;
}

export default function MilitaryDroneDream() {
  return (
    <div className="relative w-full min-h-screen bg-[#02050a] flex flex-col md:flex-row items-center p-6 md:p-20 overflow-hidden font-sans">
      
      {/* ৩ডি ড্রোন সেকশন (মাউস দিয়ে ঘোরানো যাবে) */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5}>
              <DroneModel />
            </Stage>
          </Suspense>
          <OrbitControls autoRotate enableZoom={false} />
        </Canvas>
      </div>

      {/* ড্রোন ডিটেইলস সেকশন (ডান পাশে) */}
      <div className="w-full md:w-1/2 text-white space-y-6">
        <div className="inline-block border border-red-500 text-red-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">
          Project: Eagle Strike X (Dream Project)
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
          The Iranian <span className="text-red-500">Unseen Beast</span>
        </h2>
        
        <p className="text-gray-400 text-lg leading-relaxed">
           ইরানের সেরা ড্রোন টেকনোলজি এবং মিসাইল সিস্টেমের অনুপ্রেরণায় তৈরি এই ড্রোনটি আমার একটি "Dream Project"। এটিতে এমন সব সেন্সর এবং স্টিলথ টেকনোলজি ব্যবহার করা হয়েছে যা একে রাডারের কাছে অদৃশ্য করে রাখে।
        </p>

        {/* ইউনিক ফিচারস */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="text-red-500 font-bold uppercase text-xs mb-1">Missile Type</h4>
            <p className="font-serif">Hyper-Sonic X1</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="text-red-500 font-bold uppercase text-xs mb-1">Range</h4>
            <p className="font-serif">2,500 KM</p>
          </div>
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white font-black px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all">
          EXPLORE TECH SPECS
        </button>
      </div>
    </div>
  );
}