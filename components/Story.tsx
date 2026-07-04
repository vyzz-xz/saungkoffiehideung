"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue, useInView, animate } from "motion/react";

const storyText = `Jauh dari hiruk-pikuk kota, di pelukan perbukitan yang hijau dan sunyi, lahirlah Saung Koffie Hideung. Sebuah tempat di mana waktu bergerak lebih lambat, dan setiap tegukan kopi terasa lebih bermakna. Kami percaya bahwa yang terbaik hadir dari ketenangan udara pegunungan yang segar, aroma biji kopi pilihan yang disangrai dengan sabar, dan kebersamaan yang tulus. Di sini, setiap momen adalah undangan untuk berhenti sejenak, merasakan, dan bersyukur. Inilah rumah kedua Anda.`;
const words = storyText.split(" ");

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}

function AnimatedWord({ word, progress, index, total }: WordProps) {
  const start = index / total;
  const end = Math.min((index + 1) / total, 1);

  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(78,54,41,0.18)", "rgba(78,54,41,1)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.3em] mb-1"
    >
      {word}
    </motion.span>
  );
}

interface CounterProps {
  from?: number;
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

function Counter({ from = 0, to, decimals = 0, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = value.toFixed(decimals) + suffix;
        }
      }
    });
    return () => controls.stop();
  }, [inView, from, to, decimals, suffix, duration]);

  return <span ref={ref}>{from.toFixed(decimals)}{suffix}</span>;
}

export default function Story() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.8"],
  });

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative py-32 md:py-48 px-6"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px w-12 bg-[#2E4F3F]" />
          <span className="text-[#2E4F3F] font-[600] text-xs tracking-[0.35em] uppercase">
            Cerita Kami
          </span>
        </motion.div>

        {/* Scroll-animated text */}
        <p
          className="font-[500] leading-[1.8] md:leading-[2]"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.7rem)" }}
          aria-label={storyText}
        >
          {words.map((word, i) => (
            <AnimatedWord
              key={i}
              word={word}
              progress={scrollYProgress}
              index={i}
              total={words.length}
            />
          ))}
        </p>

        {/* Large Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-28 grid grid-cols-3 gap-2 sm:gap-4 md:gap-12 items-start justify-center text-center w-full"
        >
          <div>
            <p className="text-[#2E4F3F] font-[900] text-3xl sm:text-4xl md:text-8xl mb-1 md:mb-3 tracking-tighter">
              <Counter to={10} suffix="K+" duration={2} />
            </p>
            <p className="text-[#4E3629] font-[700] text-[9px] sm:text-xs md:text-sm tracking-wider md:tracking-widest uppercase leading-tight">Tamu Puas</p>
          </div>
          
          <div>
            <p className="text-[#2E4F3F] font-[900] text-3xl sm:text-4xl md:text-8xl mb-1 md:mb-3 tracking-tighter">
              <Counter to={6} duration={1.5} />
            </p>
            <p className="text-[#4E3629] font-[700] text-[9px] sm:text-xs md:text-sm tracking-wider md:tracking-widest uppercase leading-tight">Wahana & Fasilitas</p>
          </div>
          
          <div>
            <p className="text-[#2E4F3F] font-[900] text-3xl sm:text-4xl md:text-8xl mb-1 md:mb-3 tracking-tighter">
              <Counter to={4.6} decimals={1} suffix="★" duration={2} />
            </p>
            <p className="text-[#4E3629] font-[700] text-[9px] sm:text-xs md:text-sm tracking-wider md:tracking-widest uppercase leading-tight">Rating Google</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}