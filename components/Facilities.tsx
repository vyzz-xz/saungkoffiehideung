"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FacilityItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  colSpan?: string;
  tariffs: string[];
}

const facilities: FacilityItem[] = [
  {
    id: "cafe-resto",
    title: "Cafe & Resto",
    description: "Sajian kopi pilihan & kuliner lezat di tengah alam terbuka.",
    image: "/images/outdoor_cafe_area.webp",
    tag: "Kuliner",
    colSpan: "md:col-span-2",
    tariffs: ["/images/menu_makanan.webp", "/images/menu_minuman.webp"],
  },
  {
    id: "glamping-saung",
    title: "Glamping Saung",
    description: "Menginap mewah dalam saung tradisional dengan panorama alam.",
    image: "/images/traditional_saung_glamping.webp",
    tag: "Penginapan",
    colSpan: "md:col-span-1",
    tariffs: ["/images/tarif_camping.webp"],
  },
  {
    id: "cabin-glamping",
    title: "Cabin Glamping",
    description: "Kabin modern dengan sentuhan alam untuk pengalaman unik.",
    image: "/images/cabin_glamping_exterior.webp",
    tag: "Penginapan",
    colSpan: "md:col-span-1",
    tariffs: ["/images/tarif_cabin.webp", "/images/tarif_premium_cabin.webp"],
  },
  {
    id: "atv-adventure",
    title: "ATV Adventure",
    description: "Jelajahi medan pegunungan dengan kendaraan ATV yang menantang.",
    image: "/images/atv_adventure.webp",
    tag: "Petualangan",
    colSpan: "md:col-span-2",
    tariffs: ["/images/tarif_atv.webp"],
  },
  {
    id: "sky-bike",
    title: "Wahana Adventure",
    description: "Bersepeda di ketinggian dengan pemandangan yang memukau.",
    image: "/images/sky_bike_ride.webp",
    tag: "Petualangan",
    colSpan: "md:col-span-2",
    tariffs: ["/images/tarif_wahana.webp"],
  },
  {
    id: "meeting-room",
    title: "VIP Meeting Room",
    description: "Ruang pertemuan premium dengan nuansa alam yang inspiratif.",
    image: "/images/vip_meeting_room.webp",
    tag: "Bisnis",
    colSpan: "md:col-span-1",
    tariffs: ["/images/tarif_meeting_room.webp"],
  },
];

const tagColors: Record<string, string> = {
  Kuliner: "bg-[#2E4F3F] text-white",
  Penginapan: "bg-[#2E4F3F] text-white",
  Petualangan: "bg-[#2E4F3F] text-white",
  Bisnis: "bg-[#2E4F3F] text-white",
};

export default function Facilities() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedId]);

  const selectedFacility = facilities.find((item) => item.id === selectedId);

  return (
    <section id="fasilitas" className="py-24 md:py-36 px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-px w-10 bg-[#2E4F3F]" />
              <span className="text-[#2E4F3F] font-semibold text-xs tracking-[0.35em] uppercase">
                Fasilitas & Destinasi
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
              Semua yang Anda
              <br />
              Butuhkan Ada di Sini
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#4E3629]/65 font-medium text-base max-w-xs leading-relaxed md:text-right"
          >
            Dari secangkir kopi pagi hingga petualangan sore satu destinasi, tak terhitung kenangan.
          </motion.p>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {facilities.map((item, index) => (
            <motion.div
              layoutId={`card-${item.id}`}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-60px" }}
              className={`group relative overflow-hidden rounded-3xl col-span-1 ${item.colSpan || ""} h-[300px] md:h-[320px] cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <motion.div layoutId={`image-${item.id}`} className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={index < 4} 
                    sizes={item.colSpan === "md:col-span-2" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                  />
                </motion.div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-[1] transition-colors duration-500 group-hover:bg-black/40 rounded-3xl" />

              <div className="absolute top-5 left-5 z-[2]">
                <span className={`text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm backdrop-blur-md ${tagColors[item.tag] || "bg-white/20 text-white"}`}>
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-[2] flex flex-col justify-end h-full overflow-hidden">
                <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-y-12 group-hover:translate-y-0">
                  <motion.h3 layoutId={`title-${item.id}`} className="text-white font-bold text-xl md:text-2xl leading-tight mb-2">
                    {item.title}
                  </motion.h3>
                  <p className="text-white/80 text-sm font-medium leading-relaxed line-clamp-2 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                  </p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 inline-block bg-white text-[#2C1A12] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#31523E] hover:text-white transform translate-y-4 group-hover:translate-y-0 text-center">
                    Lihat Detail & Tarif
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── EXPANDABLE MODAL ── */}
      <AnimatePresence>
        {selectedId && selectedFacility && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto cursor-pointer"
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              layoutId={`card-${selectedFacility.id}`}
              className="relative w-full max-w-[900px] bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row pointer-events-auto h-[90vh] md:h-[80vh] m-2"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-2 rounded-full transition-colors"
                aria-label="Tutup"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="relative w-full md:w-5/12 h-[35vh] md:h-full flex-shrink-0 bg-[#2C1A12]">
                <motion.div layoutId={`image-${selectedFacility.id}`} className="absolute inset-0 w-full h-full">
                   <Image
                      src={selectedFacility.image}
                      alt={selectedFacility.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 40vw" 
                      className="object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 z-10">
                  <motion.h3 layoutId={`title-${selectedFacility.id}`} className="text-white font-bold text-2xl md:text-3xl leading-tight mb-2">
                    {selectedFacility.title}
                  </motion.h3>
                  <p className="text-white/90 text-sm line-clamp-3">{selectedFacility.description}</p>
                </div>
              </div>

              <div className="w-full md:w-7/12 p-6 overflow-y-auto flex flex-col gap-6 bg-white">
                <h4 className="text-[#4E3629] font-bold text-lg border-b border-gray-100 pb-2">Detail Tarif & Layanan</h4>
                
                {selectedFacility.tariffs.map((tariffImg, idx) => (
                  <div key={idx} className="relative w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={tariffImg}
                      alt={`Tarif ${selectedFacility.title} - ${idx + 1}`}
                      fill
                      priority
                      className="object-contain bg-gray-50"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                ))}
                <div className="pt-4 text-center">
                   <a
                    href="#footer"
                    onClick={() => setSelectedId(null)}
                    className="inline-block bg-[#2E4F3F] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-[#203a2e] transition-colors shadow-md"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}