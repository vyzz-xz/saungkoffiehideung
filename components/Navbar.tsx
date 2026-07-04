"use client";

import { useState, useEffect } from "react";
import { motion, Transition, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileBookingOpen, setIsMobileBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const smoothTransition: Transition = {
    type: "tween",
    ease: [0.25, 0.8, 0.25, 1],
    duration: 0.5,
  };

  const navLinks = [
    { label: "Home", targetId: "home" },
    { label: "Fasilitas", targetId: "fasilitas" }, 
    { label: "Galeri", targetId: "gallery" },       
    { label: "Contact", targetId: "footer" },        
  ];
  
  const bookingOptions = [
    { name: "Email", href: "mailto:hello@saungkoffiehideung.id" },
    { name: "WhatsApp", href: "https://wa.me/6281234567890" },
    { name: "Instagram", href: "https://instagram.com/saungkoffiehideung" },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 90; 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bg-white pointer-events-auto"
          initial={false}
          animate={{
            width: isScrolled ? "min(850px, calc(100% - 2rem))" : "100%",
            height: isScrolled ? "70px" : "90px",
            top: isScrolled ? "16px" : "0px",
            borderRadius: isScrolled ? "9999px" : "0px",
            boxShadow: isScrolled
              ? "0 10px 40px -10px rgba(0,0,0,0.15)"
              : "0 0px 0px rgba(0,0,0,0)",
          }}
          transition={smoothTransition}
        />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-between pointer-events-auto"
          initial={false}
          animate={{
            width: isScrolled ? "min(850px, calc(100% - 2rem))" : "100%",
            maxWidth: "1280px",
            height: isScrolled ? "70px" : "90px",
            top: isScrolled ? "16px" : "0px",
            padding: isScrolled ? "0 1.5rem" : "0 2rem",
          }}
          transition={smoothTransition}
        >
          
          <div 
            className="flex-shrink-0 relative z-10 cursor-pointer flex items-center h-full"
            onClick={() => window.location.reload()}
          >
            <div className="relative w-[120px] h-[35px] md:w-[160px] md:h-[50px]">
              <Image
                src="/images/logo_saung_koffie_hideung.webp"
                alt="Saung Koffie Hideung"
                fill
                loading="eager"
                sizes="(max-width: 768px) 120px, 160px"
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 z-10"
            onMouseLeave={() => setHoveredMenu(null)}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={`#${item.targetId}`}
                onClick={(e) => handleScrollToSection(e, item.targetId)}
                onMouseEnter={() => setHoveredMenu(item.label)}
                className={`relative px-5 py-2 font-semibold text-[15px] transition-colors duration-300 rounded-full ${
                  hoveredMenu === item.label ? "text-white" : "text-[#4A3525]"
                }`}
              >
                {hoveredMenu === item.label && (
                  <motion.div
                    layoutId="hover-pill"
                    className="absolute inset-0 bg-[#31523E] rounded-full -z-10" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="flex-shrink-0 relative z-10 flex items-center gap-4">
            
            <div 
              className="relative hidden md:block"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm ${
                  isDropdownOpen 
                  ? "bg-[#254030] text-white ring-2 ring-[#254030] ring-offset-2" 
                  : "bg-[#31523E] text-white hover:bg-[#254030]"
                }`}
              >
                Book Now
                <motion.svg 
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-3 w-48 bg-[#31523E] rounded-xl overflow-hidden shadow-xl py-2 flex flex-col border border-white/10"
                  >
                    {bookingOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 text-white text-sm font-medium transition-colors duration-200 hover:bg-[#456C53] flex items-center justify-between"
                      >
                        {option.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center p-2 text-[#4A3525]"
              aria-label="Buka Menu"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

        </motion.div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              className="fixed top-4 left-4 right-4 bg-white rounded-[2rem] shadow-2xl z-[70] overflow-hidden md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div 
                  className="relative w-[120px] h-[30px] cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  <Image
                    src="/images/logo_saung_koffie_hideung.webp"
                    alt="Saung Koffie Hideung"
                    fill
                    loading="eager"
                    sizes="120px"
                    className="object-contain object-left"
                  />
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-black transition-colors"
                  aria-label="Tutup Menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col p-4">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={`#${item.targetId}`}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false); 
                      handleScrollToSection(e, item.targetId);
                    }}
                    className="px-4 py-4 text-lg font-medium text-[#4A3525] border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    {item.label}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </a>
                ))}
                
                <div className="mt-6 px-2 pb-2">
                  <button 
                    onClick={() => setIsMobileBookingOpen(!isMobileBookingOpen)}
                    className="w-full flex items-center justify-center gap-2 bg-[#31523E] hover:bg-[#254030] text-white py-4 rounded-2xl font-bold text-base shadow-md transition-colors"
                  >
                    Book Now
                    <motion.svg 
                      animate={{ rotate: isMobileBookingOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {isMobileBookingOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-2 bg-[#FAF8F5] rounded-xl border border-gray-100"
                      >
                        <div className="flex flex-col py-2">
                          {bookingOptions.map((option) => (
                            <a 
                              key={option.name} 
                              href={option.href} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-3 text-center text-[#31523E] font-semibold hover:bg-gray-200 transition-colors"
                            >
                              {option.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}