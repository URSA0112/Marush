export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-forest-deep">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="/2.png"
          alt=""
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-black/90 via-forest-deep/60 to-forest-deep/40" />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-8 md:px-16 pt-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr] gap-12 md:gap-16">

            {/* Brand */}
            <div>
              <span className="font-serif text-[0.85rem] tracking-[0.35em] uppercase text-gold block mb-5">
                Marush Hotel &amp; Resort
              </span>
              <div className="w-10 h-px bg-gold/40 mb-5" />
              <p className="text-[0.82rem] text-ivory/50 leading-[1.85] max-w-[300px] font-light">
                A refined luxury escape set within the untamed landscapes of
                Töv Province — where Mongolian heritage, stillness, and
                world-class comfort meet.
              </p>
              <div className="mt-7 space-y-1.5 text-[0.78rem] text-ivory/40 font-light">
                <p>+976 9100 6969</p>
                <p>sondorekh@gmail.com</p>
                <p>Üdeligiin Dugan · Töv Province · Mongolia</p>
              </div>
            </div>

            {/* Stay */}
            <div>
              <h5 className="text-[0.6rem] tracking-[0.32em] uppercase text-gold mb-6">Stay</h5>
              <ul className="space-y-3">
                {['Classic Room', 'Family Room', 'Group Room', 'The Khan Suite'].map(item => (
                  <li key={item}>
                    <a
                      href="#accommodations"
                      className="text-[0.8rem] text-ivory/45 hover:text-ivory/80 transition-colors duration-200 font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div>
              <h5 className="text-[0.6rem] tracking-[0.32em] uppercase text-gold mb-6">Experience</h5>
              <ul className="space-y-3">
                {['Nature & Landscape', 'Horse Riding', 'Nomadic Culture', 'Wellness & Spa'].map(item => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-[0.8rem] text-ivory/45 hover:text-ivory/80 transition-colors duration-200 font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/8 mx-8 md:mx-16">
          <div className="max-w-7xl mx-auto py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[0.65rem] tracking-[0.12em] text-ivory/28 font-light">
              © {year} Marush Hotel &amp; Resort · All rights reserved
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Sitemap'].map(l => (
                <a
                  key={l}
                  href="#"
                  className="text-[0.62rem] tracking-[0.12em] uppercase text-ivory/25 hover:text-gold/70 transition-colors duration-200"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
