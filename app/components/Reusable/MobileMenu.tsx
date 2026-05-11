'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => { document.body.style.overflow = ''; }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="m-nav-link flex items-center"
      >
        <Menu size={18} />
      </button>

      {/* Full-screen overlay — clicking anywhere closes */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[200] flex flex-col transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'color-mix(in oklch, var(--cream) 96%, transparent)', backdropFilter: 'blur(16px)' }}
      >
        {/* Close button */}
        <div className="flex justify-end px-5 pt-4 shrink-0">
          <button aria-label="Close menu" className="p-2 opacity-50 hover:opacity-100 transition-opacity">
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col flex-1 justify-evenly px-10 pb-8" onClick={e => e.stopPropagation()}>
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-serif font-light text-[1.25rem] text-ink/60 hover:text-ink border-b border-gold/10 py-3 transition-colors duration-200"
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '260ms',
                transitionTimingFunction: 'ease',
                transitionDelay: `${i * 30}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
