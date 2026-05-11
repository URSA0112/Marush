import { cookies } from 'next/headers';
import Link from 'next/link';
import ThemeToggle from '../Reusable/ThemeToggle';
import LanguageSwitcher from '../Reusable/LanguageSwitcher';
import MobileMenu from '../Reusable/MobileMenu';
import { getDictionary, hasLocale, type Locale } from '../../[lang]/dictionaries';

export default async function Navigation({ lang: langProp }: { lang?: string }) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('locale')?.value;
  const lang = (langProp && hasLocale(langProp) ? langProp : (cookieLang === 'mn' ? 'mn' : 'en')) as Locale;
  const dict = await getDictionary(lang);
  const t = dict.nav;

  const links = [
    { href: `/${lang}#home`,           label: t.home },
    { href: `/${lang}#about`,          label: t.about },
    { href: `/${lang}#services`,       label: t.services },
    { href: `/${lang}#accommodations`, label: t.stays },
    { href: `/${lang}#location`,       label: t.location },
    { href: `/${lang}#contact`,        label: t.contact },
    { href: `/${lang}/careers`,        label: t.careers },
  ];

  return (
    <nav className="m-nav">
      <Link href={`/${lang}`} className="m-wordmark">Marush</Link>

      {/* Desktop links */}
      <div className="m-nav-links mt-1">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="m-nav-link">{link.label}</a>
        ))}
        <LanguageSwitcher currentLang={lang} />
        <ThemeToggle />
      </div>

      {/* Mobile controls */}
      <div className="flex md:hidden items-center gap-4">
        <LanguageSwitcher currentLang={lang} />
        <ThemeToggle />
        <MobileMenu links={links} />
      </div>
    </nav>
  );
}
