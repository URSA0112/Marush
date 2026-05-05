'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const router   = useRouter();

  const switchTo = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    document.cookie = `locale=${lang};path=/;max-age=31536000;samesite=lax`;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-1.5 text-[10px] tracking-[0.12em]">
      <button
        onClick={() => switchTo('en')}
        className={`uppercase transition-all duration-200 ${currentLang === 'en' ? 'text-gold' : 'opacity-45 hover:opacity-80'}`}
      >
        EN
      </button>
      <span className="opacity-20">·</span>
      <button
        onClick={() => switchTo('mn')}
        className={`uppercase transition-all duration-200 ${currentLang === 'mn' ? 'text-gold' : 'opacity-45 hover:opacity-80'}`}
      >
        МН
      </button>
    </div>
  );
}
