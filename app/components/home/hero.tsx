'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Dict } from '../../[lang]/dictionaries';

export default function Hero({ dict }: { dict: Dict['hero'] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-screen overflow-hidden flex items-center justify-center">

      {/* Parallax video background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.15]">
        <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover">
          <source src="https://res.cloudinary.com/dt43fy6cr/video/upload/f_auto,q_auto,w_1280/v1777986973/copy_BD225703-6E21-42E9-AECD-55EB76DC6EA1_jw6s1r" />
        </video>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[0.62rem] tracking-[0.55em] uppercase text-gold mb-7 font-light drop-shadow"
        >
          {dict.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light text-[clamp(3.2rem,6.5vw,7.5rem)] leading-[1.02] text-white mb-7 [text-shadow:0_2px_28px_rgba(0,0,0,0.6)]"
        >
          {dict.line1}<br />
          <em className="italic text-gold">{dict.line2}</em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-gold mx-auto mb-7 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-[0.85rem] font-light text-white/65 leading-[1.9] max-w-lg mx-auto mb-11 tracking-wide [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]"
        >
          {dict.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#accommodations" className="px-11 py-4 bg-gold text-black text-[0.68rem] tracking-[0.32em] uppercase font-medium hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(198,164,108,0.45)] transition-all duration-300">
            {dict.cta1}
          </a>
          <a href="#services" className="px-11 py-4 border border-white/30 text-white/75 text-[0.68rem] tracking-[0.32em] uppercase hover:border-gold hover:text-gold transition-all duration-300">
            {dict.cta2}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div style={{ opacity }} className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
        <span className="text-[0.52rem] tracking-[0.45em] uppercase text-white/50">{dict.scroll}</span>
        <div className="w-px h-11 bg-gradient-to-b from-gold to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  );
}
