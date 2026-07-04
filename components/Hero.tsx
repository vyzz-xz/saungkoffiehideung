"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";

const MistCanvas = dynamic(() => import("./MistCanvas"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex items-center justify-center"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-[1] scale-110"
      >
        <Image
          src="/images/hero_panorama.webp"
          alt="Saung Koffie Hideung — Panorama"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </motion.div>

      <MistCanvas />

      <motion.div
        style={{ y: fgY, opacity: fgOpacity }}
        className="relative z-[3] text-center px-6 md:px-12 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-white font-[600] text-xs md:text-sm tracking-[0.35em] uppercase mb-6"
        >
          ✦ Wisata Kuliner, Adventure, Glamping Karawang
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-black text-white leading-[0.92] tracking-tight mb-8"
          style={{
            fontSize: "clamp(3.2rem, 9vw, 8rem)",
          }}
        >
          Di Mana Alam
          <br />
          <span className="text-[#a8d5be]">Bertemu</span> Kopi.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-white font-[400] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          Resapi udara pegunungan, nikmati kopi pilihan, dan temukan petualangan
          yang tak terlupakan di Saung Koffie Hideung.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#footer"
            className="group relative inline-flex items-center gap-2 bg-[#2E4F3F] text-white font-[600] text-sm px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#2E4F3F]/25 hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-black/40"
          >
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-0" />
            <span className="relative z-10">Pesan Sekarang</span>
          </a>
          
          <a
            href="#story"
            className="group relative inline-flex items-center gap-2 bg-white text-[#2E4F3F] font-[600] text-sm px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:ring-2 hover:ring-[#2E4F3F] hover:ring-offset-2 hover:ring-offset-black/40"
          >
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-[#2E4F3F]/15 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-0" />
            
            <span className="relative z-10">Kenali Kami</span>
            <svg className="relative z-10" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span className="text-white text-[10px] tracking-[0.3em] uppercase font-[500]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </section>
  );
}