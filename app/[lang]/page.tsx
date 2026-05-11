import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import Hero from '../components/home/Hero';
import About from '../components/home/about';
import Services from '../components/home/services';
import Accommodation from '../components/home/accommodations';
import Location from '../components/home/Location';
import Contact from '../components/home/Contact';
import Devpage from '../devpage';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Services dict={dict.services} />
      <Accommodation dict={dict.accommodations} lang={lang} />
      <Location dict={dict.location} />
      <Contact dict={dict.contact} />
      <Devpage/>
    </>
  );
}
