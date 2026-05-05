'use client';
import { useState } from 'react';

interface ApplicationFormProps { positions: string[] }

interface FormState {
  name: string; email: string; phone: string;
  position: string; coverLetter: string; cvFile: File | null;
}

const inputBase = 'w-full bg-paper border border-gold/15 text-ink text-xs px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors placeholder:text-stone/40';
const inputErr  = 'w-full bg-paper border border-red-400/40 text-ink text-xs px-4 py-3 focus:outline-none focus:border-red-400/60 transition-colors';

export default function ApplicationForm({ positions }: ApplicationFormProps) {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', position: '', coverLetter: '', cvFile: null });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string | File | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.position) errs.position = 'Please select a position';
    if (!form.cvFile)   errs.cvFile   = 'CV / Resume is required';
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
        <h3 className="font-serif text-3xl text-gold">Application Submitted</h3>
        <p className="text-sm text-stone leading-relaxed max-w-sm mx-auto">
          Thank you, <strong className="text-ink">{form.name}</strong>. We&apos;ve received your application for{' '}
          <strong className="text-ink">{form.position}</strong>.<br /><br />
          Our team will review your profile and reach out at <strong className="text-ink">{form.email}</strong> within 5–7 business days.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', position: '', coverLetter: '', cvFile: null }); }}
          className="mt-4 px-8 py-3 border border-gold/50 text-gold text-xs tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5" noValidate>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">Full Name</label>
          <input type="text" placeholder="Your full name" value={form.name}
            onChange={e => update('name', e.target.value)} className={errors.name ? inputErr : inputBase} />
          {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">Email Address</label>
          <input type="email" placeholder="your@email.com" value={form.email}
            onChange={e => update('email', e.target.value)} className={errors.email ? inputErr : inputBase} />
          {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">Phone Number</label>
          <input type="tel" placeholder="+976 9100 0000" value={form.phone}
            onChange={e => update('phone', e.target.value)} className={errors.phone ? inputErr : inputBase} />
          {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">Position Applying For</label>
          <select value={form.position} onChange={e => update('position', e.target.value)}
            className={errors.position ? inputErr : inputBase}>
            <option value="">Select a position</option>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.position && <p className="text-red-400 text-[10px] mt-1">{errors.position}</p>}
        </div>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">
          CV / Resume <span className="text-stone/50 normal-case text-[10px]">PDF, DOC, DOCX — max 5MB</span>
        </label>
        <input type="file" accept=".pdf,.doc,.docx"
          onChange={e => update('cvFile', e.target.files?.[0] ?? null)}
          className={`w-full text-xs text-stone file:mr-4 file:py-2 file:px-4 file:border file:border-gold/30 file:text-gold file:text-[10px] file:tracking-widest file:uppercase file:bg-transparent file:cursor-pointer hover:file:border-gold/55 transition-all ${errors.cvFile ? 'text-red-400' : ''}`} />
        {errors.cvFile && <p className="text-red-400 text-[10px] mt-1">{errors.cvFile}</p>}
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-stone mb-1.5">
          Cover Letter <span className="text-stone/50 normal-case text-[10px]">(optional)</span>
        </label>
        <textarea
          placeholder="Tell us why you'd love to work at Marush Resort..."
          value={form.coverLetter}
          onChange={e => update('coverLetter', e.target.value)}
          rows={5}
          className="w-full bg-paper border border-gold/15 text-ink text-xs px-4 py-3 focus:outline-none focus:border-gold/50 resize-none transition-colors placeholder:text-stone/40"
        />
      </div>

      <button type="submit"
        className="w-full py-4 bg-gold text-charcoal text-xs tracking-[0.3em] uppercase font-medium hover:brightness-110 transition-all duration-300">
        Submit Application
      </button>

      <p className="text-[10px] text-stone/50 text-center leading-relaxed">
        By submitting, you agree to our privacy policy. Your data will only be used for recruitment purposes.
      </p>
    </form>
  );
}
