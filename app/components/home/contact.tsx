'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Dict } from '../../[lang]/dictionaries';

const contactItems = [
  { icon: '📞', label: 'Phone',     value: '+976 9100 6969',      href: 'tel:+97691006969' },
  { icon: '✉️', label: 'Email',     value: 'sondorekh@gmail.com', href: 'mailto:sondorekh@gmail.com' },
  { icon: '📸', label: 'Instagram', value: '@marushresort',        href: 'https://instagram.com/marushresort' },
  { icon: '👥', label: 'Facebook',  value: 'Marush Resort',        href: '#' },
  { icon: '💬', label: 'WhatsApp',  value: '+976 9100 6969',      href: 'https://wa.me/97691006969' },
  { icon: '📲', label: 'Viber',     value: '+976 9100 6969',      href: '#' },
];

export default function Contact({ dict }: { dict: Dict['contact'] }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="bg-cream py-32 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[0.62rem] tracking-[0.45em] uppercase text-gold block mb-5">{dict.eyebrow}</span>
          <h2 className="font-serif text-[clamp(2.5rem,4.5vw,4.5rem)] font-light text-ink leading-[1.08]">
            {dict.line1}<br /><em className="italic text-gold">{dict.italic}</em>
          </h2>
          <div className="w-12 h-px bg-gold/50 mx-auto mt-6 mb-6" />
          <p className="text-[0.84rem] text-stone max-w-md mx-auto leading-[1.85]">{dict.body}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center justify-center text-center p-8 border border-gold/12 bg-paper hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <span className="text-2xl mb-3">{item.icon}</span>
              <span className="text-[0.58rem] tracking-[0.28em] uppercase text-gold mb-2">{item.label}</span>
              <span className="font-serif text-[0.95rem] text-ink/75 group-hover:text-ink transition-colors">{item.value}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
