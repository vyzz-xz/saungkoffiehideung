"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface GalleryImage {
  src: string;
  alt: string;
  aspect: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/cafe_night_view.webp",
    alt: "Cafe malam hari yang memukau",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/camping_ground_tents.webp",
    alt: "Area camping ground dengan tenda-tenda",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/swing_ride_adventure.webp",
    alt: "Wahana ayunan ekstrem",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/suspension_bridge_walk.webp",
    alt: "Jembatan gantung dengan pemandangan alam",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gathering.webp",
    alt: "Aktivitas gathering kelompok",
    aspect: "aspect-[4/3]",
  },
];

const allImages = [...galleryImages, ...galleryImages];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="px-6 mb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-px w-10 bg-[#2E4F3F]" />
              <span className="text-[#2E4F3F] font-[600] text-xs tracking-[0.35em] uppercase">
                Galeri
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-[#4E3629] font-[900] leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Momen yang
              <br />
              Tak Terlupakan
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#4E3629]/65 font-medium text-sm md:text-right max-w-xs leading-relaxed"
          >
            Setiap sudut menyimpan cerita. Temukan keindahan yang menanti Anda.
          </motion.p>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {allImages.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`relative flex-shrink-0 w-72 md:w-80 ${img.aspect} overflow-hidden rounded-2xl cursor-pointer`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="320px"
                  className="object-cover object-center"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
