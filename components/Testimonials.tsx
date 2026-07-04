"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Review {
  id: number;
  name: string;
  initial: string;
  rating: number;
  text: string;
  date: string;
  via: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Anggitresa",
    initial: "A",
    rating: 5,
    text: "Makanannya enak dan harga terjangkau. Porsi kentang goreng banyak dibanding tempat lain, wedang jahe berasa jahenya dan panas. Rekomen banget!",
    date: "2 minggu lalu",
    via: "Google Reviews",
  },
  {
    id: 2,
    name: "Lala Komalasari",
    initial: "L",
    rating: 5,
    text: "Jalanan buat menuju ke tempat ini lumayan agak ekstrim tapi puas sama tempat & makanannya. Ga cuma jual pemandangan tapi makanannya juga enak semua.",
    date: "1 bulan lalu",
    via: "Google Reviews",
  },
  {
    id: 3,
    name: "Rizky Firmansyah",
    initial: "R",
    rating: 5,
    text: "Tempatnya keren banget! Pemandangan alam yang indah, udara segar, dan kopinya mantap. Buat yang suka suasana alam wajib banget ke sini. Staf-nya juga ramah dan helpful.",
    date: "3 minggu lalu",
    via: "Google Reviews",
  },
  {
    id: 4,
    name: "Siti Nurhaliza",
    initial: "S",
    rating: 5,
    text: "Sungguh tempat yang sempurna untuk melarikan diri dari kesibukan kota. Saung-nya nyaman, pemandangannya luar biasa, dan menu makanannya variatif. Pasti akan kembali lagi!",
    date: "1 bulan lalu",
    via: "Google Reviews",
  },
  {
    id: 5,
    name: "Dimas Pratama",
    initial: "D",
    rating: 5,
    text: "Wahana ATV-nya seru banget! Anak-anak seneng banget main di sini. Tempatnya bersih, fasilitasnya lengkap. Sky Bike-nya juga jadi pengalaman tak terlupakan buat keluarga kami.",
    date: "2 bulan lalu",
    via: "Google Reviews",
  },
];

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#F59E0B" : "none"}
      stroke="#F59E0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-label="Google"
      role="img"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}


const avatarPalettes: Record<number, { bg: string; text: string }> = {
  0: { bg: "#2E4F3F", text: "#FAF8F5" },
  1: { bg: "#4E3629", text: "#FAF8F5" },
  2: { bg: "#7A5C44", text: "#FAF8F5" },
  3: { bg: "#3D6B52", text: "#FAF8F5" },
  4: { bg: "#5C4033", text: "#FAF8F5" },
};

function Avatar({ initial, index }: { initial: string; index: number }) {
  const palette = avatarPalettes[index % 5];
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black flex-shrink-0 select-none"
      style={{ backgroundColor: palette.bg, color: palette.text }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}


const CARD_OFFSETS: { scale: number; y: number; opacity: number; zIndex: number }[] = [
  { scale: 1,    y: 0,  opacity: 1,    zIndex: 30 },
  { scale: 0.95, y: 16, opacity: 0.7,  zIndex: 20 }, 
  { scale: 0.90, y: 30, opacity: 0.45, zIndex: 10 }, 
];

const springConfig = { type: "spring" as const, stiffness: 200, damping: 25 };

const exitVariants = {
  exitLeft: {
    x: "-120%",
    rotate: -12,
    opacity: 0,
    scale: 0.85,
    transition: { ...springConfig },
  },
  exitRight: {
    x: "120%",
    rotate: 12,
    opacity: 0,
    scale: 0.85,
    transition: { ...springConfig },
  },
};


export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const total = reviews.length;

  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setActiveIndex((prev) =>
        dir === "right" ? (prev + 1) % total : (prev - 1 + total) % total
      );
    },
    [isAnimating, total]
  );

  const handleNext = () => navigate("right");
  const handlePrev = () => navigate("left");
  const visibleStack = [0, 1, 2].map((offset) => ({
    review: reviews[(activeIndex + offset) % total],
    originalIndex: (activeIndex + offset) % total,
    stackPosition: offset,
  }));

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-36 px-6 bg-[#FAF8F5] overflow-hidden"
      aria-label="Testimoni Pelanggan"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #2E4F3F 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #4E3629 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-px w-10 bg-[#2E4F3F]" />
              <span className="text-[#2E4F3F] font-semibold text-xs tracking-[0.35em] uppercase">
                Ulasan
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-[#4E3629] font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Kata Mereka
              <br />
              Tentang Kami
            </motion.h2>
          </div>

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-[#4E3629]/8 self-start md:self-auto"
          >
            <div className="flex items-center justify-center w-10 h-10">
              <GoogleLogo />
            </div>
            <div className="h-10 w-px bg-[#4E3629]/10" />
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled />
                ))}
              </div>
              <p className="text-[#4E3629] font-bold text-sm leading-none">
                4.6 <span className="font-normal text-[#4E3629]/60">· 100+ ulasan</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── CAROUSEL AREA ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Stacked Card Deck */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="relative w-full lg:w-[520px] flex-shrink-0"
            style={{ height: "340px" }}
            aria-live="polite"
            aria-label={`Ulasan ${activeIndex + 1} dari ${total}`}
          >
            <AnimatePresence
              mode="popLayout"
              onExitComplete={() => setIsAnimating(false)}
            >
              {visibleStack
                .slice()
                .reverse()
                .map(({ review, originalIndex, stackPosition }) => {
                  const offset = CARD_OFFSETS[stackPosition];
                  const isFront = stackPosition === 0;

                  return (
                    <motion.div
                      key={`${review.id}-${activeIndex}`}
                      initial={
                        isFront
                          ? {
                              x: direction === "right" ? "80%" : "-80%",
                              opacity: 0,
                              scale: 0.88,
                              rotate: direction === "right" ? 8 : -8,
                            }
                          : false
                      }
                      animate={{
                        x: 0,
                        y: offset.y,
                        scale: offset.scale,
                        opacity: offset.opacity,
                        rotate: 0,
                        zIndex: offset.zIndex,
                      }}
                      exit={
                        isFront
                          ? direction === "right"
                            ? "exitLeft"
                            : "exitRight"
                          : undefined
                      }
                      variants={exitVariants}
                      transition={
                        isFront
                          ? springConfig
                          : { ...springConfig, delay: 0.04 * stackPosition }
                      }
                      className="absolute inset-x-0 top-0 w-full"
                      style={{ zIndex: offset.zIndex, originX: 0.5, originY: 1 }}
                      aria-hidden={!isFront}
                    >
                      <ReviewCard review={review} reviewIndex={originalIndex} />
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start gap-8 flex-1 pb-4"
          >
            <div
              aria-hidden="true"
              className="text-[#2E4F3F]/10 font-black leading-none select-none"
              style={{ fontSize: "clamp(6rem, 12vw, 10rem)", lineHeight: 0.85 }}
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[#4E3629]/70 font-medium leading-relaxed text-base md:text-lg max-w-sm italic"
              >
                &ldquo;{reviews[activeIndex].text}&rdquo;
                <footer className="mt-3 not-italic">
                  <span className="text-[#4E3629] font-bold text-sm not-italic">
                    — {reviews[activeIndex].name}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex items-center gap-6 mt-2">
              <button
                id="testimonial-prev"
                onClick={handlePrev}
                disabled={isAnimating}
                aria-label="Ulasan sebelumnya"
                className="group w-12 h-12 rounded-full border-2 border-[#4E3629]/20 flex items-center justify-center
                           transition-all duration-300 hover:border-[#2E4F3F] hover:bg-[#2E4F3F] hover:shadow-md
                           disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#4E3629] group-hover:text-white transition-colors duration-300"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>

              <div className="flex flex-col items-center gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-[#4E3629] font-black text-2xl tabular-nums leading-none"
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <div className="w-8 h-px bg-[#4E3629]/30" />
                <span className="text-[#4E3629]/50 font-medium text-sm tabular-nums leading-none">
                  {String(total).padStart(2, "0")}
                </span>
              </div>

              <button
                id="testimonial-next"
                onClick={handleNext}
                disabled={isAnimating}
                aria-label="Ulasan berikutnya"
                className="group w-12 h-12 rounded-full border-2 border-[#4E3629]/20 flex items-center justify-center
                           transition-all duration-300 hover:border-[#2E4F3F] hover:bg-[#2E4F3F] hover:shadow-md
                           disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#4E3629] group-hover:text-white transition-colors duration-300"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2" role="tablist" aria-label="Pilih ulasan">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Ulasan ${i + 1}`}
                  id={`testimonial-dot-${i}`}
                  onClick={() => {
                    if (isAnimating || i === activeIndex) return;
                    setDirection(i > activeIndex ? "right" : "left");
                    setIsAnimating(true);
                    setActiveIndex(i);
                  }}
                  className="transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4F3F]"
                  style={{
                    width: i === activeIndex ? "28px" : "8px",
                    height: "8px",
                    backgroundColor:
                      i === activeIndex
                        ? "#2E4F3F"
                        : "rgba(78, 54, 41, 0.25)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function ReviewCard({
  review,
  reviewIndex,
}: {
  review: Review;
  reviewIndex: number;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-[#4E3629]/6 p-7 md:p-8 w-full select-none">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <Avatar initial={review.initial} index={reviewIndex} />
          <div>
            <p className="text-[#4E3629] font-bold text-base leading-tight">
              {review.name}
            </p>
            <p className="text-[#4E3629]/50 text-xs font-medium mt-0.5">
              {review.date}
            </p>
          </div>
        </div>
        {/* Google badge */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] rounded-full px-3 py-1.5 flex-shrink-0">
          <GoogleLogo />
          <span className="text-[#4E3629]/60 text-[11px] font-semibold leading-none">
            Google
          </span>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-5" aria-label={`Rating ${review.rating} dari 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < review.rating} />
        ))}
      </div>

      {/* Review text */}
      <p className="text-[#4E3629] font-medium text-[15px] leading-relaxed line-clamp-4">
        {review.text}
      </p>

      {/* Bottom divider + attribution */}
      <div className="mt-6 pt-5 border-t border-[#4E3629]/8 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#2E4F3F]" aria-hidden="true" />
        <span className="text-[#4E3629]/50 text-xs font-medium">
          Diposting via {review.via}
        </span>
      </div>
    </div>
  );
}
