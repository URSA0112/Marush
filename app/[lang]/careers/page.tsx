import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '../dictionaries';
import Navigation from '../../components/Navigation/navigation';
import ApplicationForm from './applicationForm';

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict    = await getDictionary(lang);
  const careers = dict.careers;

  const positionTitles = careers.jobs.map(j => j.title);

  const jobLocation = (id: number) => id === 6 ? careers.location_hybrid : careers.location;

  return (
    <>
      <Navigation lang={lang} />

      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0">
          <img src="/2-2.png" alt="Marush Resort" className="w-full h-full object-cover object-center opacity-35" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <span className="block text-[0.62rem] tracking-[0.5em] uppercase text-gold mb-6 opacity-0 [animation:mFadeUp_0.8s_0.3s_forwards]">
            {careers.hero_eyebrow}
          </span>
          <h1 className="font-serif text-[clamp(3rem,6vw,6rem)] font-light leading-[1.05] text-white opacity-0 [animation:mFadeUp_0.8s_0.5s_forwards]">
            {careers.hero_line1}<br />
            <em className="italic text-gold">{careers.hero_italic}</em>
          </h1>
          <p className="mt-6 text-[0.85rem] font-light tracking-wide leading-relaxed text-white/55 max-w-lg mx-auto opacity-0 [animation:mFadeUp_0.8s_0.7s_forwards]">
            {careers.hero_body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 opacity-0 [animation:mFadeUp_0.8s_0.9s_forwards]">
            <a href="#openings" className="px-11 py-4 bg-gold text-charcoal text-[0.68rem] tracking-[0.32em] uppercase font-medium hover:brightness-110 hover:scale-[1.03] transition-all duration-300">
              {careers.hero_cta1}
            </a>
            <a href="#apply" className="px-11 py-4 border border-white/30 text-white/75 text-[0.68rem] tracking-[0.32em] uppercase hover:border-gold hover:text-gold transition-all duration-300">
              {careers.hero_cta2}
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-40 z-20">
          <span className="text-[0.52rem] tracking-[0.4em] uppercase text-gold">{careers.scroll}</span>
          <div className="w-px h-11 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Culture */}
      <section className="bg-cream py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[0.62rem] tracking-[0.45em] uppercase text-gold block mb-4">{careers.culture_eyebrow}</span>
            <h2 className="font-serif text-[clamp(2.4rem,4vw,4rem)] font-light text-ink leading-[1.08] mb-4">
              {careers.culture_line1}<br /><em className="italic text-gold">{careers.culture_italic}</em>
            </h2>
            <div className="w-12 h-px bg-gold/50 mb-8" />
            <p className="text-[0.85rem] font-light text-stone leading-[1.9] mb-4">{careers.culture_body1}</p>
            <p className="text-[0.85rem] font-light text-stone leading-[1.9]">{careers.culture_body2}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {careers.culture_values.map(item => (
              <div key={item.title} className="p-6 border border-gold/12 bg-paper hover:border-gold/28 transition-all duration-300">
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h4 className="text-[0.82rem] font-medium tracking-wide text-ink mb-2">{item.title}</h4>
                <p className="text-[0.76rem] text-stone leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="openings" className="bg-paper py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="text-[0.62rem] tracking-[0.45em] uppercase text-gold block mb-4">{careers.openings_eyebrow}</span>
            <h2 className="font-serif text-[clamp(2.4rem,4vw,4rem)] font-light text-ink leading-[1.08]">
              {careers.openings_line1}<br /><em className="italic text-gold">{careers.openings_italic}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {careers.jobs.map(job => (
              <div key={job.id} className="group flex flex-col p-7 border border-gold/12 bg-cream hover:border-gold/30 transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold/65 block mb-1">{job.department}</span>
                    <h3 className="font-serif text-[1.05rem] text-ink leading-tight">{job.title}</h3>
                  </div>
                  <span className="flex-shrink-0 text-[10px] tracking-wide uppercase px-2.5 py-1 border border-gold/20 text-gold/70 whitespace-nowrap">
                    {job.type}
                  </span>
                </div>
                <p className="text-[0.76rem] text-stone leading-relaxed flex-1 mb-5">{job.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-stone flex items-center gap-1.5">
                    <span className="text-gold">📍</span>{jobLocation(job.id)}
                  </span>
                  <a href="#apply" className="text-[10px] tracking-[0.2em] uppercase text-gold border border-gold/30 px-4 py-2 hover:bg-gold hover:text-charcoal transition-all duration-300">
                    {careers.apply_link}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream-warm py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[0.62rem] tracking-[0.45em] uppercase text-gold block mb-4">{careers.benefits_eyebrow}</span>
            <h2 className="font-serif text-[clamp(2.4rem,4vw,4rem)] font-light text-ink leading-[1.08]">
              {careers.benefits_line1}<br /><em className="italic text-gold">{careers.benefits_italic}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {careers.benefits.map(b => (
              <div key={b.title} className="flex gap-5 p-6 border border-gold/12 bg-paper hover:border-gold/28 transition-all duration-300">
                <span className="text-3xl flex-shrink-0">{b.icon}</span>
                <div>
                  <h4 className="text-[0.82rem] font-medium tracking-wide text-ink mb-1.5">{b.title}</h4>
                  <p className="text-[0.76rem] text-stone leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="bg-paper py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[0.62rem] tracking-[0.45em] uppercase text-gold block mb-4">{careers.apply_eyebrow}</span>
            <h2 className="font-serif text-[clamp(2.4rem,4vw,4rem)] font-light text-ink leading-[1.08]">
              {careers.apply_line1}<br /><em className="italic text-gold">{careers.apply_italic}</em>
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto mt-6 mb-6" />
            <p className="text-[0.84rem] text-stone max-w-md mx-auto leading-[1.85]">{careers.apply_body}</p>
          </div>
          <ApplicationForm positions={positionTitles} dict={careers} />
        </div>
      </section>
    </>
  );
}
