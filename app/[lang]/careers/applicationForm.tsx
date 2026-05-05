'use client';
import { useState } from 'react';
import type { Dict } from '../dictionaries';

interface ApplicationFormProps {
  positions: string[];
  dict: Dict['careers'];
}

interface FormState {
  name: string; email: string; phone: string;
  position: string; coverLetter: string; cvFile: File | null;
}

export default function ApplicationForm({ positions, dict }: ApplicationFormProps) {
  const [form, setForm]       = useState<FormState>({ name: '', email: '', phone: '', position: '', coverLetter: '', cvFile: null });
  const [errors, setErrors]   = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const inputBase = 'w-full bg-paper border border-gold/15 text-ink text-xs px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors placeholder:text-stone/40';
  const inputErr  = 'w-full bg-paper border border-red-400/40 text-ink text-xs px-4 py-3 focus:outline-none focus:border-red-400/60 transition-colors';

  const update = (field: keyof FormState, value: string | File | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = dict.err_name;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = dict.err_email;
    if (!form.phone.trim()) errs.phone = dict.err_phone;
    if (!form.position)    errs.position = dict.err_position;
    if (!form.cvFile)      errs.cvFile   = dict.err_cv;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) setSubmitted(true); };

  if (submitted) {
    return (
      <div className="text-center py-20 px-6 space-y-6">
        <div className="w-20 h-20 border border-gold/30 flex items-center justify-center mx-auto">
          <span className="text-gold text-3xl">✓</span>
        </div>
        <h3 className="font-serif text-3xl text-gold">{dict.form_success_title}</h3>
        <p className="text-sm text-stone leading-relaxed max-w-sm mx-auto">
          <strong className="text-ink">{form.name}</strong> · <strong className="text-ink">{form.position}</strong>
          <br /><br />{form.email}
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', position: '', coverLetter: '', cvFile: null }); }}
          className="mt-4 px-8 py-3 border border-gold/50 text-gold text-xs tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all"
        >
          {dict.form_success_another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5" noValidate>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">{dict.form_name}</label>
          <input type="text" placeholder={dict.form_name_ph} value={form.name}
            onChange={e => update('name', e.target.value)} className={errors.name ? inputErr : inputBase} />
          {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">{dict.form_email}</label>
          <input type="email" placeholder={dict.form_email_ph} value={form.email}
            onChange={e => update('email', e.target.value)} className={errors.email ? inputErr : inputBase} />
          {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">{dict.form_phone}</label>
          <input type="tel" placeholder={dict.form_phone_ph} value={form.phone}
            onChange={e => update('phone', e.target.value)} className={errors.phone ? inputErr : inputBase} />
          {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">{dict.form_position}</label>
          <select value={form.position} onChange={e => update('position', e.target.value)}
            className={errors.position ? inputErr : inputBase}>
            <option value="">{dict.form_position_ph}</option>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.position && <p className="text-red-400 text-[10px] mt-1">{errors.position}</p>}
        </div>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">
          {dict.form_cv} <span className="text-stone/50 normal-case text-[10px]">{dict.form_cv_hint}</span>
        </label>
        <input type="file" accept=".pdf,.doc,.docx"
          onChange={e => update('cvFile', e.target.files?.[0] ?? null)}
          className={`w-full text-xs text-stone file:mr-4 file:py-2 file:px-4 file:border file:border-gold/30 file:text-gold file:text-[10px] file:tracking-widest file:uppercase file:bg-transparent file:cursor-pointer hover:file:border-gold/55 transition-all ${errors.cvFile ? 'text-red-400' : ''}`} />
        {errors.cvFile && <p className="text-red-400 text-[10px] mt-1">{errors.cvFile}</p>}
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">
          {dict.form_cover} <span className="text-stone/50 normal-case text-[10px]">{dict.form_optional}</span>
        </label>
        <textarea
          placeholder={dict.form_cover_ph}
          value={form.coverLetter}
          onChange={e => update('coverLetter', e.target.value)}
          rows={5}
          className="w-full bg-paper border border-gold/15 text-ink text-xs px-4 py-3 focus:outline-none focus:border-gold/50 resize-none transition-colors placeholder:text-stone/40"
        />
      </div>

      <button type="submit"
        className="w-full py-4 bg-gold text-charcoal text-xs tracking-[0.3em] uppercase font-medium hover:brightness-110 transition-all duration-300">
        {dict.form_submit}
      </button>

      <p className="text-[10px] text-stone/50 text-center leading-relaxed">{dict.form_privacy}</p>
    </form>
  );
}
