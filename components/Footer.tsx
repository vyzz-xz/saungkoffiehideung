"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/saungkoffiehideung",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@saungkoffiehideung",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.8 1.54V6.78a4.85 4.85 0 01-1.03-.09z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-white text-neutral-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Top: CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-[#2E4F3F] p-10 md:p-14 mb-20 text-center"
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5" />

          <div className="relative z-10">
            <p className="text-white/70 font-[500] text-sm tracking-[0.3em] uppercase mb-4">
              Siap Berpetualang?
            </p>
            <h2
              className="text-white font-[900] mb-6 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Pesan Sekarang via WhatsApp
            </h2>
            <p className="text-white/70 text-base mb-8 max-w-md mx-auto leading-relaxed">
              Tim kami siap membantu merencanakan kunjungan sempurna Anda. Respons cepat, pelayanan tulus.
            </p>
            <motion.a
              href="https://wa.me/6281234567890?text=Halo%20Saung%20Koffie%20Hideung%2C%20saya%20ingin%20melakukan%20reservasi."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-[700] text-base px-8 py-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#22c55e] transition-colors duration-200"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat di WhatsApp
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-neutral-200">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-[60px] h-[44px] flex-shrink-0">
                <Image
                  src="/images/logo_saung_koffie_hideung.webp"
                  alt="Logo Saung Koffie"
                  fill
                  loading="eager"
                  sizes="60px"
                  className="object-contain object-left"
                />
              </div>
              <div>
                <p className="font-[700] text-base leading-tight text-neutral-900">Saung Koffie</p>
                <p className="font-[700] text-base leading-tight text-neutral-600">Hideung</p>
              </div>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed font-[400]">
              Destinasi alam dan kopi yang memadukan keindahan pegunungan dengan kehangatan pelayanan.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-[#2E4F3F]/10 hover:text-[#2E4F3F] transition-colors duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-[700] text-sm tracking-wider uppercase mb-5 text-neutral-400">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Beranda", href: "#" },
                { label: "Cerita Kami", href: "#story" },
                { label: "Fasilitas", href: "#fasilitas" },
                { label: "Galeri", href: "#gallery" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-600 font-medium text-sm hover:text-[#31523E] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[700] text-sm tracking-wider uppercase mb-5 text-neutral-400">
              Hubungi Kami
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 shrink-0 text-[#2E4F3F]" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <p className="text-neutral-600 text-sm font-[400] leading-relaxed">
                  Jl. Raya Puncak Sempur, Cintalaksana, Kec. Pangkalan,
                  Kabupaten Karawang, Jawa Barat
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <svg className="shrink-0 text-[#2E4F3F]" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:+6281234567890" className="text-neutral-600 text-sm group-hover:text-[#2E4F3F] transition-colors duration-200">
                  +62 812-3456-7890
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <svg className="shrink-0 text-[#2E4F3F]" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:hello@saungkoffiehideung.id" className="text-neutral-600 text-sm group-hover:text-[#2E4F3F] transition-colors duration-200">
                  hello@saungkoffiehideung.id
                </a>
              </div>

              {/* Google Maps Embed */}
              <div className="mt-6 w-full overflow-hidden rounded-2xl shadow-sm border border-neutral-100">
                <iframe
                  title="Lokasi Saung Koffie Hideung"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1907.0522690755065!2d107.25381774928508!3d-6.541460736662566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69a7af4e09941f%3A0x2c07f0ede3fd85af!2sSaung%20Koffie%20Hideung!5e0!3m2!1sen!2sid!4v1783135695729!5m2!1sen!2sid"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[160px] grayscale-[0.3] opacity-90 transition-all duration-500 hover:grayscale-0 hover:opacity-100 block"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-xs font-medium">
          <p>© {new Date().getFullYear()} Saung Koffie Hideung. All Copyright.</p>
          <p className="flex items-center gap-1 hover:text-[#2E4F3F] transition-colors cursor-pointer">
            Dibuat oleh Muhamad Hafiz
          </p>
        </div>

      </div>
    </footer>
  );
}