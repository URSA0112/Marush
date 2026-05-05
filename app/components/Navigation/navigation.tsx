import { cookies } from 'next/headers';
import Link from 'next/link';
import ThemeToggle from '../Reusable/ThemeToggle';
import LanguageSwitcher from '../Reusable/LanguageSwitcher';
import { getDictionary, hasLocale, type Locale } from '../../[lang]/dictionaries';

export default async function Navigation({ lang: langProp }: { lang?: string }) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('locale')?.value;
  const lang = (langProp && hasLocale(langProp) ? langProp : (cookieLang === 'mn' ? 'mn' : 'en')) as Locale;
  const dict = await getDictionary(lang);
  const t = dict.nav;

  return (
    <nav className="m-nav">
      <div>
        <Link href={`/${lang}`} className="m-wordmark mr-6">Marush</Link>
      </div>
      <div className="m-nav-links mt-1">
        <a href={`/${lang}#home`}           className="m-nav-link">{t.home}</a>
        <a href={`/${lang}#about`}          className="m-nav-link">{t.about}</a>
        <a href={`/${lang}#services`}       className="m-nav-link">{t.services}</a>
        <a href={`/${lang}#accommodations`} className="m-nav-link">{t.stays}</a>
        <a href={`/${lang}#location`}       className="m-nav-link">{t.location}</a>
        <a href={`/${lang}#contact`}        className="m-nav-link">{t.contact}</a>
        <Link href={`/${lang}/careers`}     className="m-nav-link">{t.careers}</Link>
        <LanguageSwitcher currentLang={lang} />
        <ThemeToggle />
      </div>
    </nav>
  );
}
