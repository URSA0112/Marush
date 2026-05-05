'use client';
import { useState } from 'react';
import type { Dict } from '../../[lang]/dictionaries';

interface Amenity { icon: string; label: string }

interface BookingButtonProps {
  roomName:  string;
  roomType:  string;
  size:      number;
  price:     string;
  priceNum:  number;
  usd:       string;
  amenities: Amenity[];
  maxGuests: number;
  dict:      Dict['booking'];
}

export default function BookingButton({ roomName, roomType, size, price, priceNum, amenities, maxGuests, dict }: BookingButtonProps) {
  const [open, setOpen]     = useState(false);
  const [step, setStep]     = useState<1 | 2 | 3>(1);
  const [form, setForm]     = useState({ checkIn: '', checkOut: '', guests: '1', name: '', email: '', phone: '', requests: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nights = (() => {
    if (!form.checkIn || !form.checkOut) return 0;
    return Math.max(0, Math.floor((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000));
  })();

  const totalMNT = (priceNum * nights).toLocaleString();
  const totalUSD = Math.round((priceNum / 3500) * nights);
  const today    = new Date().toISOString().split('T')[0];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!form.checkIn)  errs.checkIn  = dict.checkin + ' required';
      if (!form.checkOut) errs.checkOut = dict.checkout + ' required';
      if (form.checkIn && form.checkOut && nights <= 0) errs.checkOut = dict.checkout + ' must be after ' + dict.checkin;
    }
    if (step === 2) {
      if (!form.name.trim())  errs.name  = dict.full_name + ' is required';
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = dict.email + ' invalid';
      if (!form.phone.trim()) errs.phone = dict.phone + ' is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { setStep(1); setForm({ checkIn: '', checkOut: '', guests: '1', name: '', email: '', phone: '', requests: '' }); setErrors({}); }, 300);
  };

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const fmt = (d: string) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  const inputCls = (field: string) =>
    `w-full bg-white/5 border text-white text-xs px-3 py-2.5 focus:outline-none focus:border-gold/50 transition-colors ${errors[field] ? 'border-red-400/50' : 'border-white/10'}`;

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="mt-5 w-full py-3 text-[0.68rem] tracking-[0.25em] uppercase border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
      >
        {dict.book}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
          onClick={e => e.target === e.currentTarget && handleClose()}
        >
          <div className="relative w-full sm:max-w-lg bg-charcoal border border-gold/20 sm:rounded-none rounded-t-2xl shadow-[0_0_80px_rgba(200,174,122,0.12)] max-h-[94vh] flex flex-col">

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/5 flex-shrink-0">
              <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-gold transition" aria-label="Close">✕</button>
              <span className="text-[10px] tracking-[0.35em] uppercase text-gold">{dict.eyebrow}</span>
              <h2 className="font-serif text-xl text-white mt-1">{roomName}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-[10px] tracking-widest uppercase text-white/40 border border-gold/15 px-2 py-0.5">{roomType}</span>
                <span className="text-[10px] tracking-widest uppercase text-white/40 border border-gold/15 px-2 py-0.5">{size} m²</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                {amenities.map(a => (
                  <span key={a.label} className="text-[10px] text-gold/60 flex items-center gap-1.5"><span>{a.icon}</span>{a.label}</span>
                ))}
              </div>
              {step < 3 && (
                <div className="flex gap-1.5 mt-4">
                  {([1, 2] as const).map(s => (
                    <div key={s} className={`h-px flex-1 transition-all duration-500 ${step >= s ? 'bg-gold' : 'bg-white/10'}`} />
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

              {step === 1 && (
                <>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/35">{dict.step1}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-white/40 block mb-1.5">{dict.checkin}</label>
                      <input type="date" min={today} value={form.checkIn}
                        onChange={e => { update('checkIn', e.target.value); if (form.checkOut && e.target.value >= form.checkOut) update('checkOut', ''); }}
                        className={inputCls('checkIn')} />
                      {errors.checkIn && <p className="text-red-400 text-[10px] mt-1">{errors.checkIn}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-white/40 block mb-1.5">{dict.checkout}</label>
                      <input type="date" min={form.checkIn || today} value={form.checkOut}
                        onChange={e => update('checkOut', e.target.value)} className={inputCls('checkOut')} />
                      {errors.checkOut && <p className="text-red-400 text-[10px] mt-1">{errors.checkOut}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-white/40 block mb-1.5">{dict.guests}</label>
                    <select value={form.guests} onChange={e => update('guests', e.target.value)} className={inputCls('guests')}>
                      {Array.from({ length: maxGuests }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n} className="bg-gray-900">{n} {n === 1 ? dict.guest : dict.guests_p}</option>
                      ))}
                    </select>
                  </div>
                  {nights > 0 && (
                    <div className="bg-gold/5 border border-gold/15 p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/40">{price} × {nights} {nights === 1 ? dict.night : dict.nights}</span>
                        <span className="font-serif text-lg text-gold">₮{totalMNT}</span>
                      </div>
                      <div className="text-right text-[10px] text-white/30 mt-0.5">≈ USD {totalUSD}</div>
                      <div className="border-t border-white/5 mt-3 pt-3 flex items-center gap-2 text-[10px] text-gold/55">
                        <span>✓</span><span>{dict.breakfast_included} · {nights} {nights === 1 ? dict.night : dict.nights}</span>
                      </div>
                    </div>
                  )}
                  <button onClick={handleNext} className="w-full py-3 bg-gold text-charcoal text-xs tracking-[0.25em] uppercase font-medium hover:brightness-110 transition-all">
                    {dict.continue}
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/35">{dict.step2}</p>
                  <div className="flex justify-between items-center text-xs px-4 py-3 border border-white/5 bg-white/[0.02]">
                    <span className="text-white/40">{roomName} · {nights} {nights === 1 ? dict.night : dict.nights} · {form.guests} {parseInt(form.guests) === 1 ? dict.guest : dict.guests_p}</span>
                    <span className="text-gold font-serif">₮{totalMNT}</span>
                  </div>
                  {([
                    ['name',  'text',  dict.full_name,  dict.full_name_ph],
                    ['email', 'email', dict.email,      dict.email_ph],
                    ['phone', 'tel',   dict.phone,      dict.phone_ph],
                  ] as const).map(([field, type, label, ph]) => (
                    <div key={field}>
                      <label className="text-[10px] tracking-wider uppercase text-white/40 block mb-1.5">{label}</label>
                      <input type={type} placeholder={ph} value={form[field as keyof typeof form] as string}
                        onChange={e => update(field, e.target.value)} className={inputCls(field)} />
                      {errors[field] && <p className="text-red-400 text-[10px] mt-1">{errors[field]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-white/40 block mb-1.5">
                      {dict.requests} <span className="text-white/25 normal-case">{dict.optional}</span>
                    </label>
                    <textarea placeholder={dict.requests_ph} value={form.requests}
                      onChange={e => update('requests', e.target.value)} rows={3}
                      className="w-full bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 focus:outline-none focus:border-gold/50 resize-none transition-colors" />
                  </div>
                  <p className="text-[10px] text-white/30 leading-relaxed">{dict.confirm_note}</p>
                  <div className="flex gap-3 pt-1">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 border border-white/10 text-white/40 text-xs tracking-widest uppercase hover:border-gold/30 hover:text-white/60 transition-all">{dict.back}</button>
                    <button onClick={handleNext} className="flex-[2] py-3 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-medium hover:brightness-110 transition-all">{dict.confirm}</button>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto">
                    <span className="text-gold text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-gold mb-3">{dict.success_title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed max-w-xs mx-auto">
                      <strong className="text-white">{form.name}</strong> · <strong className="text-white">{roomName}</strong>
                      <br />{fmt(form.checkIn)} → {fmt(form.checkOut)} ({nights} {nights === 1 ? dict.night : dict.nights})
                    </p>
                  </div>
                  <div className="bg-gold/5 border border-gold/15 p-4 text-left space-y-2.5 max-w-xs mx-auto w-full">
                    <div className="flex justify-between text-xs"><span className="text-white/40">{dict.total}</span><span className="text-gold font-serif">₮{totalMNT}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-white/40">{dict.guests_p}</span><span className="text-white">{form.guests}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-white/40">{dict.confirmation_to}</span><span className="text-white truncate max-w-[55%] text-right">{form.email}</span></div>
                  </div>
                  <button onClick={handleClose} className="px-10 py-3 border border-gold/50 text-gold text-xs tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all">{dict.done}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
