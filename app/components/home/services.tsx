'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Dict } from '../../[lang]/dictionaries';

function ServiceCard({ title, desc, delay, inView }: { title: string; desc: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group p-7 border border-gold/12 bg-cream hover:border-gold/30 transition-all duration-300"
    >
      <div className="w-9 h-9 mb-5 flex items-center justify-center border border-gold/25 text-gold text-sm group-hover:border-gold/55 transition-colors">✦</div>
      <h4 className="font-serif text-[1.1rem] font-light text-ink mb-2.5">{title}</h4>
      <p className="text-[0.78rem] text-stone leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function Services({ dict }: { dict: Dict['services'] }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" ref={ref} className="bg-paper py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span className="text-[0.62rem] tracking-[0.45em] uppercase text-gold block mb-5">{dict.eyebrow}</span>
          <h2 className="font-serif text-[clamp(2.5rem,4.5vw,4.5rem)] font-light text-ink leading-[1.08]">
            {dict.line1} <em className="italic text-gold">{dict.italic}</em>
          </h2>
          <div className="w-12 h-px bg-gold/50 mt-6" />
        </motion.div>

        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[0.62rem] tracking-[0.4em] uppercase text-stone mb-9 pb-4 border-b border-gold/12"
          >
            {dict.hotel_heading}
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dict.services.map((s, i) => <ServiceCard key={s.title} {...s} delay={0.25 + i * 0.08} inView={inView} />)}
          </div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[0.62rem] tracking-[0.4em] uppercase text-stone mb-9 pb-4 border-b border-gold/12"
          >
            {dict.exp_heading}
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.experiences.map((e, i) => <ServiceCard key={e.title} {...e} delay={0.55 + i * 0.08} inView={inView} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
